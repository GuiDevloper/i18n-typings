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
    const source = Utils.getFileContent(mainTyping);
    let i18n = Utils.getI18n(localesDir);
    i18n = Utils.toArray(i18n);
    let fixedSrc = Utils.fixFile(source, i18n);
    if (fixedSrc) {
      Utils.saveBackup(basePath, file, source);
      fs.writeFileSync(mainTyping, fixedSrc);
      return true;
    }
  } catch {
    console.error(Messages.noI18nFound);
  }
}

function logDone() {
  console.log(Messages.generatedComments);
}

if (process.env.NODE_ENV !== 'test') {
  const getPath = (dir) => path.join(process.cwd(), dir)
  const getIdx = (arg) => args.indexOf(arg);
  const getValue = (arg) => args[getIdx(arg) + 1];
  const simpleArg = {
    'help': Messages.help,
    '-v': Messages.version + require('./package.json').version
  }[args[0]];

  const argsFns = {
    '--locales': () => {
      const locales = getValue('--locales');
      const localesExist = fs.existsSync(getPath(locales + '/locales'));
      if (!localesExist) {
        return console.error(Messages.noLocalesFound);
      }
      Run(undefined, getPath(locales)) && logDone();
    },
    '--restore': () => Utils.restoreBackup(getPath('')),
    '--create': () =>  Utils.createI18n(getValue('--create'))
  };

  if (simpleArg) {
    console.log(simpleArg);
  } else if (getIdx('--locales') > -1 && getValue('--locales')) {
    argsFns['--locales']();
  } else if (getIdx('--create') > -1) {
    argsFns['--create']();
  } else if (getIdx('--restore') > -1) {
    argsFns['--restore']();
  } else if (args.length > 0) {
    console.log(Messages.unknownCommand);
  } else {
    Run() && logDone();
  }
}

module.exports = Run;
