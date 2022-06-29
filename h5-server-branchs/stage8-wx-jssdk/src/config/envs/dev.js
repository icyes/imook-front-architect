/**
 * @description dev 配置
 * @author 双越
 */

module.exports = {
    // mongodb 连接配置
    mongodbConf: {
        host: 'localhost',
        port: '27017',
        dbName: 'imooc_lego_course',
    },

    // redis 连接配置
    redisConf: {
        port: '6379',
        host: '127.0.0.1',
    },

    // mysql 连接配置
    mysqlConf: {
        host: 'localhost',
        user: 'root',
        password: 'Mysql_2019',
        port: '3306',
        database: 'imooc_lego_course',
    },

    // 阿里云 OSS 配置，Sam 老师提供
    aliyunOSSConf: {
        accessKeyId: 'LTAI4G7xxxxxxxxR9Y5ZTA',
        accessKeySecret: '8Nlx8ED93xxxxxxxx3oq1o0w9m8',
        bucket: 'imooc-lego-resource-dev',
        region: 'oss-cn-hangzhou',
    },
    // 阿里云 OSS CDN 配置，Sam 老师提供
    aliyunOSS_CDNHost: 'static-dev.imooc-lego.com',

    // 微信公众号配置
    // 在本地运行，由于微信 IP 白名单机制，可能运行不了。测试机和线上机是可以的，已添加白名单
    wxConf: {
        appId: 'wx48bdxxxxxxxxe583',
        secret: '0f887aaaebxxxxxxxxa85cfa39f6',
    },
}
