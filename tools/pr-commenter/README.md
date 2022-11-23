# PR Commenter

This container posts comments to GitHub.com Pull Requests. To use it in a Cloud Build pipeline:

1. One-time setup -- run from the "pr-commenter" directory:
```
gcloud builds submit
```

2. In your cloudbuild.yaml file (example):
```
steps:
- name: gcr.io/$PROJECT_ID/pr-commenter
  args: [
      "123",
      "myorganization/myrepo",
      "this is my comment!",
      "$GITHUB_TOKEN"
      
  ]
  secretEnv: 
    - GITHUB_TOKEN  
secrets:
  - kmsKeyName: [...]
    secretEnv: 
      GITHUB_TOKEN: "[...]"

```