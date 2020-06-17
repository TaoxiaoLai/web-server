const serverHandle = (req, res) => {
    // 设置返回格式为JSON 
    res.setHeader('Content-type', 'application/json')

    const resData = {

    }

    res.end = (
        JSON.stringify(resData)
    )
}

module.exports = serverHandle