const  http = require('http');

const querystring = require('querystring');

// get请求demo
// const server = http.createServer( (rep, res) => {
//     console.log('method: ' + rep.method);
//     const url = rep.url;
//     console.log('url:' + url);
//     rep.query = querystring.parse(url.split('?')[1]);  //querystring.parse将?后面的url参数转化成对象格式
//     const newLocal = rep.query;
//     console.log('query:', newLocal);
//     res.end( 
//         JSON.stringify(rep.query ),
//         console.log("JSON",JSON.stringify(rep.query ))
//     );
// });

// post请求demo
// const server = http.createServer( (req, res) => {
//     if(req.method === "POST"){
//         console.log('req method :', req.method);
//         console.log('res header content-type:', req.headers);
//     }
//     let postData = '';
//     req.on('data', (chunk) => {      //chunk是二进制数，postData是字符串
//         postData += chunk.toString();
//         console.log('chunk:', chunk);
//     });
//     req.on('end', () => {
//         console.log("postData: ", postData);
//         res.end('响应结束。');
//     })
// })

//综合示例
const server = http.createServer( (req, res) => {
    const url = req.url;
    const method = req.method;
    const query = req.url.split("?")[1];
    const path = req.url.split("?")[0];

    //设置响应的类型是json格式
    res.setHeader('Content-type','application/json');
    const reqData = {
        url,
        method,
        query,
        path
    }

    if(req.method === 'GET'){
        console.log('req.method:', req.method);
        res.end(
            //将JavaScript的值转化为json格式。
            JSON.stringify(reqData)
            // console.log('reqData:', reqData)
        );
    }
    else if(req.method === 'POST'){
        let postData = '';
        req.on('data',( chunk ) => {
            postData += chunk.toString();
        });
        //POST请求结束后将传递的数据给reqData
        req.on('end',() =>{
            console.log('postData: ', postData);
            reqData.postData = postData;
            res.end(
                JSON.stringify(reqData)
            )
        });
    }
})

server.listen(8000);
console.log('ok 8000');
