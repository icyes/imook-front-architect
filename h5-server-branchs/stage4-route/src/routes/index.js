const router = require('koa-router')()
const { ENV } = require('../utils/env')
const { WorkContentModel } = require('../models/WorkContentModel')
const { cacheGet, cacheSet } = require('../cache/index')
const testMysqlConn = require('../db/mysql2')
const packageInfo = require('../../package.json')

// router.get('/', async (ctx, next) => {
//     await ctx.render('index', {
//         title: 'Hello Koa 2!',
//     })
// })

// router.get('/string', async (ctx, next) => {
//     ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//     ctx.body = {
//         title: 'koa2 json',
//     }
// })

router.get('/api/db-check', async ctx => {
    // 测试 mongodb 连接
    let mongodbConn
    try {
        mongodbConn = true
        await WorkContentModel.findOne()
    } catch (ex) {
        mongodbConn = false
    }

    // 测试 redis
    cacheSet('name', 'h5 server OK - by redis')
    const redisTestVal = await cacheGet('name')

    // 测试 mysql 连接
    const mysqlRes = await testMysqlConn()

    ctx.body = {
        errno: 0,
        data: {
            name: 'h5 server OK',
            version: packageInfo.version,
            ENV, // 测试环境量变量
            redisConn: redisTestVal != null,
            mongodbConn,
            mysqlConn: mysqlRes.length > 0,
        },
    }
})

module.exports = router
