require('dotenv').config();
const server = require('express').Router();
const url = require('url');
var request = require('request-promise');
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_APP_ID, SHOPIFY_API_PASSWORD,APP_DOMAIN } = process.env;

const testUrl= `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${APP_DOMAIN}/admin/api/2020-07/`;

server.get("/",(req, res, next)=>{
  let options = {
        method: 'GET',
        uri: testUrl+"products.json",
        json: true,
    };
  request(options).then((response) => {
    console.log(response)
    res.send(response)
  })
})

module.exports = server;
