# zus-health-ctw-component-library

This is an open source component library maintained by Zus Health

## Install

`npm i @zus-health/ctw-component-library`

## Changesets

In order to run changeset in the project run `npx changeset` and follow the prompts. More information on adding a changeset can be found in [changeset docs](docs/adding-a-changeset.md).

Pushing a PR with a changeset will trigger a github action which will create a PR that if merged will automatically:

- Upgrade our package.json accordingly
- Delete changesets that are no longer needed
- Update our changelog
- Publish our npm package
