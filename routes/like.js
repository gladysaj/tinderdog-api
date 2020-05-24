const express = require('express');
const router = express.Router();

const Dog = require('../models/Dog');
const Match = require('../models/Match');
const { veryToken } = require("../utils/auth");

router.post("/like", veryToken, (req, res) => {
  // 1. Toma el modelo de Dog y busca el dog con el id al que le estas dando like
  const { id } = req.body;
  const { _id: userId } = req.user;
  // 2. Agrega el dog id a la property "likes" del perro al que le estas dando like
  Dog.findOne({ owner: userId }).then(result => {
    const { _id: myDogId } = result;
    Dog.findByIdAndUpdate(id, { $push: { likes: myDogId } }, { returnOriginal: false }).then(result => {
      // 3. Checa si ese perro te ha dado like a ti (a tu perro) buscando el id del perro
      // al que le estas dando like, en tus "likes" properties
      Dog.findByIdAndUpdate(myDogId, { $push: { myLikes: id } }).then(result => {
      // Le gusto al perro que le di like?
       const likesMe = result.likes.indexOf(id) > -1;
       if (likesMe === true) {
         // Si le gusto entonces ambos nos gustamos, crearemos el match aquí
         Match.create({ dogs: [id, myDogId] }).then(() => {
          res.json({ msg: 'Match created' });
        }).catch(err => {
          res.status(400).send(err);
        });
       } else {
        // Si no, entonces simplemente le di like
        res.json({ msg: 'Liked' });
       }
      }).catch(err => {
        res.status(400).json({ error: err });
      });
    }).catch(err => {
      res.status(400).json({ error: err });
    });
  });
})

module.exports = router;