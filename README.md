# i18n-typings

> Internationalize JSDoc inside Typescript typing files

## Purpose

While working at [Nullstack](https://github.com/nullstack/nullstack) typings file, the view of VSCode supporting almost instantly any JSDocs typed appeared as a perfect opportunity to seamlessly and minimalistically bring the docs to devs.

And, why wouldn't it be internationalized?

## Current Specification

The [tests](https://github.com/GuiDevloper/i18n-typings/tree/master/tests) folder is where all examples happens.

In [locales](https://github.com/GuiDevloper/i18n-typings/tree/master/tests/locales) folder all i18n files are stored (all `.js` for limitless possibilities purpose).

They are read in order as one Array of strings and it's data injected in corresponding comments in the `index.d.ts`, replacing them by a localized version.

If the quantity of comments in the typing file is different from the i18n, an warning is throw.

## [to-do](https://github.com/GuiDevloper/i18n-typings/issues/1)
