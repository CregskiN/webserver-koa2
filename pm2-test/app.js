const http = require('http');

const server = http.createServer((req,res) => {
    console.log('模拟日志 - ', Date.now());
    console.log('模拟出错 - ', Date.now());

    if(req.url === '/err') {
        throw new Error('/err 出错了！');
    }

    res.setHeader('Content-type', 'application/json');
    res.end(
        JSON.stringify({
            success: 0,
            msg : 'pm2 test server 1'
        })
    )
});

server.listen(8000);
console.log('server is listening on port 8000 ...');
