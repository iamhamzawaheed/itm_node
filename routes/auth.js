var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res) {
  res.send('test');
});

module.exports = router;