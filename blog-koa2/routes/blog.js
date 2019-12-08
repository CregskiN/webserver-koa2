const router = require('koa-router')();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
router.prefix('/api/blog');



router.get('/list', async (ctx, next) => {
    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';

    if (ctx.query.isadmin) {
        console.log('is admin!');
        if (ctx.session.username == null) {
            console.log('is admin, but no login!');
            // 未登录
            ctx.body = new ErrorModel('未登录');
            return;
        }
        author = ctx.session.username
    }

    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData);
})

router.get('/detail', async (ctx, next) => {
    const id = ctx.query.id;
    const result = await getDetail(id);

    ctx.body = new SuccessModel(result);
});

// 新增博客
router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body;
    body.author = ctx.session.username;
    const data = await newBlog(body);
    ctx.body = new SuccessModel(data);
})


// 更新博客
router.post('/update', loginCheck, async (ctx, next) => {
    const id = ctx.query.id;
    const newContent = ctx.body;
    const isUpdate = await updateBlog(id, newContent);

    if (isUpdate) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel('更新博客失败！');
    }

});

// 删除博客
router.post('/del', loginCheck, async (ctx, next) => {
    const id = ctx.query.id;
    const author = ctx.session.username; // 假数据，开发登录后改成真实数据
    const isDelete = await delBlog(id, author);

    if (isDelete) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel('更新博客失败！');
    }

});


module.exports = router;