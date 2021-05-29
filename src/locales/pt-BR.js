module.exports = {
  warnQuantity: 'Quantidade de comentários salvos é diferente do código!',
  logQuantityDiff: (i18n, src) => {
    return `Salvos: ${i18n.length}, No código: ${src.length}`
  },
  noI18nFound: 'Eita, nenhum dado i18n encontrado!',
  noBackupFiles: 'Nenhum backup encontrado!',
  restoredBackup: 'Backup restaurado!',
  generatedComments: 'Comentários transformados com sucesso!',
  version: 'Ei, veja minha versão: ',
  unknownCommand: 'Eita, digite um comando que eu conheça!',
  help:
  `  Help.. I want somebody! Help.. ♪
  Opa, tudo bem? Veja como me chamar:

  Uso: i18n-types [flag] [value]

  Flags:

  -v                     Mostra minha versão instalada
  --locales "./my-path"  Usa arquivos i18n customizados de um caminho contendo uma pasta "locales"
  --restore              Restaura arquivos do backup anteriormente salvo em "i18n-ts-backup"

  Leia mais no README, te vejo depois!`
}
