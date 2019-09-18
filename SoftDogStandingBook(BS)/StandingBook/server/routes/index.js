var express = require('express');
var router = express.Router();
var handler = require('./dbhandler')
var Path = require('path')

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
router.get('/update', function (req, res, next) {
  var param = req.query;
  var selector = JSON.parse(param.selector);
  console.log(selector);
  handler(req, res, param.collection, selector, data => {
    res.send(data);
  })
})
function buling(input) {
  return input.length < 2 ? "0" + input : input;
}
//export word
router.get('/exportword', function (req, res, next) {
  var param = req.query;
  var date = new Date();
  var output = date.getFullYear().toString() + buling(date.getMonth().toString()) + buling(date.getDay().toString()) + buling(date.getHours().toString()) +
    buling(date.getMinutes().toString()) + buling(date.getSeconds().toString()) + '.doc';
  var data = param.data.replace(/"/g, '\\\"');
  var arg = "word " + data + " " + output;
  console.log(arg);
  var exec = require('child_process').exec;
  // var path = 'F:/陈晓东/SoftProgram/C#C++/SoftDogStandingBookConsole/SoftDogStandingBookConsole/bin/Debug/'
  var path = Path.join(__dirname, '../public/cs/');
  var exepath = Path.join(path, 'SoftDogStandingBookConsole.exe');
  //防止路径有空格等字符，路径前后加引号
  exec('"' + exepath + '" ' + arg, (err, data, stderr) => {
    console.log(err);
    var filepath = Path.join(path, '/output/', output);
    res.sendFile(filepath);
  })
})
// router.get('/exportexcel', function (req, res, next) {
//   var param = req.query;
//   var date = new Date();
//   var output = date.getFullYear().toString() + buling(date.getMonth().toString()) + buling(date.getDay().toString()) + buling(date.getHours().toString()) +
//     buling(date.getMinutes().toString()) + buling(date.getSeconds().toString()) + '.xlsx';
//   // var path = 'F:/陈晓东/SoftProgram/C#C++/SoftDogStandingBookConsole/SoftDogStandingBookConsole/bin/Debug/';
//   var path = __dirname + '/public/cs/'
//   var selector = {};
//   selector[param.type] = new RegExp(param.keyword);
//   console.log(selector);
//   handler(req, res, 'standingbook', selector, Response => {
//     Response.forEach(element => {
//       delete element._id;
//     });
//     var data = JSON.stringify(Response).replace(/"/g, '\\\"');
//     console.log(data);
//     var arg = "excel " + data + " " + output;
//     var exec = require('child_process').exec;
//     exec(path + 'SoftDogStandingBookConsole.exe ' + arg, (err, data, stderr) => {
//       var filepath = path + 'output/' + output;
//       res.sendFile(__dirname + filepath);
//     })
//   })
// })
module.exports = router;
