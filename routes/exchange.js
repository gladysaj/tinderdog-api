const express = require("express");
const router = express.Router();
const Exchange = require("../models/Exchange");
const Dog = require("../models/Dog");
const { veryToken } = require("../utils/auth");

//To get the dogs to match with
router.get("/tinder-dog", (req, res) => {
  Dog.find()
    .then((dog) => {
      res.status(200).json({ result: dog });
    })
    .catch((err) => res.status(404).json(err));
});

// Like, dislike, match route
router.post("/tinder-dog", (req, res) => {
  const request = req.body;
  //el aplicante es el id de mi perro, el requested es el perro que me gusto. Estoy buscando todos los likes, dislikes y matches que tiene mi perro
  Exchange.find({ requestedDog: request.applicantDog }).then((response) => {
    //de los perros que me han dado like, voy a encontrar si existe un perro con ese mismo id
    const match = response.find(
      //en este caso se invierten los papeles
      (data, index) =>
        data.applicantDog /*perro que aplico para mi perra*/ ===
        request.requestedDog //el perro que me gusto
    );
    if (match !== undefined && request.status == "Like") {
      request["status"] = "match";
      Exchange.findByIdAndUpdate(
        match._id,
        { $set: { status: request["status"] } },
        { new: true } //para que se visualuce lo que se actualizo
      )
        .then((response) => {
          res.status(200).json({ msg: "Tienes un match" });
        })
        .catch((err) => res.status(400).json(err));
    } else {
      //este representa me gusta o no me gusta en caso de que no tenga solicitud
      Exchange.create(req.body)
        .then((exchange) => {
          res.status(201).json({ exchange });
        })
        .catch((err) => res.status(400).json(err));
    }
  });
});

//To get the list of matches my dog has
router.get("/matches", veryToken, (req, res) => {
  const { _id } = req.user;
  Exchange.find({ applicantDog: _id })
    .populate({
      path: "requestedDog",
      populate: {
        path: "owner",
        select: "name",
      },
    })
    .then((matches) => {
      res.status(200).json({ result: matches });
    })
    .catch((err) => res.status(400).json(err));
});

//To delete one match
router.delete("/matches/:id", veryToken, (req, res) => {
  const { id } = req.params;
  Exchange.findByIdAndDelete(id)
    .then((match) => {
      res.status(200).json({ result: match });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
