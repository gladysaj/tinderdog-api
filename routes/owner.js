const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { veryToken } = require("../utils/auth");

// Create dog
router.post("/owner", veryToken, (req, res) => {
  const { owner } = req.body;

  User.findById(owner).then(result => {
    res.send({ phoneNumber: result.phoneNumber, name: result.name });
  }).catch(err => res.status(400).json({ error: err }));
});

module.exports = router;