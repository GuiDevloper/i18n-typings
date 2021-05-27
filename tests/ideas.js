/*
// Iterate keys
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
*/

/*
// Run through understanding lines
src.split('\n').forEach(line => {
  line = line.trimEnd();
  let match = null;
  if (match = line.match(/( [\w-]+(:| =) )/)) {
    if (line[line.length - 1] === '{') {
      key = match[0].trim().replace(':', '').replace(' =', '');
      //console.log(['obj', key]);
      obj[key] = '';
    } else {
      //console.log(match[0]);
    }
  }
  if (line.indexOf('}}') === -1 && (match = line.match(/}/))) {
    key = null;
  }
})
*/
// src = src.replace(/:.*;/g, ';');
// src = src.replace(/:.*/g, ": '',");
