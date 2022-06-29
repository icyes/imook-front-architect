/**
 * @description dev 配置
 * @author 双越
 */

const devConf = require('./dev')

// 修改 mongodb 连接配置
Object.assign(devConf.mongodbConf, {
    port: '27016', // 依赖于 biz-editor-server 启动 docker-compose
    host: 'docker-host', // docker 内部访问宿主机的 hostName， 配置在 Dockerfile
})

// 修改 redis 连接配置
Object.assign(devConf.redisConf, {
    port: '6378', // 依赖于 biz-editor-server 启动 docker-compose
    host: 'docker-host', // docker 内部访问宿主机的 hostName， 配置在 Dockerfile
})

// 修改 mysql 连接配置
Object.assign(devConf.mysqlConf, {
    port: '3305', // 依赖于 biz-editor-server 启动 docker-compose
    host: 'docker-host', // docker 内部访问宿主机的 hostName， 配置在 Dockerfile
})

module.exports = devConf
