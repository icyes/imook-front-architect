const fse = require('fs-extra');
const inquirer = require('./lib/inquirer');
const render = require('./lib/render');

module.exports = async function(options) {
  console.log(options);
  let description = '';
  while(!description) {
    description = await inquirer({
      type: 'string',
      message: '请输入描述信息',
      defaultValue: '',
    });
  }
  const sourceDir = options.template.path;
  const targetDir = options.targetPath;
  fse.ensureDirSync(sourceDir);
  fse.ensureDirSync(targetDir);
  fse.copySync(sourceDir, targetDir);
  const ejsIgnoreFiles = [
    '**/node_modules/**',
    '**/.git/**',
    '**/.vscode/**',
    '**/.DS_Store',
    '**/public/**'
  ];
  const ejsData = Object.assign({}, options.data, { description });
  await render(targetDir, ejsData, {
    ignore: ejsIgnoreFiles,
  });
  await npminstall(targetDir);
  await execStartCommand(targetDir, ['npm', 'run', 'serve']);
}

async function execStartCommand(targetPath, startCommand) {
  return new Promise((resolve, reject) => {
    const p = exec(startCommand[0], startCommand.slice(1), { stdio: 'inherit', cwd: targetPath });
    p.on('error', e => {
      reject(e);
    });
    p.on('exit', c => {
      resolve(c);
    });
  });
}

async function npminstall(targetPath) {
  return new Promise((resolve, reject) => {
    const p = exec('cnpm', ['install'], { stdio: 'inherit', cwd: targetPath });
    p.on('error', e => {
      reject(e);
    });
    p.on('exit', c => {
      resolve(c);
    });
  });
}

function exec(command, args, options) {
  const win32 = process.platform === 'win32';

  const cmd = win32 ? 'cmd' : command;
  const cmdArgs = win32 ? ['/c'].concat(command, args) : args;

  return require('child_process').spawn(cmd, cmdArgs, options || {});
}