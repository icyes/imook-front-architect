/**
 * @description mysql2 连接测试
 * @author 双越
 */

const mysql = require('mysql2/promise')
const { mysqlConf } = require('../config/index')

async function testMysqlConn() {
    const connection = await mysql.createConnection(mysqlConf)
    const [rows] = await connection.execute('select now();')
    return rows
}

// // 可直接执行 node src/db/mysql2.js 进行测试
// ;(async () => {
//     const rows = await testMysqlConn()
//     console.log(rows)
// })()

module.exports = testMysqlConn
