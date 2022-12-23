Release you action with [Semantic Release](https://github.com/semantic-release/semantic-release). **Zero configuration with best practices.**

- The `dist` files of your action are pushed with tags. See [semantic-release/git#assets](https://github.com/semantic-release/git#assets) for more information.
- Automatically push the tags `v1` and `v1.0`, pointing them to `v1.0.x`. This is a best practice for releasing GitHub Actions as also described in the [GitHub Docs for creating actions - Release and maintaining actions](https://docs.github.com/en/actions/creating-actions/releasing-and-maintaining-actions#example-developer-process).

## Usage

```yaml
name: Release
on:
  push:
    branches:
      - master
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Install
        run: yarn install
      - name: Build
        run: yarn build
      - name: Semantic Release
        uses: wow-actions/release-github-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Environment variables

See [semantic-release/git#environment-variables](https://github.com/semantic-release/git#environment-variables) for more information.

| Variable | Description | Default |
| --- | --- | --- |
| `GITHUB_TOKEN` | The GitHub token for authentication. | `${{ secrets.GITHUB_TOKEN }}` |
| `GIT_AUTHOR_NAME` | The author name associated with the release commit. See [Git environment variables](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables#_committing). | @semantic-release-bot. |
| `GIT_AUTHOR_EMAIL` | The author email associated with the release commit. See [Git environment variables](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables#_committing). | @semantic-release-bot email address. |
| `GIT_COMMITTER_NAME` | The committer name associated with the release commit. See [Git environment variables](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables#_committing). | @semantic-release-bot. |
| `GIT_COMMITTER_EMAIL` | The committer email associated with the release commit. See [Git environment variables](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables#_committing). | @semantic-release-bot email address. |

```yaml
- name: Semantic Release
  uses: wow-actions/release-github-action@v2
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    GIT_AUTHOR_NAME: Your-Github-Username
    GIT_AUTHOR_EMAIL: Your-Github-Username@users.noreply.github.com
    GIT_COMMITTER_NAME: Your-Github-Username
    GIT_COMMITTER_EMAIL: Your-Github-Username@users.noreply.github.com
```

### Inputs

| Name | Required | Description |
| --- | :-: | --- |
| `cwd` | false | Use another working directory for semantic release [[Details](#cwd)] |
| `dry_run` | false | Whether to run semantic release in `dry-run` mode. [[Details](#dry_run)] |
| `branches` | false | The branches on which releases should happen.[[Details](#branches)] |
| `commit_analyzer` | false | Options for [semantic-release/commit-analyzer](https://github.com/semantic-release/commit-analyzer). [[Details](#commit_analyzer)] |
| `release_notes_generator` | false | Options for [semantic-release/release-notes-generator](https://github.com/semantic-release/release-notes-generator). [[Details](#release_notes_generator)] |
| `changelog` | false | Options for [semantic-release/changelog](https://github.com/semantic-release/changelog). [[Details](#changelog)] |
| `github` | false | Options for [semantic-release/github](https://github.com/semantic-release/github). [[Details](#github)] |
| `git` | false | Options for [semantic-release/git](https://github.com/semantic-release/git). [[Details](#git)] |

#### cwd

This action run semantic release in the github provided workspace by default. You can override it by setting another working directory.

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v3
  - name: Semantic Release
    uses: wow-actions/release-github-action@v2
    with:
      # You can select another working directory like a subdirectory for example.
      cwd: ./code
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### dry_run

Whether to run semantic release in `dry-run` mode.

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v3
  - name: Semantic Release
    uses: wow-actions/release-github-action@v2
    with:
      dry_run: true
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### branches

The branches on which releases should happen. See [configuration#branches](https://semantic-release.gitbook.io/semantic-release/usage/configuration#branches) for more information.

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v3
  - name: Semantic Release
    uses: wow-actions/release-github-action@v2
    with:
      # JSON or Yaml
      branches: |
        [
          "+([0-9])?(.{+([0-9]),x}).x",
          "master",
          "next",
          "next-major",
          {
            "name": "beta",
            "prerelease": true
          },
          {
            "name": "alpha",
            "prerelease": true
          }
        ]
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### commit_analyzer

Options for [semantic-release/commit-analyzer](https://github.com/semantic-release/commit-analyzer). User-specified config will be merged(by [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)) to the following default value.

```js
{
  preset: 'angular',
  releaseRules: [
    { breaking: true, release: 'major' },
    { revert: true, release: 'patch' },
    { type: 'feat', release: 'minor' },
    { type: 'build', release: 'patch' },
    { type: 'ci', release: false },
    { type: 'chore', release: false },
    { type: 'docs', release: 'patch' },
    { type: 'perf', release: 'patch' },
    { type: 'refactor', release: 'patch' },
    { type: 'style', release: 'patch' },
    { type: 'test', release: 'patch' },
    { scope: 'no-release', release: false },
  ],
  parserOpts: {
    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
  },
},
```

#### release_notes_generator

Options for [semantic-release/release-notes-generator](https://github.com/semantic-release/release-notes-generator). User-specified config will be merged(by [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)) to the following default value.

```js
{
}
```

#### changelog

Options for [semantic-release/changelog](https://github.com/semantic-release/changelog). User-specified config will be merged(by [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)) to the following default value.

```js
{
}
```

#### github

Options for [semantic-release/github](https://github.com/semantic-release/github). User-specified config will be merged(by [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)) to the following default value.

```js
{
  addReleases: 'bottom',
}
```

#### git

Options for [semantic-release/git](https://github.com/semantic-release/git). User-specified config will be merged(by [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)) to the following default value.

```js
{
  assets: ['dist/**/*', 'package.json', 'CHANGELOG.md'],
}
```

### Outputs

| Name | Description |
| --- | --- | --- |
| `last_release_version` | Version of the previous release, if there was one. (e.g. `1.2.0`) |
| `last_release_git_head` | The sha of the last commit being part of the last release, if there was one. |
| `last_release_git_tag` | The Git tag associated with the last release, if there was one. |  |
| `new_release_published` | Whether a new release was published. The return value is in the form of a string. (`"true"` or `"false"`) |
| `new_release_version` | Version of the new release. (e.g. `"1.3.0"`) |
| `new_release_major_version` | Major version of the new release. (e.g. `"1"`) |
| `new_release_minor_version` | Minor version of the new release. (e.g. `"3"`) |
| `new_release_patch_version` | Patch version of the new release. (e.g. `"0"`) |
| `new_release_channel` | The distribution channel on which the last release was initially made available (undefined for the default distribution channel). |
| `new_release_notes` | The release notes for the new release. |
| `new_release_git_head` | The sha of the last commit being part of the new release |
| `new_release_git_tag` | The Git tag associated with the new release. |

Using Output Variables:

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v3
  - name: Semantic Release
    uses: wow-actions/release-github-action@v2
    # Need an `id` for output variables
    id: semantic
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  - name: Do something when a new release published
    if: steps.semantic.outputs.new_release_published == 'true'
    run: |
      echo ${{ steps.semantic.outputs.new_release_version }}
      echo ${{ steps.semantic.outputs.new_release_major_version }}
      echo ${{ steps.semantic.outputs.new_release_minor_version }}
      echo ${{ steps.semantic.outputs.new_release_patch_version }}
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
