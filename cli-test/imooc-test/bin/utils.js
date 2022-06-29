const pathExists = require('path-exists');

function exists(p) {
  return pathExists.sync(p);
}

module.exports = { exists };
