require('dotenv').config()
const Airtable = require("airtable-node")


const airtable = new Airtable ({apiKey: process.env.AIRTABLE_API_KEY})
    .base('appIneM6L9YZ6IO3a')
    .table('products')



exports.handler = async (event, context, cb) => {
    const {id} = event.queryStringParameters
    if (id) {
        try {
            const product = await airtable.retrieve(id)
            if (product.error){
                return {
                    statusCode: 404,
                    body: `No product with ID: ${id}`
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(product)
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: `Server Error`,
              }
        }
    }
    return {
        statusCode: 400,
        body: 'Please provide ID'
    }
}
