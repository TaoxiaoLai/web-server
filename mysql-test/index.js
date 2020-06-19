// const mysql = require('mysql')

// // 创建链接对象
// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '950131',
//     port: '3306',
//     database: 'myblog'
// })

// // 开始连接
// con.connect()

// // 执行sql语句
// const sql = `select * from blogs`
// con.query(sql, (err, result) => {
//     if(err) {
//         console.error(err)
//         return 
//     }
//     console.log(result)
// })

// // 关闭连接
// con.end()