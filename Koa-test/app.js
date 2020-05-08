// const Koa = require('koa')
// const app = new Koa()

// const Router = require('koa-router')

// let home = new Router()

// // 子路由1
// home.get('/', async ( ctx )=>{
//   let html = `
//     <ul>
//       <li><a href="/page/helloworld">/page/helloworld</a></li>
//       <li><a href="/page/404">/page/404</a></li>
//     </ul>
//   `
//   ctx.body = html
// })

// // 子路由2
// let page = new Router()
// page.get('/404', async ( ctx )=>{
//   ctx.body = '404 page!'
// }).get('/helloworld', async ( ctx )=>{
//   ctx.body = 'helloworld page!'
// })

// // 装载所有子路由，使用router.use方法，能够为路由分层
// let router = new Router()
// router.use('/', home.routes(), home.allowedMethods())   //注册路由
// router.use('/page', page.routes(), page.allowedMethods()) //在根路由'/page'中，注册路由page.routes()。

// // 加载路由中间件,将路由注册到app中
// app.use(router.routes()).use(router.allowedMethods())

// app.listen(3000, () => {
//   console.log('[demo] route-use-middleware is starting at port 3000')
// })


// const koa = require('koa')
// const router = require('koa-router')

// const app = new koa()
// //实例化子路由 1
// const home = new router()
// home.get('/', async( ctx ) => {
//     ctx.body = `
//         <li>
//             <a href='/page/home'> this is home pages </a></br>
//             <a href='/page/404'> this is 404 pages </a>
//        </li>     
//     `
// })
//实例化子路由 2
// const page = new router()
// page.get('/home', async(ctx) => {
//     ctx.body=`<a>this is home pages</a>`
// }).get('/404', async(ctx) => {
//     ctx.body=`<a>this is 404 pages </a>`
// })

// //分层管理子路由.use() home 和 page
// const rout = new router()
// //将子路由注册到 根路由'/'下
// rout.use('/', home.routes(), home.allowedMethods())
// rout.use('/page', page.routes(), page.allowedMethods())
// //注册路由到app上
// app.use(rout.routes(), rout.allowedMethods())

// app.listen(3000, () => {
//     console.log('3000 start')
// })


// const Koa = require('koa')
// //注意 require('koa-router')() 返回的是函数
// const routers = require('koa-router')

// const app = new Koa()
// const router = new routers()
// //使用get方法处理URL
// app.use( async( ctx, next) => {
//      console.log(`${ctx.request.method} + ${ctx.request.url}`)
//      await next()
// })

// //增加一个处理 url 为'/hello/name' 的router
// router.get( '/hello/name', async (ctx, next) => {
//     const name = ctx.params.name  //通过ctx.params访问name方法。
//      ctx.response.body = `<h>hello ${name}</h>`
// } )

// //另一个处理url为 '/' 的router
// router.get('/', async( ctx, next) => {     
//      ctx.response.body = `<h>hello index </h>`
// })

// //增加一个router 中间件
// app.use(router.routes())
// app.listen(3000)
// console.log('app started at port 3000')

//原生 处理Post请求
const koa = require('koa')
const Router = require('koa-router')

const app = new koa()
const router = new Router()


//get请求页面
router.get('/', async (ctx) => {
    ctx.body = `
        <h> koa  POST request demo </h>
        <form method="POST">
            <lable>nickName:<input name="name" /></lable></br>
            <lable>Name:<input name="nickName" /></lable></br>
            <lable>ages:<input name="age" /></lable></br>
            <button type="submit">submit</button></br>
        </form>
    `
})

//获取post请求的数据,需要使用原生的node.js提供的req对象的data事件，end的事件
router.post('/', async (ctx) => {
    //从req对象内获取post的数据
    const parseQueryString = await postQueryString(ctx)
    const jsonData = await parseToJson(parseQueryString)
    ctx.body=jsonData;
    console.log('parseQueryString is:',parseQueryString)
})


//postQueryString获取数据
function postQueryString(ctx) {
    return new Promise((resovle, reject) => {
        let postData = ''
        ctx.req.on('data', data => {
            postData += data
        })
        ctx.req.on('end', () => {
            resovle(postData)
        })
    })
}

//将拿到的序列化post数据解析成json格式
function parseToJson( parseQueryString ) {
    let jsonObeject = {}
    return new Promise( (resovle, reject) => {
        const splitData = parseQueryString.split('&')
        console.log('splitData is :',splitData)
        for( let [index, value]  of splitData.entries()){
            let inedxVal = value.split('=')
            console.log('inedxVal:',inedxVal)
            jsonObeject[inedxVal[0]]= inedxVal[1]
        }
        resovle(jsonObeject)
    })
}


app.use(router.routes(), router.allowedMethods())
app.listen(3000, () => {
    console.log('ok')
})