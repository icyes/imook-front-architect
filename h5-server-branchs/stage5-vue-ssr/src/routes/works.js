/**
 * @description works router
 * @author 双越
 */

const router = require('koa-router')()
const { splitIdAndUuid } = require('../utils/util')
const { findPublishWork, findPreviewWork } = require('../controller/works')
const { propsToStyle, getLegoComponentsHtml } = require('../controller/render')

// 路由前缀
router.prefix('/p')

/**
 * 渲染页面
 * @param {object} ctx ctx
 * @param {object} work work 信息
 * @param {string} pageType 'publish'/'preview'
 */
async function renderPage(ctx, work, pageType) {
    const { title, desc = '', content = {} } = work
    const { props = {}, components = [], setting = {} } = content

    const bodyStyle = propsToStyle(props)
    const componentsHtml = await getLegoComponentsHtml(components)

    // 渲染页面
    await ctx.render('work', {
        title,
        desc,
        bodyStyle,
        content: componentsHtml,
        pageType,
    })
}

router.get('/:idAndUuid', async ctx => {
    const { idAndUuid } = ctx.params // '10-abc'
    const { id, uuid } = splitIdAndUuid(idAndUuid) // { id: '10', uuid: 'abc' }

    const work = await findPublishWork(id, uuid)
    if (work == null) {
        // 返回 404
        await ctx.render('404', { pageType: '404' })
        return
    }

    // // 渲染页面内容
    // await ctx.render('work', {
    //     content: `<div style="color: blue;">${JSON.stringify(work)}</div>`,
    // })

    if (work.isTemplate) {
        // 模板
        await renderPage(ctx, work, 'template')
    } else {
        // 正常页面
        await renderPage(ctx, work, 'publish')
    }
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

    // // 渲染页面内容
    // await ctx.render('work', {
    //     content: `<div style="color: blue;">${JSON.stringify(work)}</div>`,
    //     pageType: 'preview',
    // })

    // 渲染页面
    await renderPage(ctx, work, 'preview')
})

module.exports = router
