`use strict`;

const express = require('express');
const app = express();

// sets base file as client
app.use(express.static('client'));

// listens on port 8080
app.listen(8080);
