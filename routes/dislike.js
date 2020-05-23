const express = require('express');
const router = express.Router();

const Dog = require('../models/Dog');

router.post("/dislike", (req, res) => {
  const { id, myDogId } = req.body;
  Dog.findByIdAndUpdate(myDogId, { $push: { myDislikes: id } }, { returnOriginal: false }).then(result => {
   res.json({ msg: "Disliked" });
  }).catch(err => {
    res.status(400).json({ error: err });
  });
})

module.exports = router;