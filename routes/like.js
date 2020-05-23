const express = require('express');
const router = express.Router();

router.post("/like", (req, res) => {
  res.send("like")
})

module.exports = router;