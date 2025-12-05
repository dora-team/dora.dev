#!/bin/bash

# This script will purge ALL firebase preview channels. (all channels except `live`)
# It's not very discriminating, so use with caution
# Before running it, run `firebase login`

SITE="doradotdev"

firebase hosting:channel:list --site "${SITE}" --json | \
  jq -r '.result.channels[] | .name | split("/")[-1] | select(. != "live")' | \
  xargs -r -I {} firebase hosting:channel:delete {} --site "${SITE}" --force
