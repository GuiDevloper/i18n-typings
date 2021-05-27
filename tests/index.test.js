const mock = require('mock-fs');
const fs = require('fs');
const path = require('path');
const Messages = require('../src/messages');

function getFile(name) {
  return fs.readFileSync(path.join(__dirname, name), 'utf8');
}

function mockIntl(locale) {
  Intl.DateTimeFormat = () => ({
    resolvedOptions: () => ({ locale })
  });
}

describe('Run()', () => {
  
  function newRun() {
    const Run = require('../index.js');
    Run();
  }

  it('should generate index.BR.d.ts', () => {
    mockIntl('pt-BR');
    newRun();
    const result = getFile('index.d.ts');
    const expected = getFile('expected/index.BR.d.ts');
    expect(result).toBe(expected)
  });

  it('should generate index.US.d.ts', () => {
    mockIntl('en-US');
    newRun();
    const result = getFile('index.d.ts');
    const expected = getFile('expected/index.US.d.ts');
    expect(result).toBe(expected)
  });

  it('should warning if i18n quantity different from code', () => {
    const consoleErr = jest.spyOn(console, 'error').mockImplementation();
    mockIntl('en-GB');
    newRun();
    expect(consoleErr).toBeCalledWith(Messages.warnQuantity);
  });

  it('should warning if unknown i18n', () => {
    const consoleErr = jest.spyOn(console, 'error').mockImplementation();
    mock({
      'index.js': mock.load(path.join(__dirname, '../index.js')),
      'src': {
        'locales': {
          'pt-BR.js': mock.load(path.join(__dirname, '../src/locales/pt-BR.js')),
          'en-US.js': mock.load(path.join(__dirname, '../src/locales/en-US.js')),
        },
        'utils.js': mock.load(path.join(__dirname, '../src/utils.js')),
        'messages.js': mock.load(path.join(__dirname, '../src/messages.js')),
      },
      'tests': {
        'index.d.ts': mock.load('./tests/index.d.ts'),
        locales: {}
      }
    });

    newRun();
    expect(consoleErr).toBeCalledWith(Messages.noI18nFound);
  });

});

afterEach(() => {
  mock.restore();
  jest.restoreAllMocks();
  jest.resetModules();
});
