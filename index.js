#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const Utils = require('./src/utils');
const Messages = require('./src/messages');
const args = process.argv.splice(2);

function Run(basePath = process.cwd(), localesDir) {
  localesDir = localesDir || basePath;
  try {
    const file = 'index.d.ts';
    const mainTyping = path.join(basePath, file);
    const source = fs.readFileSync(mainTyping, 'utf8');
    let i18n = Utils.getI18n(localesDir);
    i18n = Utils.toArray(i18n);
    let fixedSrc = Utils.fixFile(source, i18n);
    if (fixedSrc) {
      Utils.saveBackup(basePath, file, source);
      fs.writeFileSync(mainTyping, fixedSrc);
    }
  } catch {
    console.error(Messages.noI18nFound);
  }
}

if (process.env.NODE_ENV !== 'test') {
  const getPath = (dir) => path.join(process.cwd(), dir)
  const getIdx = (arg) => args.indexOf(arg);
  if (getIdx('--locales') > -1) {
    const locales = args[getIdx('--locales') + 1];
    Run(undefined, getPath(locales));
  } else if (getIdx('--restore') > -1) {
    Utils.restoreBackup(getPath(''));
  } else {
    Run();
  }
}

module.exports = Run;
