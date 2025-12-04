#!/bin/bash

# This script will trigger builds of each of the svelte applications, in parallel.
# RUN THIS SCRIPT FROM THE REPOSITORY ROOT

./svelte/ai-model/build-ai-model.sh &
./svelte/core-v2/build-core.sh & 
./svelte/quick-check/build-quick-check.sh &
wait