/**
 * @description 发布作品
 * @author 双越
 */

const _ = require('lodash')
const {
    updateWorkService,
    findOneWorkService,
    updatePublishContentService,
} = require('../../service/works')
const { ErrorRes, SuccessRes } = require('../../res-model/index')
const {
    publishWorkFailInfo,
    publishWorkDbErrorFailInfo,
    forceOffLineFailInfo,
} = require('../../res-model/failInfo/index')
const { h5Origin } = require('../../config/index')
const { publishWorkClearCache } = require('../../cache/works/publish')
const { isDev } = require('../../utils/env')

/**
 * 发布项目
 * @param {string} id id
 * @param {string} author 作者 username
 * @param {boolean} isTemplate 设置为模板
 */
async function publishWork(id, author, isTemplate = false) {
    const work = await findOneWorkService({
        id,
        author,
    })
    if (work == null) return new ErrorRes(publishWorkFailInfo, 'id 或者作者不匹配')

    // 是否强制下线
    if (parseInt(work.status, 10) === 3) {
        return new ErrorRes(forceOffLineFailInfo)
    }

    // // 内容审核（非 dev 环境下）
    // if (!isDev) {
    //     const censorResult = await contentCensor(work)
    //     if (censorResult) {
    //         // 审核失败，打印日志
    //         console.log(`id ${id} 作品内容检查失败`, JSON.stringify(censorResult, null, 4))

    //         // 需要输出 data ，所有就自定义 ErrorRes 了 ，不用 failInfo 了
    //         return new ErrorRes({
    //             errno: -1,
    //             data: censorResult,
    //             message: '内容审核失败',
    //         })
    //     }
    // }

    // 发布，需要更新的数据。要遵守 WorksModel 的属性规范
    const updateData = {
        status: 2,
        latestPublishAt: new Date(),
    }
    if (isTemplate) {
        // 发布为模板
        Object.assign(updateData, {
            isTemplate: true,
        })
    }

    let result
    try {
        // 更新发布的内容
        const publishContentId = await updatePublishContentService(
            work.content,
            work.publishContentId
        )

        // 发布项目（更新 status）
        result = await updateWorkService(
            {
                publishContentId,
                ...updateData,
            },
            { id, author }
        )
    } catch (ex) {
        console.error('发布作品错误', id, ex)
        // TODO 报警。title 中要有作品 id `发布作品 ${id} 错误` ，报警会根据 title 缓存
        return new ErrorRes(publishWorkDbErrorFailInfo)
    }

    if (!result) return new ErrorRes(publishWorkFailInfo) // 发布失败

    // 重新发布，清空缓存
    publishWorkClearCache(id)

    // 发布成功，返回连接
    // 注意，由于 uuid 是 4 位的，为了防止重复，再把 id 拼接上，这样就唯一了
    const url = `${h5Origin}/p/${work.id}-${work.uuid}`
    return new SuccessRes({ url })
}

module.exports = {
    publishWork,
}
