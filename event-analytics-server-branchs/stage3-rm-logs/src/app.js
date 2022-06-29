/**
 * @description 统计服务入口文件
 * @author 双越
 */

const { splitLogFileTimed, rmLogsTimed } = require('./analysis/index')

splitLogFileTimed() // 定时拆分日志文件
rmLogsTimed() // 定时删除过期日志文件
