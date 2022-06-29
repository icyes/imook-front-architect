const request = require('@imooc-cli-dev/request');

module.exports = function() {
  return request({
    url: '/project/template',
  });
};
