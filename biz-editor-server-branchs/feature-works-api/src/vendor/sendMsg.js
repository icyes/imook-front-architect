/**
 * @description 模拟发送短信
 * @author 双越
 */

/**
 * 发送短信验证码
 * @param {string} phoneNumber 手机号
 * @param {string} code 验证码
 * @param {string} timeout 过期时间，分钟
 */
async function sendVeriCodeMsg(phoneNumber, code, timeout = '') {
    if (!phoneNumber || !code) return Promise.reject(new Error('手机号或验证码为空'))

    return Promise.resolve('ok') // 模拟一个异步
}

module.exports = {
    sendVeriCodeMsg,
}
