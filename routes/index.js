var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('--> Home ');
  res.locals = {
    title: 'Home',
    moar: {
      infoz:'kewl'
    }
  }
  res.render('home');
});

module.exports = router;
