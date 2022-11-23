#!/usr/bin/env bash
set -eEou pipefail

# TODO: rewrite this script as a go(?) binary and provide proper parameter parsing

# expected environment var:
# $GITHUB_TOKEN

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Env var GITHUB_TOKEN is required for pr_comment_post.sh. Exiting."
    exit 1
fi

# parameters:
# $1: the repo (as org/repo) containing the PR
# $2: the number of the PR to post to
# $3: the GitHub access token for an account with PR comment permissions

REPO=$1
PR_NUMBER=$2
COMMENT=$3

PAYLOAD="{\"body\":\"$COMMENT\"}"
PR_URL="https://api.github.com/repos/$REPO/issues/$PR_NUMBER/comments"

echo "posting $PAYLOAD to $PR_URL..."

curl -s -H "Authorization: token $GITHUB_TOKEN" -X POST -d "$PAYLOAD" $PR_URL