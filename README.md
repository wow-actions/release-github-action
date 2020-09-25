# release-github-action

> A GitHub Action that helps you create a release for your Github Action.

Creates a release branch for your GitHub Actions which will be automatically tagged and released. The release version can be defined in `package.json`.

```yaml
name: Release GitHub Action
on:
  push:
    branches:
      - master
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: tgymnich/publish-github-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
