const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id    

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const dataList = getList(author, keyword)
        // return new SuccessModel(dataList)

        const result = getList(author, keyword)
        return result.then(dataList => {
            return new SuccessModel(dataList)
        })
    }

    // 获取博客详情
    if(method === "GET" && req.path === '/api/blog/detail') {
        // const data = getDetail(id)
        // return new SuccessModel(data)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建一篇博客
    if(method === "POST" && req.path === '/api/blog/new') {
        // const data = newBlog(req.body)
        // return new SuccessModel(data)
        req.body.author = 'wangwu' // 假数据，开发登录功能时再加上
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新一篇博客
    if(method === "POST" && req.path === '/api/blog/update') {
        // const result = updateBlog(id, req.body)
        // if (result) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('更新博客失败')
        // }
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    // 删除一篇博客
    if(method === "POST" && req.path === '/api/blog/del') {
        // const result = delBlog(id)
        // if (result) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('删除博客失败')
        // }
        const author = 'wangwu'  //假数据，开发登录功能时修改
        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter