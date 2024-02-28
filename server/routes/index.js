var express = require('express');
var router = express.Router();
const path = require('path')

/* GET home page. */
router.use(express.static(path.join(__dirname, 'client', 'dist')))
router.get('/', function(req, res, next) {
  console.log(__dirname)

  res.sendFile(path.join(__dirname,'dist', 'index.html'));
});

module.exports = router;
