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

// Request all dogs
router.get('/dogs', veryToken, (req, res) => {
  const { _id: id } = req.user;
  // const id = "5ec86db08566bc04073f06a5";

  Dog.findOne({ owner: id }).then(result => {
    const myDog = result;
    const myLikes = myDog.myLikes;
    const myDislikes = myDog.myDislikes;
    Dog.find({ "_id": { $nin: [...myLikes, ...myDislikes, myDog._id] } }).then(result => {
      res.send(result);
    }).catch(err => res.status(400).json({ error: err }));
  }).catch(err => res.status(400).json({ error: err }));
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