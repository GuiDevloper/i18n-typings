const mock = require('mock-fs');
const fs = require('fs');
const path = require('path');
const Utils = require('../src/utils');

function getFile(name) {
  return fs.readFileSync(path.join(__dirname, name), 'utf8');
}

function mockIntl(locale) {
  jest.spyOn(Intl, 'DateTimeFormat').mockImplementation(() => ({
    resolvedOptions: () => ({ locale })
  }));
}

function mockLoad(file) {
  return mock.load(path.join(__dirname, '../', file));
}

describe('Run()', () => {

  function newRun() {
    const Run = require('../index.js');
    Run(__dirname);
  }

  it('should generate index.BR.d.ts', () => {
    mockIntl('pt-BR');
    newRun();
    const result = getFile('index.d.ts');
    const expected = getFile('expected/index.BR.d.ts');
    expect(result).toBe(expected);
  });

  it('should generate index.US.d.ts', () => {
    mockIntl('en-US');
    newRun();
    const result = getFile('index.d.ts');
    const expected = getFile('expected/index.US.d.ts');
    expect(result).toBe(expected);
  });

  it('should warning if i18n quantity different from code', () => {
    const consoleErr = jest.spyOn(console, 'error').mockImplementation();
    mockIntl('en-GB');
    newRun();
    expect(consoleErr).toBeCalledWith(Utils.newMessages().warnQuantity);
  });

  it('should warning if unknown i18n', () => {
    const consoleErr = jest.spyOn(console, 'error').mockImplementation();
    mock({
      'index.js': mockLoad('index.js'),
      'src': {
        'locales': {
          'pt-BR.js': mockLoad('src/locales/pt-BR.js'),
          'en-US.js': mockLoad('src/locales/en-US.js'),
        },
        'utils.js': mockLoad('src/utils.js'),
        'messages.js': mockLoad('src/messages.js'),
      },
      'tests': {
        'index.d.ts': mockLoad('./tests/index.d.ts'),
        locales: {}
      }
    });

    newRun();
    expect(consoleErr).toBeCalledWith(Utils.newMessages().noI18nFound);
  });

});

afterEach(() => {
  mock.restore();
  jest.restoreAllMocks();
  jest.resetModules();
});
