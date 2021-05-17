# i18n-typings

> Internationalize JSDoc inside Typescript typing files

## Purpose

While working at [Nullstack](https://github.com/nullstack/nullstack) typings file, the view of VSCode supporting almost instantly any JSDocs typed appeared as a perfect opportunity to seamlessly and minimalistically bring the docs to devs.

And, why wouldn't it be internationalized?

## Use

The [tests](https://github.com/GuiDevloper/i18n-typings/tree/master/tests) folder is where all examples happens.

In [locales](https://github.com/GuiDevloper/i18n-typings/tree/master/tests/locales) folder all i18n files are stored (all `.js` for limitless possibilities purpose) they are read and it's data injected in corresponding keys commented in the `source.d.ts`, creating localized versions (i.e `index-BR.d.ts`).

If the key in a i18n file is an `object`, children keys are searched (e.g `Page.Page.title`).

So, having a structure like mentioned, this can be ran:

```sh
node index.js
```

## [to-do](https://github.com/GuiDevloper/i18n-typings/issues/1)
