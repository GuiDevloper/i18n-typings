const fs = require('fs');
const path = require('path');
const Utils = {};

Utils.newMessages = function() {
  return require('../src/messages');
}

Utils.getLang = function() {
  return Intl.DateTimeFormat()
    .resolvedOptions()
    .locale;
}

Utils.getI18n = function(basePath = process.cwd()) {
  try {
    let lang = Utils.getLang();
    const langs = fs
      .readdirSync(path.join(basePath, 'locales'))
      .filter(l => l[2] === '-')
      .map(f => f.replace('.js', ''));

    lang = langs.indexOf(lang) > -1
      ? lang
      : 'en-US';

    return require(path.join(basePath, `locales/${lang}.js`));
  } catch {
    console.error(Utils.newMessages().noI18nFound);
  }
}

Utils.toArray = function(obj) {
  let arr = [];
  Object.values(obj).forEach(v => {
    let newVal = undefined;
    if (typeof v === 'object') {
      newVal = Utils.toArray(v);
    }
    arr = [...arr, ...newVal || [v]];
  });
  return arr;
}

Utils.warnQuantity = function(i18n, srcComments) {
  if (i18n.length !== srcComments.length) {
    const Messages = Utils.newMessages();
    console.error(Messages.warnQuantity);
    console.error(Messages.logQuantityDiff(i18n, srcComments));
    return true;
  }
}

Utils.generateSpaces = function(src, index) {
  let spaces = src.substring(0, index)
    .split('')
    .reverse()
    .findIndex(spc => spc === '\n');

  spaces = spaces < 0 ? 0 : spaces;
  return new Array(spaces + 1)
    .fill(' ')
    .join('');
}

function mapComment(isFormatted, spaces) {
  if (isFormatted) {
    return (line, lineId) => (lineId ? spaces : '') + line.trimStart();
  }

  return (line, lineId, tisArr) => {
    line = line.trim() ? `* ${line.trim()}` : '*';
    line = lineId > 0 && line.length > 1
      ? `${line}\n${spaces}*`
      : line;

    return (!lineId ? '/*' : spaces) + line + (
      lineId === (tisArr.length - 1)
        ? '/'
        : (lineId > 0 ? ' ' : '')
    );
  }
}

Utils.generateComment = function(comment, spaces) {
  const isFormatted = comment.match(Utils.commentsRegex);
  return comment
    .split('\n')
    .map(mapComment(isFormatted, spaces))
    .join('\n')
}

Utils.commentsRegex = new RegExp(
  /\/\*\**([\r\n|\r|\n]|[^\r\n|\r|\n])([^\*]|(\*(?!\/)))*\*\//g
);

Utils.replaceComment = function(src, com, newComment) {
  return src.substring(0, com.index) +
    src.substring(com.index)
    .replace(com[0], newComment);
}

Utils.fixFile = function(src, i18n) {
  const srcComments = [...src.matchAll(Utils.commentsRegex)];
  if (Utils.warnQuantity(i18n, srcComments)) {
    return;
  }

  i18n = i18n.reverse();
  srcComments.reverse().forEach((oldCom, idx) => {
    const spaces = Utils.generateSpaces(src, oldCom.index);
    const newComment = Utils.generateComment(i18n[idx], spaces);

    src = Utils.replaceComment(src, oldCom, newComment);
  });
  return src;
}

function getBackupPath(basePath, file = '') {
  return path.join(basePath, `i18n-ts-backup/${file}`);
}

Utils.saveBackup = function(basePath, file, source) {
  const backupPath = getBackupPath(basePath, `bkp.${file}`);
  if (!fs.existsSync(backupPath)) {
    if (!fs.existsSync(getBackupPath(basePath))) {
      fs.mkdirSync(getBackupPath(basePath));
    }
    fs.writeFileSync(backupPath, source);
  }
}

Utils.restoreBackup = function(basePath) {
  const Messages = Utils.newMessages();
  const backupPath = path.join(basePath, 'i18n-ts-backup');
  const files = fs.readdirSync(backupPath);
  if (files.length > 0) {
    files.forEach(fName => {
      const bkpFilePath = path.join(backupPath, fName);
      fs.writeFileSync(
        path.join(basePath, fName.replace('bkp.', '')),
        Utils.getFileContent(bkpFilePath)
      );
    });
    console.log(Messages.restoredBackup)
  } else {
    console.error(Messages.noBackupFiles);
  }
}

Utils.getFileContent = function(basePath, file = '') {
  const mainTyping = path.join(basePath, file);
  return fs.readFileSync(mainTyping, 'utf8');
}

Utils.langRegex = new RegExp(/(^[a-z]{2}[-]{1}[A-Z]{2}$)/);

Utils.createI18n = function(lang) {
  const Messages = Utils.newMessages();
  const mainTyping = Utils.getFileContent(process.cwd(), 'index.d.ts');
  let comments = mainTyping.match(Utils.commentsRegex);
  if (lang) {
    if (!lang.match(Utils.langRegex)) {
      return console.error(Messages.notRecognizedLang);
    }
  } else {
    lang = 'en-US';
  }
  const localesPath = path.join(process.cwd(), 'locales');
  const createdFile = path.join(localesPath, `${lang}.js`);
  if (!fs.existsSync(localesPath)) {
    fs.mkdirSync(localesPath);
  }
  if (fs.existsSync(createdFile)) {
    return console.error(Messages.localeFileExistent(lang));
  }
  comments = `[\n\`${comments.join('\`,\n\`')}\`\n]`;
  comments = comments.replace(/\n.* \*/g, '\n  *');
  fs.writeFileSync(createdFile, `module.exports = ${comments};`);
  console.log();
}

module.exports = Utils;
