const router = require('koa-router')();
const {
    login
} = require('../controller/user');
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel');

router.prefix('/api/user');

// 登录 API
router.post('/login', async (ctx, next) => {
    const {username,password} = ctx.request.body;
    const loginData = await login(username, password);

    if (loginData.username) {
        // 设置 session
        ctx.session.username = loginData.username;
        ctx.session.realname = loginData.realname;

        ctx.body = new SuccessModel();
        return; // 直接跳出
    }
    
    ctx.body = new ErrorModel('登陆失败！');
});

// router.get('/session-test', async (ctx, next) => {
//     if (ctx.session.viewCount == null) {
//         ctx.session.viewCount = 0;
//     }
//     ctx.session.viewCount++;
//
//     ctx.body = {
//         success: 0,
//         viewCount: ctx.session.viewCount
//     }
//
// });

module.exports = router;