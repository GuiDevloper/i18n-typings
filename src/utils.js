const fs = require('fs');
const path = require('path');
const Utils = {};

Utils.getI18n = function() {
  let lang = Intl.DateTimeFormat()
    .resolvedOptions()
    .locale;
  const langs = fs
    .readdirSync(path.join(process.cwd(), 'tests/locales'))
    .filter(l => l[2] === '-')
    .map(f => f.replace('.js', ''));

  lang = langs.indexOf(lang) > -1
    ? lang
    : 'en-US';
  return require(path.join(process.cwd(), `tests/locales/${lang}.js`));
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
    console.error('Quantidade de comentários salvos é diferente do código!');
    console.error(`Salvos: ${i18n.length}, No código: ${srcComments.length}`);
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

module.exports = Utils;