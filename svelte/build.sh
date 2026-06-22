#!/bin/bash
set -euo pipefail

# This script will trigger builds of each of the svelte applications, in parallel.
# RUN THIS SCRIPT FROM THE REPOSITORY ROOT

# Install workspace dependencies first to avoid parallel race conditions.
# Skipped when node_modules is already present (e.g. restored from CI cache).
if [ ! -d svelte/node_modules ]; then
  (cd svelte && npm ci --registry=https://registry.npmjs.org/)
fi

./svelte/roi-calculator/build-roi-calculator.sh &
./svelte/ai-model/build-ai-model.sh &
./svelte/core-v2/build-core.sh &
./svelte/quick-check/build-quick-check.sh &

for job in $(jobs -p); do
  wait "$job"
done
