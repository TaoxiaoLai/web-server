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

module.exports = {
    getList,
    getDetail
}