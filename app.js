// Add dotenv configuration
require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Add Mongoose Connections
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/tinderdog-backend", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((x) => 
console.log(`Connected to mongo! database name: "${x.connections[0].name}"`)
)
.catch((err) => console.log("Error connecting to the database", err));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const fosterRouter = require('./routes/foster')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/foster', fosterRouter);

module.exports = app;
