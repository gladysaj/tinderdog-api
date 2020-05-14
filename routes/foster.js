const express = require("express");
const router = express.Router();
const Foster = require("../models/Foster");


// GET all the dogs by user
router.get("/", (req, res) => {
  const { _id } = req.name;
  Foster.find({ foster: _id })
    .populate({
      path: "dog",
      populate: {
        path: "foster",
        select: "name",
      },
    })
    .then((dogs) => {
      res.status(200).json({ result: dogs });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;