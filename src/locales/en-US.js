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
  unknown: 'Ops, type a command I know!',
  help:
  `  Help.. I want somebody! Help.. ♪
  Hey, alright there? See how to call me:

  Usage: i18n-types [flag] [value]

  Flags:

  -v                        Shows my installed version

  See you later!`
}
