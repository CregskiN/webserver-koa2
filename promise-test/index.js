const fs = require('fs');
const path = require('path');

// fs.readFile(fullFileName, (err,data) => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(data.toString());
// });

// callback 方式 获取文件的内容
// function getFileContent(fileName, callback) {
//     const fullFileName = path.resolve(__dirname, 'files', 'a.json');
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         callback(
//             JSON.parse(data.toString())
//         );
//
//     });
// }

// // 顺序文件内容 回callback - hell
// getFileContent('a.json', (aData) => {
//     console.log('a data', aData);
//     getFileContent(aData.next, (bData) => {
//         console.log('b data', bData);
//         getFileContent(bData.next, (cData) => {
//             console.log('c data', cData);
//         })
//     })
// });

// promise 获取文件内容
function getFileContent(fileName) {
    return new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', 'a.json');
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(
                JSON.parse(data.toString())
            )
        });
    })
}

// // promise调用
// getFileContent('a.json').then(aData => {
//     console.log('a.json', aData);
//     return getFileContent(aData.next);
// }).then(bData => {
//     console.log('b.json', bData);
//     return getFileContent(bData.next);
// }).then(cData => {
//     console.log('c.json', cData)
// });

// async await
async function readFileData() {
    try {
        // 同步写法
        const aData = await getFileContent('a.json'); // await + promise 返回提取的promise-resolve结果
        console.log('a data', aData);
        const bData = await getFileContent(aData.next);
        console.log('b data', bData);
        const cData = await getFileContent(bData.next);
        console.log('c data', cData);
    } catch (err) {
        console.log(err);
    }
}

readFileData();

// async function readAData() {
//     const aData = await getFileContent('a.json');
//     return aData;
// }
//
// async function test() {
//     const aData = await readAData();
//     console.log(aData);
// }
//
// test();

// async await 要点
// 1. await 后面可追加 promise 对象
// 2. await 必须包裹在 async 函数里
// 3. async 函数执行返回的也是一个promise对象
// 4. try-catch 截获 promise 中 reject 的值