#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const Utils = require('./src/utils');
const Messages = require('./src/messages');

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
      fs.writeFileSync(mainTyping, fixedSrc);
    }
  } catch {
    console.error(Messages.noI18nFound);
  }
}

module.exports = Run;
