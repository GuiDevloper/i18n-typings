module.exports = {
  warnQuantity: "Quantity of saved comments is different from the code!",
  logQuantityDiff: (i18n, src) => {
    return `Saved: ${i18n.length}, In the code: ${src.length}`
  },
  noI18nFound: "Wait, no i18n data found!",
  noBackupFiles: "No backup files found!",
  restoredBackup: "Restored backup!"
}
