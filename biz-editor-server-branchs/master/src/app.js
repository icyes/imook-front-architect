const Koa = require('koa')

const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('./middlewares/jwt')
const cors = require('./middlewares/cors')

const index = require('./routes/index')
const users = require('./routes/users')
const works = require('./routes/works')
const templates = require('./routes/templates')
const channel = require('./routes/channel')
const utils = require('./routes/utils')

// error handler
onerror(app)

// 支持跨域
app.use(cors)

// 配置 jwt
app.use(jwt)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(`${__dirname}/public`))

app.use(
    views(`${__dirname}/views`, {
        extension: 'pug',
    })
)

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(works.routes(), works.allowedMethods())
app.use(templates.routes(), templates.allowedMethods())
app.use(channel.routes(), channel.allowedMethods())
app.use(utils.routes(), utils.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
