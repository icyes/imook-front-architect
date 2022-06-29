const yargs = require('yargs/yargs');
const dedent = require('dedent');
const pkg = require('../package.json');

const cli = yargs();
const argv = process.argv.slice(2);

const context = {
  imoocVersion: pkg.version,
};

cli
  .usage('Usage: $0 [command] <options>')
  .demandCommand(1, 'A command is required. Pass --help to see all available commands and options.')
  .strict()
  .recommendCommands()
  .fail((err, msg) => {
    console.log(err);
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .wrap(cli.terminalWidth())
  .epilogue(dedent`
      When a command fails, all logs are written to lerna-debug.log in the current working directory.

      For more information, find our manual at https://github.com/lerna/lerna
    `)
  .options({
    debug: {
      type: 'boolean',
      describe: 'Bootstrap debug mode',
      alias: 'd',
    },
  })
  .option('registry', {
    type: 'string',
    describe: 'Define global registry',
    alias: 'r',
  })
  .group([ 'debug' ], 'Dev Options:')
  .group([ 'registry' ], 'Extra Options:')
  .command('init [name]', 'Do init a project', (yargs) => {
    yargs
      .option('name', {
        type: 'string',
        describe: 'Name of a project',
        alias: 'n',
      });
  }, (argv) => {
    console.log(argv);
  })
  .command({
    command: 'list',
    aliases: [ 'ls', 'la', 'll' ],
    describe: 'List local packages',
    builder: (yargs) => {
    },
    handler: (argv) => {
      const fs = require('fs'); // native module
      const dedent = require('dedent'); // cached local module
      const local = require('.'); // relative path
      const utils = require('/Users/sam/Desktop/vue-test/imooc-test/bin/utils'); // absolute path
      const pkg = require('../../imooc-test-lib/package.json'); // load json
      const undefinedModule = require('./file'); // undefined module

    },
  })
  .parse(argv, context);
