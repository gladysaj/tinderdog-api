const express = require("express");
const router = express.router();
const Dog = require("../models/Dog");
const { veryToken } = require("../utils/auth");

// Create dog
router.post("/", veryToken, (req, res) => {
  const { _id: owner } = req.user;

  Dog.create({ ...req.body, owner })
    .then((dog) => {
      res.status(201).json({ result: dog });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;