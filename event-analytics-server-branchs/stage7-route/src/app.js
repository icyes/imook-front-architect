/**
 * @description 统计服务入口文件
 * @author 双越
 */

const Koa = require('koa')

const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const cors = require('./middlewares/cors')
const { isTest } = require('./utils/env')

if (!isTest) {
    const { splitLogFileTimed, analysisLogsTimed, rmLogsTimed } = require('./analysis/index') // eslint-disable-line
    splitLogFileTimed() // 定时拆分日志文件
    analysisLogsTimed() // 定时分析日志，结果入库
    rmLogsTimed() // 定时删除过期日志文件
}

// 路由
const index = require('./routes/index')
const event = require('./routes/event')

// 安装预防，设置必要的 http 头
app.use(helmet())

onerror(app)

// 支持跨域
app.use(cors)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)
app.use(json())
if (!isTest) app.use(logger())

// routes
app.use(index.routes(), index.allowedMethods())
app.use(event.routes(), event.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
