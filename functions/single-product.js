require('dotenv').config()
const Airtable = require('airtable');


Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
const base = Airtable.base('appzIAgibQs2j4SPh');
const table = base.table('products');

exports.handler = async (event, context, callback) => {
    const id = event.queryStringParameters.id;
    const response = await table.select({}).firstPage();
  
    const data = response.map((product) => {
      return { id: product.id,  ...product.fields };
    });
    const product = data.find((product) => product.id === id);
  if (product) {
    return (
      null,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify(product),
      }
    );
  } else {
    return (
      null,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 404,
        body: 'Not Found',
      }
    );
  }
};