'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy'); // REVIEW: We've added a new package here to our requirements, as well as in the package.json
const PORT = process.env.PORT || 3000;
const app = express();
// const conString = 'postgres://USERNAME:PASSWORD@HOST:PORT';
const conString = 'postgres://localhost:5432'; // TODO: Don't forget to set your own conString
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.listen(PORT, function(){
  console.log('This is the port you are working on' + PORT)
})

// COMMENT: What is this route doing? Where does it receive a request from?
// (put your response in a comment here)
// app.get('/admin', (request, response) => response.sendFile('admin.html', {root: './public'}));
