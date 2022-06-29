const fse = require('fs-extra');
const inquirer = require('inquirer');
const glob = require('glob');
const ejs = require('ejs');

async function ejsRender(options) {
  const dir = options.targetPath;
  const projectInfo = options.data;
  return new Promise((resolve, reject) => {
    glob('**', {
      cwd: dir,
      ignore: options.ignore || '',
      nodir: true,
    }, function(err, files) {
      if (err) {
        reject(err);
      }
      Promise.all(files.map(file => {
        const filePath = path.join(dir, file);
        return new Promise((resolve1, reject1) => {
          ejs.renderFile(filePath, projectInfo, {}, (err, result) => {
            if (err) {
              reject1(err);
            } else {
              fse.writeFileSync(filePath, result);
              resolve1(result);
            }
          });
        });
      })).then(() => {
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  });
}

async function install(options) {
  const projectPrompt = [];
  const descriptionPrompt = {
    type: 'input',
    name: 'description',
    message: '请输入项目描述信息',
    default: '',
    validate: function(v) {
      const done = this.async();
      setTimeout(function() {
        if (!v) {
          done('请输入项目描述信息');
          return;
        }
        done(null, true);
      }, 0);
    },
  };
  projectPrompt.push(descriptionPrompt);
  const projectInfo = await inquirer.prompt(projectPrompt);
  options.projectInfo.description = projectInfo.description;
  const { sourcePath, targetPath } = options;
  try {
    fse.ensureDirSync(sourcePath);
    fse.ensureDirSync(targetPath);
    fse.copySync(sourcePath, targetPath);
    const templateIgnore = options.templateInfo.ignore || [];
    const ignore = ['**/node_modules/**', ...templateIgnore];
    await ejsRender({ ignore, targetPath, data: options.projectInfo });
  } catch (e) {
    throw e;
  }
}

module.exports = install;
