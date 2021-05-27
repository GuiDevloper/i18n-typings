const { getLang } = require('./utils');

let lang = getLang();

lang = (lang === 'pt-BR' || lang === 'en-US')
  ? lang
  : 'en-US';

module.exports = require(`./locales/${lang}`);
