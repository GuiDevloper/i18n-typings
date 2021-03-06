const { getLink } = require('./shared');

const pageLink = getLink('context-page');

const typePage = {
  NAME: `/**
  * type Page
  */`,
  title: `
    Current page title
    ${pageLink}
  `,
  description: `Current page description\n
    ${pageLink}`,
  locale: `/**
  * Current page locale\n  *
  * ${pageLink}
  */`
}

const constPage =
  `/**
  * exported page constant
  */`;

const Comments = {
  typePage,
  constPage
};
module.exports = Comments