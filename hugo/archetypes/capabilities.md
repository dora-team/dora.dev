---
title: "{{ replace .Name "-" " " | title }}"
titleForHTMLHead: "DevOps Capabilities: {{ replace .Name "-" " " | title }}" # TODO: can we DRY this out?
date: {{ .Date }}
category: 
draft: true
summary: "A summary (150-250 words) that describes this capability."
---

This is where the article content goes. Replace this text with the article content. You can use images, too: place the image file in the same directory as this markdown file, and reference them with standard markdown formatting, e.g. `![my image](myImage.png)`