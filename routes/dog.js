const express = require("express");
//aqui solo cambie express.router por express.Router
const router = express.Router();
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