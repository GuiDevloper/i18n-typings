# i18n-typings

> Internationalize JSDoc inside Typescript typing files

[![e2e Tests](https://github.com/GuiDevloper/i18n-typings/actions/workflows/main.yml/badge.svg)](https://github.com/GuiDevloper/i18n-typings/actions/workflows/main.yml)

## Purpose

While working at [Nullstack](https://github.com/nullstack/nullstack) typings file, the view of VSCode supporting almost instantly any JSDocs typed appeared as a perfect opportunity to seamlessly and minimalistically bring the docs to devs.

And, why wouldn't it be internationalized?

## Current Specification

The [tests](https://github.com/GuiDevloper/i18n-typings/tree/master/tests) folder is where all examples happens.

In [locales](https://github.com/GuiDevloper/i18n-typings/tree/master/tests/locales) folder all i18n files are stored (all `.js` for limitless possibilities purpose).

They are read in order as one Array of strings and it's data injected in corresponding comments in the `index.d.ts`, replacing them by a localized version.

If the quantity of comments in the typing file is different from the i18n, an warning is throw.

## CLI Usage

```sh
# install globally using npm
npm install i18n-typings -g
# or yarn
yarn global add i18n-typings
```

i18n-types CLI can understand a series of commands, which currently are:

```sh
i18n-types -v # shows installed version
i18n-types help # shows help information

# use custom i18n files from a path containing a "locales" folder
# replacing/adding to ones at target package (e.g "i18n-typings")
i18n-types --locale "./my-path"

# restore backup files previously saved in "i18n-ts-backup"
i18n-types --restore

# create i18n file from comments in the current dir code
# you can specify the lang you going to contribute (default: en-US)
i18n-types --create <lang>
```

## [to-do](https://github.com/GuiDevloper/i18n-typings/issues/1)
