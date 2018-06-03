const express = require('express');

const server = express();

server.get('/', (req, res) =>{
  res.end('It works!');
});

server.listen(process.env.PORT || 3000);
