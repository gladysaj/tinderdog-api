var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { veryToken } = require("../utils/auth");

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

// User Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user === null) return res.status(404).json({ msg: "Invalid email" });

      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          const userWithoutPassword = user.toObject();
          delete userWithoutPassword.password;
          const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: "1d",
          });
          res
            .cookie("token", token, {
              expires: new Date(Date.now() + 86400000),
              secure: false,
              httpOnly: true,
            })
            .json({ user: userWithoutPassword });
        } else {
          return res.status(401).json({ msg: "Invalid password" });
        }
      });
    })
    .catch((err) => res.status(400).json({ err }));
});

// User Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ msg: "Logout" });
});

// Get user dogs
router.get("/find-dog", veryToken, (req, res) => {
  const { _id: id } = req.user;

  Dog.find({ owner: id })
    .then((dogs) => {
      res.status(200).json({ dogs });
    })
    .catch((err) => res.status(400).json({ err }));
});

// User update
router.post("/user-update/:id", (req, res) => {
  const { id } = req.params;
  console.log("nose", req.params);
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((user) => {
      res.status(200).json({
        result: user,
      });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
