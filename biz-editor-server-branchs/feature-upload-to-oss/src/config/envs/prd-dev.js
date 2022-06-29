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

// 修改 mongodb 连接配置
Object.assign(devConf.mongodbConf, {
    host: 'editor-mongo', // 和 docker-compose 中配置的 service 名字一致
})

// 修改 mysql 连接配置
Object.assign(devConf.mysqlConf, {
    host: 'editor-mysql', // 和 docker-compose 中配置的 service 名字一致
})

// 发布出来的 h5 域名
devConf.h5Origin = 'http://182.92.168.192:8082'

module.exports = devConf
