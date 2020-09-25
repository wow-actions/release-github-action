# release-github-action

> A GitHub Action that helps you create a release for your Github Action.

Creates a release branch for your GitHub Actions which will be automatically tagged and released. The release version can be defined in `package.json`.

## Usage

### Inputs

For more information on these inputs, see the [API Documentation](https://developer.github.com/v3/repos/releases/#input)

- `tag_name`: The name of the tag for this release.
- `release_name`: The name of the release.
- `body`: Text describing the contents of the release. Optional, and not needed if using `body_path`.
- `body_path`: A file with contents describing the release. Optional, and not needed if using `body`. The `body_path` is valuable for dynamically creating a `.md` within code commits and even within the Github Action steps leading up to the `create-release`.
- `draft`: `true` to create a draft (unpublished) release, `false` to create a published one. Default: `false`.
- `prerelease`: `true` to identify the release as a prerelease. `false` to identify the release as a full release. Default: `false`.
- `commitish` : Any branch or commit SHA the Git tag is created from, unused if the Git tag already exists. Default: SHA of current commit.
- `owner`: The name of the owner of the repo. Used to identify the owner of the repository. Used when cutting releases for external repositories. Default: Current owner.
- `repo`: The name of the repository. Used to identify the repository on which to release. Used when cutting releases for external repositories. Default: Current repository.

### Outputs

For more information on these outputs, see the [API Documentation](https://developer.github.com/v3/repos/releases/#response-4) for an example of what these outputs look like

- `id`: The release ID.
- `html_url`: The URL users can navigate to in order to view the release. i.e. `https://github.com/bubkoo/release-github-action/releases/tag/v1.0.0`.
- `upload_url`: The URL for uploading assets to the release, which could be used by GitHub Actions for additional uses, for example the [`@actions/upload-release-asset`](https://www.github.com/actions/upload-release-asset) GitHub Action.

## Example workflow

On every `push` to a master, [create a release](https://developer.github.com/v3/repos/releases/#create-a-release):

```yaml
name: Release GitHub Action
on:
  push:
    branches:
      - master
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: bubkoo/release-github-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          body: |
            Changes in this Release
            - First Change
            - Second Change
          draft: false
          prerelease: false
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
