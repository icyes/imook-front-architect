/**
 * @description 404 error router
 * @author 双越
 */

const router = require('koa-router')()

// 错误页
router.get('/error', async ctx => {
    await ctx.render('error', {
        title: '网站错误',
        pageType: 'error',
    })
})

// 404 路由，放在最后！！！
router.get('*', async ctx => {
    await ctx.render('404', {
        title: '404',
        desc: '页面不存在',
        pageType: '404',
    })
})

module.exports = router
