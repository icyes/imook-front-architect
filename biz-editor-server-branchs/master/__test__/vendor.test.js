/**
 * @description 第三方服务 test
 * @author 双越
 */

const path = require('path')
const { sendVeriCodeMsg } = require('../src/vendor/sendMsg')
const uploadOSS = require('../src/vendor/uploadOSS')
const { textCensor, imgCensor } = require('../src/vendor/contentSensor')

describe('第三方 API', () => {
    test('发短信验证码', async () => {
        const phoneNumber = `15510037372` // 注意，要把这个手机号加入到频率限制白名单里，否则 1h 之内发送的短信数量会被限制
        const res = await sendVeriCodeMsg(phoneNumber, '0000', '2')
        const { SendStatusSet = [] } = res
        const SendStatus = SendStatusSet[0] || {}
        expect(SendStatus.Code).toBe('Ok')
    })

    test('上传文件到阿里云 OSS', async () => {
        const fileName = 'a.jpeg'
        const filePath = path.resolve(__dirname, 'files', 'a.jpeg')

        const url = await uploadOSS(fileName, filePath)
        expect(url).not.toBeNull()
        expect(url.lastIndexOf(fileName)).toBeGreaterThan(0)
    })

    // 文本审核，暂时关掉
    test(
        '内容审查',
        async () => {
            // 文本审核 - 正常文字
            const text1 = 'hello world'
            const textRes1 = await textCensor(text1)
            expect(textRes1).toBeNull()

            // 文本审核 - 敏感文字，不演示

            // 图片审核 - 正常图片
            const img1 = 'http://static-dev.imooc-lego.com/upload-files/a.jpeg'
            const imgRes1 = await imgCensor(img1)
            expect(imgRes1).toBeNull()

            // 图片审核 - 敏感图片，血腥图片
            const img2 =
                'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4022283284,2614648235&fm=26&gp=0.jpg'
            const imgRes2 = await imgCensor(img2)
            expect(imgRes2).not.toBeNull()
        },
        20 * 1000 // 单独设置 timeout
    )
})
