const http = require('http')
const querystring = require('querystring')

//处理get请求 
// const server = http.createServer((req, res) => {
//     console.log('method: ', req.method)
//     const url = req.url
//     console.log('url: ', url)
//     req.query = querystring.parse(url.split('?')[1])    //querystring用来处理字符串，parse方法可以将字符串转化为对象
//     console.log('query: ', req.query)   //{ author: 'xiaolai', id: '1008' }
//     res.end(
//         JSON.stringify(req.query)
//     )
// })

//处理post请求
// const server = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         // req数据格式
//         console.log('req content-type: ', req.headers['content-type'])
//         // 接收数据
//         let postData = ''
//         req.on('data', chunk => {
//             postData += chunk.toString()
//         })
//         req.on('end', () => {
//             console.log('postData: ', postData)
//             res.end('hello world')
//         })
//     }
// })

// 综合示例
const server = http.createServer((req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])

    // 设置返回格式为 JSON
    res.setHeader('Content-type', 'application/json')

    // 返回的数据
    const resData = {
        method,
        url,
        path,
        query
    }

    if(method === 'GET') {
        res.end(
           JSON.stringify(resData)
        )
    }
    if(method === 'POST') {
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            resData.postData = postData
            res.end(
                JSON.stringify(resData)
            )
        })
    }
})


server.listen(8000)
console.log('OK')