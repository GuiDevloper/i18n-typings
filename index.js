#! /usr/bin/env node
const fs = require('fs');
const Utils = require('./src/utils');
const Messages = require('./src/messages');

function Run() {
  try {
    const source = fs.readFileSync('./tests/index.d.ts', 'utf8');
    let i18n = Utils.getI18n();
    i18n = Utils.toArray(i18n);
    let fixedSrc = Utils.fixFile(source, i18n);
    if (fixedSrc) {
      fs.writeFileSync('./tests/index.d.ts', fixedSrc);
    }
  } catch {
    console.error(Messages.noI18nFound);
  }
}
Run();

module.exports = Run;
