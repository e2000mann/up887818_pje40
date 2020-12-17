`use strict`;

// Libraries
const express = require('express');
const fs = require('fs');
const app = express();
// sets base file as client
app.use(express.static('client'));

//gives directory file
// used for GET request /getDir
function getDirectory(req, res){
  let jsonLocation = `client/topics/directory.json`
  let jsonFile = JSON.parse(fs.readFileSync(jsonLocation, 'utf8'));
  res.json(jsonFile);
}

// GET requests
app.get('/loadDir', getDirectory);

// listens on port 8080
app.listen(8080);
