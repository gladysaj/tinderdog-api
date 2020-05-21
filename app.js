// Add dotenv configuration
require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

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


app.use(
  cors({
    origin: ["http://localhost:3001", "https://i-dog.herokuapp.com/"],
    credentials: true
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const dogsRouter = require('./routes/dog')

// All routes must start with "/api"
app.use('/api/', indexRouter);
app.use('/api/', usersRouter);
app.use('/api/', dogsRouter);

// If express doesn't find the route, send the index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
