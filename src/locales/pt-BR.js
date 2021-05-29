module.exports = {
  warnQuantity: "Quantidade de comentários salvos é diferente do código!",
  logQuantityDiff: (i18n, src) => {
    return `Salvos: ${i18n.length}, No código: ${src.length}`
  },
  noI18nFound: "Eita, nenhum dado i18n encontrado!",
  noBackupFiles: "Nenhum backup encontrado!",
  restoredBackup: "Backup restaurado!"
}
