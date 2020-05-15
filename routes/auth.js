const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Sign up
router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10).then(hashedPassword => {
    const user =  { email, password: hashedPassword };
    User.create(user).then(() => {
      res.status(201).json({ msg: "User was created"});
    })
    .catch((err) => res.status(400).json(err));
  });
});


module.exports = router;
