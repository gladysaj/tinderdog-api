var express = require("express");
var router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create user
router.post("/signup", (req, res) => {
  const { password, ...userValues } = req.body;

  bcrypt.hash(password, 10).then((hashedPassword) => {
    const user = { ...userValues, password: hashedPassword };

    User.create(user)
      .then(() => {
        res.status(201).json({ msg: "User successfully created" });
      })
      .catch((err) => res.status(400).json(err));
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
