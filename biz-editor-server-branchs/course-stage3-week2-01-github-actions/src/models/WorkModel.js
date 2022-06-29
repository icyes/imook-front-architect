/**
 * @description 作品内容 Model ，存储到 Mongodb
 * @author 双越
 */

const mongoose = require('../db/mongoose')

const WorkSchema = mongoose.Schema(
    {
        // mongodb 会自动生成 _id ，不用自己专门定义

        // 标题
        title: String,

        // 页面的组件列表
        components: [Object],
        // 页面的属性，保证扩展性
        props: Object,
        // 配置信息，保证扩展性
        setting: Object,
    },
    { timestamps: true }
)

const WorkModel = mongoose.model('work', WorkSchema)

module.exports = {
    WorkModel,
}
