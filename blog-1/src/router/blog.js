const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../../src/controller/blog')
const {
    SuccessModel,
    ErrorModel
} = require('../../src/model/resModel')

const handleBlogRouer = (req, res) => {
    const method = req.method;
    const id = req.query.id;
    //获取博客列表
    if (method === "GET" && req.path === "/api/blog/list") {
        let user = req.query.user || ''
        let keyWord = req.query.keyWord || ''
        // let getData = getList(author, keyWord)
        // return new SuccessModel(getData)
        const result = getList(user, keyWord)
        return result.then(listData => {
            return new SuccessModel(listData)
        })

    }

    //获取博客列表内容
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const detail =  getDetail(id)
        // return new SuccessModel(detail)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //创建博客列表
    if (method === 'POST' && req.path === '/api/blog/build') {
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //更新博客列表
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then(res => {
            if (res) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    //删除博客列表接口
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author = 'zhangshang'
        const result = delBlog(id, author)
         return result.then( delVal => {
            if (delVal) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouer

// npm run dev 启动配置中的www.js