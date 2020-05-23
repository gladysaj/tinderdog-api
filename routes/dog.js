const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog");
const { veryToken } = require("../utils/auth");

// Create dog
router.post("/dog", veryToken, (req, res) => {
  const { _id: owner } = req.user;

  Dog.create({ ...req.body, owner })
    .then((dog) => {
      res.status(201).json({ result: dog });
    })
    .catch((err) => res.status(400).json(err));
});

// Request a dog
router.get("/:id", veryToken, (req, res) => {
  const { id } = req.params;

  Dog.findById(id)
    .populate("owner", "name avatar")
    .then((dog) => {
      res.status(200).json({ result: dog });
    })
    .catch((err) => res.status(400).json(err));
});

// Request all dogs
router.get('/', veryToken, (req, res) => {
  // populate adds the user object to the dog. "Name" specifies that we only want to bring that key
  Dog.find().populate('owner', 'name avatar').then(dogs => {
      res.status(200).json({ results: dogs })
  }).catch(err => res.status(400).json(err))
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