## Adding new content

### Adding a capability
Start by creating a git branch in which to work.

> These instructions assume you're using the [hugo command-line utility](https://gohugo.io/installation/). If not, you can add content by copying an existing content item, renaming it, and replacing its content.

From the repo root:
- `cd hugo`
- Choose a category: one of [`technical`, `process`, `cultural`] (note that the "measurement" category is being deprecated; those capabilities should be moved to "process" or "technical")
- Choose a path name for the capability. This should be a descriptive title, in [`kebab-case`](https://www.theserverside.com/definition/Kebab-case). Don't include generic terms like "DORA," "DevOps," or "Capability;" these are provided by the template.
    - example: `streamlining-change-approval`
- run `hugo new capabilities/<PATH_NAME>/index.md`
  - example: `hugo new capabilities/streamlining-change-approval/index.md`
- A folder will be created within "capabilities" which contains your article as markdown
- Edit the markdown file
  - In the front matter (the metadata between the `---` separators), edit the following:
    - title -- This will be auto-generated from the path name but may be edited if desired.
    - headline -- a brief snippet to augment the title. Example: `Replace heavyweight change-approval processes with peer review, to get the benefits of a more reliable, compliant release process without sacrificing speed.`
    - summary -- This is a summary (150-250 words) of the content which will appear in certain views. It should stand on its own, as well as serving as a teaser to encourage readers to click through to the full article to learn more.
    - draft -- leave this as `true` until you're ready to make it visible to everyone (see below)
  - In the body of the article (the area below the second `---` separator), enter the capability content in markdown format
  - Images may be placed in the same folder as the markdown file for the capability they belong to.

#### Example directory structure
```
hugo/
└─ content/
   ├── streamlining-change-approval/
   │   ├─ image1.png
   │   ├─ image2.png
   │   └─ index.md
   └── another-capability/
       ├─ image.jpg
       └─ index.md
```

Edit the markdown using the editor of your choice. To use an image, reference it via markdown syntax: `![Alt text of image](image1.png)`. To view your work, see [docs](/docs) for instructions on how to run a local server which will live-update as you edit files.

### Proposing changes
To propose a change, commit your work to your branch, then open a Pull Request against branch `main`. A temporary preview environment will be created, and linked to from the "checks" area of the PR. This URL can be shared with anyone, but it will be automatically deprovisioned after about 30 days. In these PR preview environments, all content statues—draft and non-draft—will be visible.

### Publishing a draft to draft.dora.dev
To make your content available on [draft.dora.dev](https://draft.dora.dev), leave "draft" set to `true`, and merge your change to `main`. A pipeline will deploy your change; typically, this will be complete within 10 minutes.

### Publishing finished content to dora.dev
When you are ready to go live, set "draft" to `false` (by editing the front matter in your markdown file), and merge your change to `main`. A pipeline will deploy your change; typically, this will be complete within 10 minutes, and the content will be live on dora.dev
