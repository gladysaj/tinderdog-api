const express = require('express');
const router = express.Router();

router.post("/dislike", (req, res) => {
  res.send("dislike")
})

module.exports = router;