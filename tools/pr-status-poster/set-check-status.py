#!/bin/env python
import os
import click

from github import Github
from google.cloud import secretmanager

# https://cloud.google.com/cloud-build/docs/configuring-builds/substitute-variable-values

# Prerequisite: a github token is stored in Cloud Secret Manager
# You can pass the name of the secret as a param or use the default, which is `github_token`
# Token must have repo:status (or repo:all for a private repo)
# https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line

@click.command()
@click.option("--project-id", required=True)
@click.option("--repo-name", required=True)
@click.option("--commit-sha", required=True)
@click.option("--target-url", required=True)
@click.option("--github-token-secret-name", default="github_token")
@click.option("--debug", default=False, is_flag=True)
def main(project_id, repo_name, commit_sha, target_url, github_token_secret_name, debug):
    if debug:
        print("Invoking using: ")
        print(f" Project ID:  {project_id}")
        print(f" Repo Name:   {repo_name}")
        print(f" Commit SHA:  {commit_sha}")
        print(f" Target URL:  {target_url}")
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{github_token_secret_name}/versions/latest"
    response = client.access_secret_version(request={"name":name})
    github_token = response.payload.data.decode("UTF-8")

    g = Github(github_token)
    r = g.get_repo(repo_name)
    r.get_commit(sha=commit_sha).create_status(
        state="success",
        target_url=target_url,
        context="CloudBuild/Preview",
        description="Preview available",
    )


if __name__ == '__main__':
    main()