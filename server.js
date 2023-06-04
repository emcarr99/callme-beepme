const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");


const PORT = 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(routes);


db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
// init express/mongo
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// port & init express app
const PORT = 3001;
const app = express();

// middleware to handle incoming data
app.use(express.urlencoded({ extended: true }));
// middleware to handle data in JSON format
app.use(express.json());
app.use(routes);

// logs successful database connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server now listening on ${PORT}`);
  });
});
