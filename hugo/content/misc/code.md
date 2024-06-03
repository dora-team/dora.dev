---
title: "Code"
date: 2024-06-03T11:09:40-04:00
draft: true
---

## This is a dummy page (in draft mode; it will not render on prod) used to show how code blocks render
### Hugo uses the Chroma syntax highlighter, and we've chosen Chroma's `friendly` style, with some small additional tweaks

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis arcu imperdiet, semper metus quis, efficitur magna. Morbi malesuada enim nec justo malesuada, sed vulputate nisi feugiat. Etiam quis velit eu sapien fermentum fermentum. Maecenas lacinia et eros et fringilla. Etiam volutpat, tellus ut volutpat porttitor, magna massa commodo nunc, sed egestas neque turpis in diam. Ut ut quam in nisl tincidunt fringilla in rutrum dui. In a nibh elit. Ut commodo viverra pulvinar.

```python
# Random snippet of code (from TensorFlow examples)
import argparse

import numpy as np
import tensorflow as tf
tf.compat.v1.disable_eager_execution()

def load_graph(model_file):
  graph = tf.Graph()
  graph_def = tf.compat.v1.GraphDef()

  with open(model_file, "rb") as f:
    graph_def.ParseFromString(f.read())
  with graph.as_default():
    tf.import_graph_def(graph_def)

  return graph
```

Ut est quam, pulvinar at pretium ut, pharetra commodo ante. Duis hendrerit odio sit amet ullamcorper sodales. Praesent euismod nunc ut nisi convallis, sit amet volutpat lacus venenatis. Fusce id sodales ligula. Aenean eleifend metus lacus, non eleifend turpis molestie a. Morbi risus lorem, tempor id lacinia eget, euismod sit amet ligula. Cras molestie accumsan commodo. Duis feugiat at nulla sodales luctus. Vestibulum vitae tristique orci, vitae lacinia eros. Proin varius nunc at maximus fermentum. Mauris at eros tincidunt, vehicula justo elementum, tristique augue. Morbi sit amet ligula augue. Praesent nec urna nec massa iaculis consequat nec non tortor. Aliquam ultrices dui purus, sed dictum lectus facilisis ut. Maecenas at est id risus feugiat semper.

Nullam tempus turpis sed justo elementum, non interdum nulla finibus. Donec id erat at quam auctor iaculis. Cras commodo, magna id finibus dictum, mi dolor mollis ipsum, vel egestas sapien sem tristique ante. Nam maximus sapien eu lorem placerat imperdiet. Nulla ornare semper nibh, finibus aliquet arcu rutrum in. Mauris laoreet, mauris sed euismod molestie, dolor mi mattis massa, quis semper eros ipsum eget arcu. Morbi gravida vitae odio vel lobortis.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean vel est consequat, finibus felis et, scelerisque orci. Vestibulum elementum suscipit sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus mollis arcu sed ante commodo, a pulvinar eros placerat. Sed a efficitur felis. Vestibulum sollicitudin dictum euismod. Vestibulum sed odio et orci imperdiet porta in eget ex. Donec sapien lacus, maximus in quam at, suscipit iaculis purus. Etiam mollis pretium pharetra. Cras vulputate ultricies nisl vitae maximus. Praesent nec mauris facilisis, ultrices risus vitae, facilisis tellus.

Etiam congue nisi odio, sed consectetur erat venenatis ac. Etiam scelerisque ante nulla, non malesuada dui dictum vitae. Mauris molestie nulla eget gravida lacinia. Phasellus vel bibendum nisi, eu lacinia sem. Nulla ut enim et nibh vulputate gravida eget sit amet nunc. Mauris blandit erat tellus. Proin erat dolor, tincidunt eget ante a, fringilla vehicula lectus. Aenean imperdiet risus a malesuada vehicula. Cras sit amet turpis vel tellus lacinia bibendum. Quisque consequat sapien vitae mi efficitur ultrices. Ut et tincidunt sapien, vel facilisis libero.