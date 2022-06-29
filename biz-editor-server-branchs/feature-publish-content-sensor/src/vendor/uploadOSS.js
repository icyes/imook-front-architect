/**
 * @description 上传文件到 oss
 * @author 双越
 */

const fs = require('fs')
const url = require('url')
const OSS = require('ali-oss')
const { aliyunOSSConf, aliyunOSS_CDNHost: CDNHost } = require('../config/index')
const { isPrd } = require('../utils/env')

// 初始化 oss 实例
const client = new OSS(aliyunOSSConf)

/**
 * 替换 url 的 host 为 CDN host
 * @param {string} u url
 */
function replaceCDNHost(u = '') {
    if (!u) return u
    const res = url.parse(u)

    let { protocol } = res
    if (isPrd) protocol = 'https:' // 线上环境，强行 https

    const { path } = res
    const u1 = `${protocol}//${CDNHost}${path}` // 替换 CDN host
    return u1
}

/**
 * 上传文件到 oss
 * @param {string} fileName 文件名
 * @param {string} filePath 文件路径
 */
async function uploadOSS(fileName, filePath) {
    const stream = fs.createReadStream(filePath)
    try {
        const folder = 'upload-files' // OSS 的文件夹
        // 使用 stream 上传，效率高
        const res = await client.putStream(`${folder}/${fileName}`, stream)
        return replaceCDNHost(res.url)
    } catch (ex) {
        console.error('阿里云 OSS 上传错误', ex)
        // TODO 报警
        throw new Error('阿里云 OSS 上传错误')
    }
}

module.exports = uploadOSS
