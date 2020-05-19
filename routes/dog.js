const express = require("express");
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

// Request dog
router.get("/:id", veryToken, (req, res) => {
  const { id } = req.params;

  Dog.findById(id)
    .populate("owner", "name avatar")
    .then((dog) => {
      res.status(200).json({ result: dog });
    })
    .catch((err) => res.status(400).json(err));
});

// Update dog
router.patch("/:id", veryToken, (req, res) => {
  const { id } = req.params;

  Dog.findByIdAndUpdate(id, req.body, { new: true })
    .populate("owner", "name avatar")
    .then((dog) => {
      res.status(200).json({ result: dog });
    })
    .catch((err) => res.status(400).json(err));
});

// Delete dog
router.delete("/:id", veryToken, (req, res) => {
  const { id } = req.params;
  Dog.findByIdAndRemove(id)
    .then((dog) => {
      res.status(200).json({
        result: dog,
      });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;