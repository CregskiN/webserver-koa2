const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json'); //  json处理
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser'); // postData 放在 body 内
const logger = require('koa-logger'); // 控制台日志美观
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const fs = require('fs');
const path = require('path');
const morgan = require('koa-morgan');

const {
    REDIS_CONF
} = require('./config/db');

// 引入 router
const index = require('./routes/index');
const users = require('./routes/users');
const blog = require('./routes/blog');
const user = require('./routes/user');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start; // 计算当前请求在服务端耗时
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// 处理日志
const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
    // 开发环境 / 测试环境
    app.use(morgan('dev'))
} else {
    // 生产环境
    const logFileName = path.join(__dirname, 'logs', 'access.log');
    const writeStream = fs.createWriteStream(logFileName, {
        flags: 'a'
    });
    app.use(morgan('combined', {
        stream: writeStream // 接收流，用于输出
    }));
}


// session 配置
app.keys = ['CregskiN_2724#'];
app.use(session({
    // 配置 cookie
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    // 配置 redis
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}` // 写死本地 redis-server
    })

}));



// 注册 routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;