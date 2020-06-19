const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}';`
    return exec(sql).then(row => {
        return row[0]
    })
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 属性
    const title = blogData.title
    const content = blogData.content
    const createtime = Date.now()
    const author = blogData.author

    const sql = `
        insert into blogs (title, content, createtime, author)
        value ('${title}', '${content}', '${createtime}', '${author}');
    `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    console.log(id, blogData)
    return true
}

const delBlog = (id) => {
    console.log(id)
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}