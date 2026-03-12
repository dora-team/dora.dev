#!/bin/bash
set -euo pipefail

# This script will trigger builds of each of the svelte applications, in parallel.
# RUN THIS SCRIPT FROM THE REPOSITORY ROOT

# doing roi steps manually to test the build in CI
./svelte/roi-calculator/build-roi-calculator.sh &
./svelte/ai-model/build-ai-model.sh &
./svelte/core-v2/build-core.sh &
./svelte/quick-check/build-quick-check.sh &

for job in $(jobs -p); do
  wait "$job"
done
