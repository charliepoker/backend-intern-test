var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/home", function (req, res, next) {
  res.json({ message: "Weclome to my Api" });
});

module.exports = router;
