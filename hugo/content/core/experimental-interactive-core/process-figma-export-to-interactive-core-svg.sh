#! /bin/bash

# remove previous outputs
rm -f dora-core-model.svg

cp dora-core-model-EXPORT.svg dora-core-model.svg

# replace exported id from Figma with usable id and class attributes
# e.g.  id="#technical_trunk-based-development.entity.capability" 
#       --> id="software-delivery-performance" class="entity metric" data-category="technical"
sed -i '' 's/<g id="#\(.*\)_\(.*\)\.\(.*\)\.\(.*\)"/<g data-category="\1" id="\2" class="\3 \4"/' dora-core-model.svg

# inject svg stylesheet tag at beginning of SVG so it can be styled via external styles
sed -i '' '1s/^/<?xml-stylesheet type="text\/css" href="core-model.css"?> /' dora-core-model.svg