const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog");
const { veryToken } = require("../utils/auth");

// Create dog
router.post("/create-dog", veryToken, (req, res) => {
  const { _id: owner } = req.user;

  Dog.create({ ...req.body, owner })
    .then((dog) => {
      res.status(201).json({ result: dog });
    })
    .catch((err) => res.status(400).json(err));
});

// Request all dogs for match
router.get('/match', veryToken, (req, res) => {
  const { _id: id } = req.user;
    
    Dog.find({
      owner:{$ne: id}, foster:false
    }).then(result => {
      res.send(result);
    }).catch(err => res.status(400).json({ error: err }));
});

// router.get('/match', veryToken, (req, res) => {
//   const { _id: id } = req.user;

//   Dog.findOne({ owner: id }).then(result => {
//     const myDog = result;
//     const myLikes = myDog.myLikes;
//     const myDislikes = myDog.myDislikes;

//     Dog.find({ "_id": { $nin: [...myLikes, ...myDislikes, myDog._id] } }).then(result => {
//       res.send(result);
//     }).catch(err => res.status(400).json({ error: err }));
//   }).catch(err => res.status(401).json({ error: err }));
// });

// Request all dogs for foster
router.get('/foster', veryToken, (req, res) => {
  const { _id: id } = req.user;
    
    Dog.find({
      owner:{$ne: id}, foster:true
    }).then(result => {
      res.send(result);
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