/**
 * @description mock admin API
 * @author 双越
 */

export default {
    'GET /api/admin/getUserInfo': {
        errno: 0,
        data: {
            username: '双越',
        },

        // // 模拟当前未登录
        // errno: 1,
        // message: '未登录',
    },

    'POST /api/admin/login': {
        errno: 0,
        data: {
            token: 'xxxxxx',
        },
    },
}
