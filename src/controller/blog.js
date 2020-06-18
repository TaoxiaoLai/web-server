const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: 'blogA',
            content: 'blog contentA',
            author: 'zhangsan'
        },
        {
            id: 2,
            title: 'blogB',
            content: 'blog contentB',
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
    return [
        {
            id: 1,
            title: 'blogA',
            content: 'blog contentA',
            author: 'zhangsan'
        } 
    ]
}

const newBlog = (blogData = {}) => {
    console.log(blogData)
    return {
        id: 3   // 表示新建博客，插入到数据里面的id
    }
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