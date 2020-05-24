const express = require('express');
const router = express.Router();

const Dog = require('../models/Dog');
const { veryToken } = require("../utils/auth");

router.post("/dislike", veryToken, (req, res) => {
  const { id } = req.body;
  const { _id: userId } = req.user;

  Dog.findOne({ owner: userId }).then(result => {
    const { _id: myDogId } = result;
    Dog.findByIdAndUpdate(myDogId, { $push: { myDislikes: id } }, { returnOriginal: false }).then(result => {
      res.json({ msg: "Disliked" });
     }).catch(err => {
       res.status(400).json({ error: err });
     });
  }).catch(err => {
    res.status(400).json({ error: err });
  });
})

module.exports = router;