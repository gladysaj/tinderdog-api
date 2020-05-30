const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog");
const { veryToken } = require("../utils/auth");

// Create dog
router.post("/create-dog", veryToken, (req, res) => {
  const { _id: owner } = req.user;

  Dog.findOne({owner: {$eq: owner}}).then(result => {
    if(result === null) {
      Dog.create({ ...req.body, owner })
      .then((dog) => {
        res.status(201).json({ result: dog });
      })
      .catch((err) => res.status(400).json(err));
    } else {
      res.status(401).json({ msg: "ya tienes un perro" })
    }
  }).catch(err => res.status(400).json({ error: err }));
});

// Request all dogs for match
router.get('/match', veryToken, (req, res) => {
  const { _id: id } = req.user;
  
  Dog.findOne({owner: {$eq: id}}).then(result => {
    const myDogGender = result.gender;
    const oppositeGender = myDogGender === "Male" ? "Female" : "Male";

    Dog.find({
      owner:{$ne: id}, foster:false, gender:oppositeGender
    }).then(result => {
      res.send(result);
    }).catch(err => res.status(400).json({ error: err }));
  }).catch(err => res.status(400).json({ error: err }));
});

// Request all dogs for foster
router.get('/foster', veryToken, (req, res) => {
  const { _id: id } = req.user;
    
    Dog.find({
      owner:{$ne: id}, foster:true
    }).populate('owner', 'avatar name email phoneNumber').then(result => {
      res.send(result);
    }).catch(err => res.status(400).json({ error: err }));
});

// Update dog
router.patch("/:id", veryToken, (req, res) => {
  const { id } = req.params;

  Dog.findByIdAndUpdate(id, req.body, { new: true })
    .then((dog) => {
      res.status(200).json({ result: dog });
    })
    .catch((err) => res.status(400).json(err));
});

// Like
router.post("/only-like", veryToken, (req, res) => {
  const { myDogId, likedDogId } = req.body;

  Dog.findByIdAndUpdate(myDogId, {$push: {liked: likedDogId}}, {new: true}).then(dog => {
    res.status(200).json({ msg: "Dog liked ❤️", dog })
  }).catch(err => res.status(400).json(err))
})

// Match
router.post("/is-match", veryToken, (req, res) => {
  const { myDogId, likedDogId } = req.body;
  
  Dog.findByIdAndUpdate(myDogId, {$push: {match: likedDogId}}, {new: true}).then(dog => {
    
    Dog.findByIdAndUpdate(likedDogId, {$push: {match: myDogId}}, {new: true}).then(dog => {
      console.log("Didn't match")
    }).catch(err => console.log("There was an error"))

    res.status(200).json({ msg: "Nice! You have a match", dog })
  }).catch(err => res.status(400).json(err))
})

// // Get dog owner
// router.get("/dog-owner", veryToken, (req, res) => {
//   const { likedDogId } = req.body;

//   Dog.findById(likedDogId)
//     .populate("owner", "name avatar phone")
//     .then((dog) => {
//       res.status(200).json({
//         result: dog,
//       });
//     })
//     .catch((err) => res.status(400).json(err));
// });

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