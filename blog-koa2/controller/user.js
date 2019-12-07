
const {exec, escape} = require('../db/mysql');
const {genPassword} = require('../utils/cryp');

const login = async (username, password) => {

    username = escape(username);
    // 生成加密密码
    password = genPassword(password);
    password = escape(password);

    const sql = `select username, realname from users where username=${username} and password=${password}; `;

    const loginDataRows = await exec(sql);
    return loginDataRows[0] || {};
    // return exec(sql).then(loginDataRows => {
    //     return loginDataRows[0] || {};
    // });
};

module.exports = {
    login
};