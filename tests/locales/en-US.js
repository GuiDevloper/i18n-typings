const { getLink } = require('./shared');

const pageLink = getLink('context-page');

const Page = {
  title: `
  /** 
   * Current page title
   * 
   * ${pageLink}
   */`,
  
  description: `
  /**
   * Current page description
   * 
   * ${pageLink}
   */`,

  locale: `
  /**
   * Current page locale
   * 
   * ${pageLink}
   */`
}
module.exports = {
  Page
}