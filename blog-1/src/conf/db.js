// //环境参数 
const env = process.env.NODE_ENV

// //配置

let MYSQL_CONF

if(env === 'dev'){
    MYSQL_CONF = {
        host:'localhost',
        port:'3306',
        user:'root',
        password:'123456',
        database:'blog'
    }
}

if(env === 'production'){
    MYSQL_CONF = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'blog'
    }
}

module.exports = {
    MYSQL_CONF
}