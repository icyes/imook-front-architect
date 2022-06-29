const inquirer = require('inquirer');

inquirer
  .prompt([{
    type: 'list',
    name: 'name',
    message: 'your choice:',
    choices: [{
      name: 'sam', value: 'sam',
    }, {
      name: 'shuangyue', value: 'sy',
    }, {
      name: 'zhangxuan', value: 'zx',
    }],
  }])
  .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers);
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
