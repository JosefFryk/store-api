require('dotenv').config()
const Airtable = require("airtable-node")


const airtable = new Airtable ({apiKey: process.env.AIRTABLE_API_KEY})
    .base('appzIAgibQs2j4SPh')
    .table('products')



exports.handler = async (event, context, cb) => {
    const {id} = event.queryStringParameters.id
    if (id) {
        try {
            const response = await airtable.retrieve(id)
            const data = response.map((product) => {
              return { id: product.id,  ...product.fields };
            });
            const product = data.find((product) => product.id === id);
      
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
    try {
        const { records } = await airtable.list()
        const products = records.map((product) => {
          const { id } = product
          const { name, imageAttach, price, company, description, category, shipping, star,colors } = product.fields
          const image = imageAttach[0].url
          return { id, name, image, price, company, description, category, shipping, star, colors }
        })
        return {
          statusCode: 200,
          body: JSON.stringify(products),
        }
      } catch (error) {
        return {
          statusCode: 500,
          body: 'Server Error',
        }
      }
}
