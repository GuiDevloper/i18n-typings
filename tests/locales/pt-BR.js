const { getLink } = require('./shared');

const getBRLink = (page) => getLink(`pt-br/${page}`);
const pageLink = getBRLink('contexto-page');

const Page = {
  title: `
  /** 
   * Título da página atual
   * 
   * ${pageLink}
   */`,
  
  description: `
  /**
   * Descrição da página atual
   * 
   * ${pageLink}
   */`,

  locale: `
  /**
   * Locale configurado da página atual
   * 
   * ${pageLink}
   */`
}
module.exports = {
  Page
}