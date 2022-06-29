/**
 * @description 第三方服务 test
 * @author 双越
 */

const path = require('path')
const { sendVeriCodeMsg } = require('../src/vendor/sendMsg')

describe('第三方 API', () => {
    test('发短信验证码', async () => {
        const phoneNumber = `15510037372` // 注意，要把这个手机号加入到频率限制白名单里，否则 1h 之内发送的短信数量会被限制
        const res = await sendVeriCodeMsg(phoneNumber, '0000', '2')
        const { SendStatusSet = [] } = res
        const SendStatus = SendStatusSet[0] || {}
        expect(SendStatus.Code).toBe('Ok')
    })
})
