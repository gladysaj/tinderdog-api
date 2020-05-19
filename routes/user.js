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

// Log in
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user === null) return res.status(404).json({ msg: "Email no existe" });

    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const userObject = user.toObject();
        delete userObject.password;
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: "1d",
        });
        res
          .cookie("token", token, {
            expires: new Date(Date.now() + 86400000),
            secure: false,
            httpOnly: true,
          })
          .json({ user: userObject });
      }
    });
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
