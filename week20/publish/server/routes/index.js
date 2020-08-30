var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.post('/', function (req, res, next) {
  console.log('req.body: ', req.body);
  fs.writeFileSync(`../server/public/${req.query.filename}`, req.body.content);
  res.send('');
  res.end(200);
});

module.exports = router;