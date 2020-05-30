// Add dotenv configuration
require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const isProd = process.env.NODE_ENV === 'production' ? true : false;
const mongoUrl = isProd ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@waggys-m6jyb.mongodb.net/test?retryWrites=true&w=majority` : 'mongodb://localhost/tinderdog-backend';

// Add Mongoose Connections
const mongoose = require("mongoose")
mongoose.connect(mongoUrl, {
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
    origin: ["http://localhost:3001", "http://localhost:3000", "https://i-dog.herokuapp.com/"],
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
const dogsRouter = require('./routes/dog');
const likesRouter = require('./routes/like');
const dislikesRouter = require('./routes/dislike');
const ownerRouter = require('./routes/owner');

// All routes must start with "/api"
app.use('/api/', indexRouter);
app.use('/api/', usersRouter);
app.use('/api/', likesRouter);
app.use('/api/', dislikesRouter);
app.use('/api/', dogsRouter);
app.use('/api/', ownerRouter);

// If express doesn't find the route, send the index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
