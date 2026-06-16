#!/usr/bin/env python3
# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Python script that uses Google Antigravity SDK to review a PR and post suggestions."""

import os
import sys
import subprocess
import json
import logging
import asyncio
from pydantic import BaseModel, Field
import requests

from google.antigravity import Agent, LocalAgentConfig

# Setup basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)

# Define schemas for structured outputs
class ReviewSuggestion(BaseModel):
    file_path: str = Field(
        description="The relative path to the file being reviewed (e.g., 'src/main.py')."
    )
    start_line: int | None = Field(
        None,
        description="The starting line number in the new version of the file. Leave None if referencing only a single line."
    )
    end_line: int = Field(
        description="The ending line number in the new version of the file (or the exact line number for single-line comments)."
    )
    comment: str = Field(
        description="The explanation of the problem or proposed improvement. Use markdown formatting."
    )
    suggestion: str | None = Field(
        None,
        description="The exact replacement code block. Do NOT include markdown code blocks here. Use GitHub's 'suggestion' API style (leave None if this is a general comment without replacement code)."
    )

class ReviewResponse(BaseModel):
    summary: str = Field(
        description="A concise general summary of the review findings, highlighting major strengths, critical issues, or overall quality of the entire PR."
    )
    suggestions: list[ReviewSuggestion] = Field(
        default_factory=list,
        description="List of specific code review suggestions and comments on changed files."
    )


def get_pr_diff(pr_number: str) -> str:
    """Retrieves the pull request diff using the GitHub CLI 'gh'."""
    logging.info(f"Retrieving diff for PR #{pr_number} using 'gh pr diff'...")
    try:
        result = subprocess.run(
            ["gh", "pr", "diff", pr_number],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        logging.error(f"Error running 'gh pr diff': {e.stderr}")
        raise e


def post_github_review(repo: str, pr_number: str, github_token: str, review: ReviewResponse):
    """Submits the code review comments and summary back to the GitHub PR."""
    logging.info(f"Submitting {len(review.suggestions)} comments and summary to PR #{pr_number}...")
    
    url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}/reviews"
    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    
    # Format inline comments
    api_comments = []
    for s in review.suggestions:
        body = s.comment
        if s.suggestion is not None:
            # Wrap the code suggestion in the standard GitHub suggestion markdown block
            body += f"\n\n```suggestion\n{s.suggestion}\n```"
            
        comment_item = {
            "path": s.file_path,
            "line": s.end_line,
            "side": "RIGHT",
            "body": body
        }
        
        # If a start_line is provided and differs from end_line, specify multi-line comment parameters
        if s.start_line is not None and s.start_line < s.end_line:
            comment_item["start_line"] = s.start_line
            comment_item["start_side"] = "RIGHT"
            
        api_comments.append(comment_item)
        
    payload = {
        "body": review.summary,
        "event": "COMMENT",  # Submit as a comment review
        "comments": api_comments
    }
    
    response = requests.post(url, json=payload, headers=headers)
    if not response.ok:
        logging.error(f"Failed to post GitHub review: {response.status_code} - {response.text}")
        response.raise_for_status()
        
    logging.info("GitHub review submitted successfully!")


async def run_review():
    # 1. Fetch environment variables
    github_repository = os.environ.get("GITHUB_REPOSITORY")
    github_token = os.environ.get("GITHUB_TOKEN")
    pr_number = os.environ.get("PR_NUMBER")
    
    gcp_project = os.environ.get("GCP_PROJECT", "doradotdev")
    gcp_location = os.environ.get("GCP_LOCATION", "global")
    
    if not github_repository or not github_token or not pr_number:
        logging.error("Missing required GitHub environment variables (GITHUB_REPOSITORY, GITHUB_TOKEN, PR_NUMBER)")
        sys.exit(1)
        
    # Ensure GOOGLE_CLOUD_PROJECT is set for the Vertex SDK/Client
    os.environ["GOOGLE_CLOUD_PROJECT"] = gcp_project
    
    # 2. Get PR Diff
    try:
        diff_text = get_pr_diff(pr_number)
    except Exception:
        logging.error("Could not obtain PR diff. Exiting.")
        sys.exit(1)
        
    if not diff_text.strip():
        logging.info("PR diff is empty (no changes detected). Exiting.")
        sys.exit(0)
        
    # 3. Configure Antigravity Agent for GEAP/Vertex AI
    system_instructions = (
        "You are an expert, highly experienced code reviewer. "
        "Your goal is to ensure the pull request is logically consistent, well commented/documented, "
        "follows good security practices, and results in maintainable code.\n\n"
        "Instructions:\n"
        "- Read and analyze the PR diff provided in the user prompt.\n"
        "- CRITICAL: Your review comments and code suggestions must ONLY apply to the lines of code that have been added or modified in this pull request (i.e. lines marked with '+' in the diff). Do NOT make comments on unchanged lines, other parts of the affected files, or other areas of the codebase.\n"
        "- For any issues with the changed lines, propose a precise and constructive ReviewSuggestion.\n"
        "- If an improvement can be formulated as a code block, provide it in the 'suggestion' field. "
        "Do NOT include markdown syntax (like ```) in the 'suggestion' field itself; "
        "it will be wrapped automatically by the wrapper script.\n"
        "- Ensure the 'file_path' exactly matches the file path from the diff.\n"
        "- Specify the exact 'end_line' (and optional 'start_line') where the comment/suggestion applies in the new file.\n"
        "- Summarize the overall qualities, strengths, and primary concerns of the entire PR in the 'summary' field."
    )
    
    config = LocalAgentConfig(
        model="gemini-3.5-flash",
        vertex=True,
        project=gcp_project,
        location=gcp_location,
        system_instructions=system_instructions,
        response_schema=ReviewResponse,
    )
    
    prompt = f"Please review this Pull Request diff:\n\n{diff_text}"
    
    logging.info("Initializing Google Antigravity Agent...")
    try:
        async with Agent(config=config) as agent:
            logging.info("Requesting Gemini code review from Vertex AI...")
            response = await agent.chat(prompt)
            response_text = await response.text()
            
            # The response is structured JSON matching ReviewResponse
            review_data = json.loads(response_text)
            review = ReviewResponse(**review_data)
            
    except Exception as e:
        logging.error(f"Error during Antigravity Agent execution or output parsing: {e}", exc_info=True)
        sys.exit(1)
        
    # 4. Post the review comments back to GitHub
    try:
        post_github_review(github_repository, pr_number, github_token, review)
    except Exception as e:
        logging.error(f"Error posting review back to GitHub: {e}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(run_review())
