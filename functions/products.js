require('dotenv').config()
const Airtable = require("airtable-node")


const airtable = new Airtable ({apiKey: process.env.AIRTABLE_API_KEY})
    .base('appzIAgibQs2j4SPh')
    .table('products')


    exports.handler = async (event, context, callback) => {
        const { records } = await airtable.list()
        const products = records.map((product) => {
          const { id } = product
          const { name, imageAttach, price, company, description, category, shipping, star,colors } = product.fields
          const image = imageAttach[0].url
          return { id, name, image, price, company, description, category, shipping, star, colors }
        });
        return (
          null,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            statusCode: 200,
            body: JSON.stringify(products),
          }
        );
      };