/**
 * @description dev 配置
 * @author 双越
 */

const devConf = require('./dev')

// 修改 redis 连接配置
Object.assign(devConf.redisConf, {
    // 和 docker-compose 中配置的 service 名字一致
    // 【注意】端口依然是 6379 ，而不是 6378 ，后者是宿主机的端口
    host: 'editor-redis',
})

module.exports = devConf
