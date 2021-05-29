const { getLink } = require('../../locales/shared');

const getBRLink = (page) => getLink(`pt-br/${page}`);
const pageLink = getBRLink('contexto-page');

const typePage = {
  NAME: `/**
  * type Page
  */`,
  title: `
    Título da página atual
    ${pageLink}
  `,
  description: `Descrição da página atual\n
    ${pageLink}`,
  locale: `/**
  * Locale configurado da página atual\n  *
  * ${pageLink}
  */`
}

const constPage =
  `/**
  * constante page exportado
  */`;

const Comments = {
  typePage,
  constPage
};
module.exports = Comments