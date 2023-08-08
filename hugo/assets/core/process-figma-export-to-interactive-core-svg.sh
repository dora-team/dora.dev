#! /bin/bash

echo "setting up..."

# remove previous outputs
rm -f dora-core-model.svg

# create generic-named svg file
cp dora-core-model-v*.svg dora-core-model.svg

echo "extract classes from exported ids..."

# replace exported ids on entity from Figma with usable id and class attributes
# e.g.  id="entity.capability.technical#trunk-based-development" 
#       --> class="entity capability technical" id="trunk-based-development" 
sed -i '' 's/<g id="\(.*\)\.\(.*\)\.\(.*\)#\(.*\)"/<g class="\1 \2 \3" id="\4" /' dora-core-model.svg

# add class tag to `construct`
sed -i '' 's/<g id="\(.*\)#\(.*\)"/<g class="\1" id="\2" /' dora-core-model.svg

# add class tag to `entity-box`
sed -i '' 's/id="entity-box"/class="entity-box"/' dora-core-model.svg
sed -i '' 's/id="entity-box_[0-9]*"/class="entity-box"/' dora-core-model.svg

# add class tag to `icon-bg`
sed -i '' 's/id="icon-bg"/class="icon-bg"/' dora-core-model.svg
sed -i '' 's/id="icon-bg_[0-9]*"/class="icon-bg"/' dora-core-model.svg

# add class tag to `icon`
sed -i '' 's/id="icon"/class="icon"/' dora-core-model.svg
sed -i '' 's/id="icon_[0-9]*"/class="icon"/' dora-core-model.svg

# add class tag to `connector`
sed -i '' 's/id="connector"/class="connector"/' dora-core-model.svg
sed -i '' 's/id="connector_[0-9]*"/class="connector"/' dora-core-model.svg

echo "inject css tag..."

# inject svg stylesheet tag at beginning of SVG so it can be styled via external styles
sed -i '' '1s/^/<?xml-stylesheet type="text\/css" href="\/core\/dora-core-model.css"?> /' dora-core-model.svg

# create generic-named images
echo "rename PDF and PNG (remove version ids)..."

cp dora-core-model-v*.pdf dora-core-model.pdf
cp dora-core-model-v*.png dora-core-model.png

echo "done."