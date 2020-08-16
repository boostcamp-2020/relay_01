const express = require('express');
const router = express.Router();
const path = require("path");

/* GET home page. */
router.get('/cam', (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/search.html"));
});

router.get('/text', (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/index.html"));
})

module.exports = router;
