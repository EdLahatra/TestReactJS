const express = require('express');
const bodyParser = require("body-parser");
const server = express();
const jsonfile = require('jsonfile')

const file = './public/list.json';

server.use(bodyParser.urlencoded({ extended: true }));


// enable CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization, Referer');
  next();
});

server.listen(3000);
 
server.get('/get-list', (req, res) => {
  jsonfile.readFile(file, (err, obj) => {
    res.json(obj);
  })
});

server.get('/get-item/:code', (req, res) => {
  const codeFile = `./public/${req.params.code}.json`
  jsonfile.readFile(codeFile, (err, obj) => {
    res.json(obj);
  })
});
