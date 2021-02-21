`use strict`;

// Libraries
const express = require('express');
const fs = require('fs');

// starts server
const app = express();
// sets base file as client
app.use(express.static('client'));

//functions that don't recieve/return anything from client

//gives directory file
// used for GET request /loadDir
// nothing in req.query
function getDirectory(req, res){
  let jsonLocation = `client/topics/directory.json`
  let jsonFile = JSON.parse(fs.readFileSync(jsonLocation, 'utf8'));
  res.json(jsonFile);
}

//gives lesson.json
// used for GET request /loadLesson
//req.query contains id only
function loadLesson(req, res){
  let jsonLocation = `client/topics/${req.query.id}/lesson.json`;
  let jsonFile = JSON.parse(fs.readFileSync(jsonLocation, 'utf8'));
  res.json(jsonFile);
}

//gives quiz.json
// used for GET request /loadQuiz
//req.query contains id only
function loadQuiz(req, res){
  let jsonLocation = `client/topics/${req.query.id}/quiz.json`;
  let jsonFile = JSON.parse(fs.readFileSync(jsonLocation, 'utf8'));
  res.json(jsonFile);
}

// GET requests
app.get('/loadDir', getDirectory);
app.get('/loadLesson', loadLesson);
app.get('/loadQuiz', loadQuiz);

// listens on to port, either set directly by heroku (process.env.PORT) or 8080
app.listen(process.env.PORT || 8080);
