#! /bin/bash

# clean up any previous runs of this script
rm -rf ./PROCESSED

export CAPLANGS="fr"
for CAPLANG in $CAPLANGS
do
  # create staging area
    mkdir -p ./PROCESSED/${CAPLANG}
    mkdir -p ./PROCESSED/${CAPLANG}/cultural
    mkdir -p ./PROCESSED/${CAPLANG}/process
    mkdir -p ./PROCESSED/${CAPLANG}/technical
  # copy files into subfolders and rename to current naming conventions


done
