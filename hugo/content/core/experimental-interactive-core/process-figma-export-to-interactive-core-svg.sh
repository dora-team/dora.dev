#! /bin/bash
cp dora-core-model-EXPORT.svg dora-core-model.svg
sed -i -e 's/id="entity/class="entity" id="entity/' dora-core-model.svg
