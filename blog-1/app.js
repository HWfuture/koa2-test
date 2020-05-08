const querystring = require('querystring')
const handalBlogRouter = require('./src/router/blog');
const { handleUserRouer, getCookieExpries } = require('./src/router/user');

var  SESSION_DATA ={}

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== "POST"){
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        
        let postData = '';
        req.on('data',( chunk ) => {
            postData += chunk.toString();
            // console.log('postData+',postData)
        });
        //POST请求结束后将传递的数据给reqData
        req.on('end',() =>{
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    //设置以json格式返回数据
    res.setHeader('Content-Type', 'application/json')
    const url = req.url;
    req.path = url.split('?')[0];
    //为 req对象加一个属性query
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie 为res添加一个cookie属性
    req.cookie = {}
    const cookieSrc = req.headers.cookie || ""
    cookieSrc.split(';').forEach( items => {
        if(!items){
            return
        }
        const item = items.split('=')
        const key = item[0].trim()
        const value = item[1].trim()
        req.cookie[key] = value
        // cookie.key = value
    });
    // console.log("cookie is:",cookie.username)

    //解析session
    let needSetCookie =false   //判断返回是否需要设置cookie
    let userId = req.cookie.userId
    if(userId){
        // console.log('userId is:',userId)
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        }
    }else{
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
        // console.log(' SESSION_DATA[userId]3232323 = {}', SESSION_DATA[userId])
    }
    req.session = SESSION_DATA[userId]
    // console.log('req.session--1',req.session)


    //处理post data
    getPostData(req).then( postData => {
        // console.log('postData,',postData)
        req.body = postData
        //handalBlog博客接口
        const blogResult = handalBlogRouter(req, res)
        if(blogResult) {
            blogResult.then( blogData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; Expires=${getCookieExpries()}`)
                }
                res.end(
                    JSON.stringify( blogData )    //将return回来的对象转化成JSON字符串
                )
            })
            return
        }

        // const blogData =  handalBlogRouter(req, res)
        // //判断传递过来的数据是否为空
        // if(blogData){
        //     res.end(
        //         JSON.stringify( blogData )    //将return回来的对象转化成JSON字符串
        //     )
        // }

        //handalUser博客接口
        const UserDataResult =  handleUserRouer(req, res)
        //判断传递过来的数据是否为空
        if(UserDataResult){
            UserDataResult.then( UserData => {
                 if(needSetCookie){
                    res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; Expires=${getCookieExpries()}`)
                }
            res.end(
                // console.log(UserDataResult),
                JSON.stringify(UserData)    //将return回来的对象转化成JSON字符串
            )
            })
            return
        }

        // 未命中路由，返回 404
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()
        })
}

module.exports = serverHandle