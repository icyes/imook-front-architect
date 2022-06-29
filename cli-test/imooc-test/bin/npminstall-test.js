const npminstall = require('npminstall');
const path = require('path');
const userHome = require('user-home');

npminstall({
  root: path.resolve(userHome, '.imooc-cli-dev'),
  storeDir: path.resolve(userHome, '.imooc-cli-dev', 'node_modules'),
  registry: 'https://registry.npmjs.org',
  pkgs: [
    { name: 'foo', version: '~1.0.0' },
  ],
});
