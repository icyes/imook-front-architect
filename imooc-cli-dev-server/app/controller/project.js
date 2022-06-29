'use strict';

const Controller = require('egg').Controller;
const mongo = require('../utils/mongo');

class ProjectController extends Controller {
  // 获取项目/组件的代码模板
  async getTemplate() {
    const { ctx } = this;
    const data = await mongo().query('project');
    ctx.body = data;
  }
}

module.exports = ProjectController;
