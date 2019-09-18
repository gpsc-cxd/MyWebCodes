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
router.get('/update', function (req, res, next) {
  var param = req.query;
  var selector = JSON.parse(param.selector);
  console.log(selector);
  handler(req, res, param.collection, selector, data => {
    res.send(data);
  })
})
//export word
router.get('/exportword', function (req, res, next) {
  var param = req.query;
  var date = new Date();
  var output = date.getFullYear().toString() + date.getMonth().toString(2) + date.getDay().toString(2) + date.getHours().toString(2) +
    date.getMinutes().toString(2) + date.getSeconds().toString(2) + '.doc';
    var data = param.data.replace('"','\\\"');
  console.log(data, output);
  var command = 'F:/陈晓东/SoftProgram/C#C++/SoftDogStandingBookConsole/SoftDogStandingBookConsole/bin/Debug/SoftDogStandingBookConsole.exe word ' + param.data + ' ' + output;
  // window.oldOnError = window.onerror;
  // window._command = command;
  window.onerror = function (err) {
    if (err.indexOf('utomation') != -1) {
      alert('请更改你的IE的安全级别：开始->设置->控制面板->Internet选项->安全->自定义级别->对没有标记为安全的ActiveX控件进行初始化和脚本运行->启用。命令：' + window._command);
      return true;
    }
    else
      return false;
  };

  var wsh = new ActiveXObject('WScript.Shell');
  if (wsh) wsh.Run(command);
  wsh = null;
  // window.onerror = window.oldOnError;

  var file = new File(output);
  res.send(file);
})
module.exports = router;
