const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../../src/model/resModel')


const handleUserRouer = (req, res) => {
    const method = req.method;
//登陆博客api/blog/login
    if(method === 'GET' && req.path === '/api/user/login'){
        const { username, password } = req.query
        const result = loginCheck( username, password )
        return result.then( loginData => {
            if(loginData.username){
                // 
                req.session.username = loginData.username
                req.session.realname = loginData.realname
                console.log('req.session:',req.session)

                // console.log('loginData',loginData.username)
                //设置响应的头 path=/让所有的根路由都生效,httpOnly设置JavaScript脚本不能修改Cookie值。
                res.setHeader('Set-Cookie',`username=${loginData.username}; path=/; httpOnly; Expires=${getCookieExpries()}`)
                return new SuccessModel(`username:${req.cookie.username},登陆成功`)
            }
            return new ErrorModel('登陆失败')
        })
    }
//登陆测试
    if(method === 'GET' && req.path === '/api/user/login-test'){
        // console.log('res.cookie.username',req.cookie)
        if(req.cookie.username){
            return Promise.resolve(
                new SuccessModel(
                    session= req.session
                )
            )
        }
        return Promise.resolve(
            new ErrorModel('尚未登陆')
        )
    }
}

//获取cookie的过期时间
const getCookieExpries = () => {
    var d = new Date()
    d.setTime(d.getTime() + (24* 60* 60 * 1000))
    return d.toGMTString()
}

module.exports = {
    handleUserRouer,
    getCookieExpries
}