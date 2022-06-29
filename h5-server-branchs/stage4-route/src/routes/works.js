/**
 * @description works router
 * @author 双越
 */

const router = require('koa-router')()
const { splitIdAndUuid } = require('../utils/util')
const { findPublishWork, findPreviewWork } = require('../controller/works')

// 路由前缀
router.prefix('/p')

router.get('/:idAndUuid', async ctx => {
    const { idAndUuid } = ctx.params // '10-abc'
    const { id, uuid } = splitIdAndUuid(idAndUuid) // { id: '10', uuid: 'abc' }

    const work = await findPublishWork(id, uuid)
    if (work == null) {
        // 返回 404
        await ctx.render('404', { pageType: '404' })
        return
    }

    // 渲染页面内容
    await ctx.render('work', {
        // 后面要承载 Vue3 SSR 的结果 - html 标签
        content: `<div style="color: blue;">${JSON.stringify(work)}</div>`,
    })
})

router.get('/preview/:idAndUuid', async ctx => {
    const { idAndUuid } = ctx.params
    const { id, uuid } = splitIdAndUuid(idAndUuid)

    const work = await findPreviewWork(id, uuid)
    if (work == null) {
        // 返回 404
        await ctx.render('404', { pageType: '404' })
        return
    }

    // 渲染页面内容
    await ctx.render('work', {
        content: `<div style="color: blue;">${JSON.stringify(work)}</div>`,
        pageType: 'preview',
    })
})

module.exports = router
