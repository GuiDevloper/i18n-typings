#! /usr/bin/env node
const fs = require('fs');
const Utils = require('./src/utils');

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
    console.error('Wait, i18n data not found!');
  }
}
Run();

module.exports = Run;