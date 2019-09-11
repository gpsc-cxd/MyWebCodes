var express = require('express');
var router = express.Router();
var handler = require('./dbhandler')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//show data
router.get('/show', function (req, res, next) {
  var param = req.query;
  var selector = JSON.parse(param.selector);
  var parser = {};
  for (var key in selector) {
    console.log(key);
    parser[key] = new RegExp(selector[key])
  }
  console.log(parser);
  // var selector = param.selector;
  handler(req, res, param.collection, parser, data => {
    // console.log(res);
    res.send(data);
  })
});
//add data
router.get('/add', function (req, res, next) {
  var param = req.query;
  var selector = JSON.parse(param.selector);
  console.log(selector);
  handler(req, res, param.collection, selector, data => {
    res.send(data);
  })
})
//update
router.get('/update',function(req,res,next){
  var param = req.query;
  var selector=JSON.parse(param.selector);
  console.log(selector);
  handler(req,res,param.collection,selector,data=>{
    res.send(data);
  })
})
module.exports = router;
