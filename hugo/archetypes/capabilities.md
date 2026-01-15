---
title: "{{ replace .Name "-" " " | title }}"
date: {{ now.Format "2006-01-02" }}
updated: {{ now.Format "2006-01-02" }}
category:
authors:
draft: true
slug: {{ .Name }}
core: false
headline: "A one sentence description, used on the `/capabilities` section page"
summary: |
    [If core == false, delete this] A paragraph-length summary of the concepts in this article; used in the modal pop-ups linked from the Core diagram.

---

This is where the article content goes. Replace this text with the article content. You can use images, too: place the image file in the same directory as this markdown file, and reference them with standard markdown formatting, e.g. `![my image](myImage.png)`
