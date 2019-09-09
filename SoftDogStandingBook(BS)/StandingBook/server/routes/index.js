var express = require('express');
var router = express.Router();
var handler = require('./dbhandler')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//post
router.get('/show', function (req, res, next) {
  var param = req.query;
  var selector = JSON.parse(param.selector);
  console.log(req.query);
  handler(req, res, param.collection.toString(), selector, data => {
    // console.log(res);
    res.send(data);
  })
})
module.exports = router;
