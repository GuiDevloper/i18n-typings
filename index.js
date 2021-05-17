const fs = require('fs');

const locale = ['en-US', 'pt-BR'];

const source = fs.readFileSync('./tests/source.d.ts', 'utf8');
const getI18n = (lang) => require(`./tests/locales/${lang}`);

function iterateKeys(i18n, res, parentKey = '') {
  for (let key in i18n) {
    const joinKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof i18n[key] === 'object') {
      return iterateKeys(i18n[key], res, joinKey);
    } else {
      res = res.replace(
        new RegExp(`\n.*{{${joinKey}}}.*`, 'g'),
        i18n[key]
      );
    }
  }
  return res;
}

locale.forEach(lang => {
  const i18n = getI18n(lang);
  const res = iterateKeys(i18n, source);
  fs.writeFileSync(`./tests/index.${lang.substr(3)}.d.ts`, res);
})