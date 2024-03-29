const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { resolve } = require('path')
const { rejects } = require('assert')

// 用于处理post data
const getPostData = (req) =>  {
    const promise = new Promise((resolve, rejects) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        // 注意单词拼写，content-type区分大小写，一定要注意！！！
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return 
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
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
    // 设置返回格式为JSON 
    res.setHeader('Content-type', 'application/json')

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]

    // 处理query
    req.query = querystring.parse(url.split('?')[1])

    // 处理cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie.split(';') || ''
    cookieStr.forEach(item => {
        if(!item) {
            return 
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // 处理 post data
    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog路由
        // const blogData = handleBlogRouter(req, res) 
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return 
        // }
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 处理user路由
        // const userData = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return 
        }

        // 未命中路由
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Founded\n")
        res.end()
    })
}

module.exports = serverHandle