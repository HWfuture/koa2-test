const {
    exec
} = require('../db/mysql')

const getList = (author, keyWord) => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyWord) {
        sql += `and title like '%${keyWord}%' `
    }
    sql += ` order by createtime desc; `

    //exec是promise对象
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from  blogs  where id='${id}' `
    return exec(sql).then(row => {
        console.log('row:', row)
        console.log('row[0]:', row[0])
        return row[0] //取出返回的sql语句数组里面的第一个元素，也就是对象。
    })
}

//判断传递过来的blogdata是否为空，为空就赋值为空对象
const newBlog = (blogdata = {}) => {
    const author = 'zhangshang'
    const title = blogdata.title
    const content = blogdata.content
    const createtime = Date.now()
    const sql = `
            insert into blogs (author, title, content, createtime) values ( '${author}', '${title}', '${content}', ${createtime} );
        `
    return exec(sql).then(insertData => {
        console.log('insertData id is:', insertData.insertId)
        return {
            id: insertData.insertId //插入到数据库里 面的id序列号
        }
    })
}

//更新博客
const updateBlog = (id, updatedata = {}) => {
    const title = updatedata.title
    const content = updatedata.content
    const sql = `
        update blogs set title='${title}', content='${content}' where  id=${id};
    `
    return exec(sql).then(res => {
        console.log('res is', res)
        if (res.affectedRows > 0) {
            // console.log('updateBlog is:', updatedata)
            return true
        } else {
            return false
        }
    })
}

//删除博客
const delBlog = (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}'; `
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}