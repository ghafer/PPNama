var express = require('express');
var router = express.Router();
var usercontroller = require('../controller/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', usercontroller.registerUser);

module.exports = router;
