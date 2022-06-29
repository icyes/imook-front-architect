/**
 * @description 统计服务入口文件
 * @author 双越
 */

const { splitLogFileTimed } = require('./analysis/index')

splitLogFileTimed() // 定时拆分日志文件
