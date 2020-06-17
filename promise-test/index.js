const fs = require('fs')
const path = require('path')
const { resolve } = require('path')
const { rejects } = require('assert')

// // callback方式获取一个文件的内容
// function getFileContent(fileName, callback) {
//     const fullFileName = path.resolve(__dirname, 'files', fileName)
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }

// // 测试
// getFileContent('a.json', aData => {
//     console.log('aData: ', aData)
//     getFileContent(aData.next, bData => {
//         console.log('bData: ', bData)
//         getFileContent(bData.next, cData => {
//             console.log('cData: ', cData)
//         })
//     })
// })

// 使用promise方式读取文件内容
function getFileContent(fileName) {
    const promise = new Promise((resolve, rejects) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                rejects(err)
                return 
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

// 测试
getFileContent('a.json').then( aData => {
    console.log(aData)
    return getFileContent(aData.next)
}).then( bData => {
    console.log(bData)
    return getFileContent(bData.next)
}).then( cData => {
    console.log(cData)
})