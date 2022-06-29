const path = require('path');
const glob = require('glob');
const ejs = require('ejs');
const fse = require('fs-extra');
const get = require('lodash/get');

module.exports = async function(dir, options, extraOptions, diableFormatDotFile = false) {
  const ignore = get(extraOptions, 'ignore');
  console.log('ignore', ignore);
  return new Promise((resolve, reject) => {
    glob('**', {
      cwd: dir,
      nodir: true,
      ignore: ignore || '**/node_modules/**',
    }, (err, files) => {
      if (err) {
        return reject(err);
      }

      console.log('render files:', files);

      Promise.all(files.map((file) => {
        const filepath = path.join(dir, file);
        return renderFile(filepath, options, diableFormatDotFile);
      })).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  });
};

function renderFile(filepath, options, diableFormatDotFile) {
  let filename = path.basename(filepath);

  if (filename.indexOf('.png') !== -1 || filename.indexOf('.jpg') !== -1) {
    // console.log('renderFile:', filename);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    ejs.renderFile(filepath, options, (err, result) => {
      if (err) {
        return reject(err);
      }

      if (/^_package.json/.test(filename)) {
        filename = filename.replace('_package.json', 'package.json');
        fse.removeSync(filepath);
      }

      if (/\.ejs$/.test(filepath)) {
        filename = filename.replace(/\.ejs$/, '');
        fse.removeSync(filepath);
      }

      if (!diableFormatDotFile && /^_/.test(filename)) {
        filename = filename.replace(/^_/, '.');
        fse.removeSync(filepath);
      }

      const newFilepath = path.join(filepath, '../', filename);
      fse.writeFileSync(newFilepath, result);
      resolve(newFilepath);
    });
  });
}
