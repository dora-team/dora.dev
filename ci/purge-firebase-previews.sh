#!/bin/bash

# This script will purge ALL firebase preview channels. (all channels except `live`)
# It's not very discriminating, so use with caution 
# Before running it, run `firebase login`

firebase hosting:channel:list --site doradotdev --json | \
  jq -r '.result.channels[] | select((.name | split("/")[-1]) != "live") | .name | split("/")[-1]' | \
  xargs -r -I {} firebase hosting:channel:delete {} --site doradotdev --force
