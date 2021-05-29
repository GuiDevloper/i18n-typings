module.exports = {
  warnQuantity: 'Quantity of saved comments is different from the code!',
  logQuantityDiff: (i18n, src) => {
    return `Saved: ${i18n.length}, In the code: ${src.length}`
  },
  noI18nFound: 'Wait, no i18n data found!',
  noBackupFiles: 'No backup files found!',
  restoredBackup: 'Restored backup!',
  generatedComments: 'Successfully transformed comments!',
  version: 'Hey, take a look at my version: ',
  unknownCommand: 'Ops, type a command I know!',
  noLocalesFound: 'Directory containing "locales" folder not found!',
  notRecognizedLang: 'Language not recognized! Format: "en-US"',
  localeFileExistent: lang => `File already exists in "locales/${lang}.js"!`,
  createdi18nFile: lang => `Successfully created in "locales/${lang}.js"`,
  help:
  `  Help.. I want somebody! Help.. ♪
  Hey, alright there? See how to call me:

  Usage: i18n-types [flag] [value]

  Flags:

  -v                     Shows my installed version
  --locales "./my-path"  Use custom i18n files from a path containing a "locales" folder
  --restore              Restore backup files previously saved in "i18n-ts-backup"
  --create               Create i18n file from comments in the current dir code

  Read more on README, see you later!`
}
