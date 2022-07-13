//domain/.netlify/functions/1-hello
exports.handler = async (event, context) => {
    return {
        statusCode:404,
        body: 'Resource not FOund'
    }
}