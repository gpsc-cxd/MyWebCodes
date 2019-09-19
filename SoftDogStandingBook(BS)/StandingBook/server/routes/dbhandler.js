var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var assert = require('assert');
var url = require('url');
var host = "localhost";
var port = "23233";
var Urls = 'mongodb://localhost:23233/data';
// classweb  ===> 自动创建一个


//add一条数据 
var add = function (db, collections, selector, fn) {
  var collection = db.db("data").collection(collections);
  collection.insertMany([selector], function (err, result) {
    try {
      assert.equal(err, null)
    } catch (e) {
      console.log(e);
      result = [];
    };

    fn(result);
    db.close();
  });
}
//delete
var deletes = function (db, collections, selector, fn) {
  var collection = db.db("data").collection(collections);
  collection.deleteOne(selector, function (err, result) {
    try {
      assert.equal(err, null);
      assert.notStrictEqual(0, result.result.n);
    } catch (e) {
      console.log(e);
      result.result = "";
    };

    fn(result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
    db.close;
  });
};
//find
var find = function (db, collections, selector, fn) {
  //collections="hashtable";
  var collection = db.db("data").collection(collections);
  collection.find(selector).sort({ Applydate: -1 }).toArray(function (err, result) {
    //console.log(docs);
    try {
      assert.equal(err, null);
    } catch (e) {
      console.log(e);
      result = [];
    }
    fn(result)
    db.close();
  });
}

//update
var updates = function (db, collections, selector, fn) {
  var collection = db.db("data").collection(collections);
  //需要转换_id为objectid
  // selector[0]._id=mongo.ObjectID(selector[0]._id);
  var where = { _id: mongo.ObjectId(selector[0]._id) };
  console.log(selector);
  collection.updateOne(where, selector[1], function (err, result) {
    try {
      assert.equal(err, null);
      assert.notStrictEqual(0, result.result.n);
    } catch (e) {
      // console.log(e);
      result = [];
    };

    fn(result); //如果没报错且返回数据不是0，那么表示操作成功。
    db.close();
  });

}
var methodType = {
  // 项目所需
  data: find,
  //   type ---> 不放在服务器上面
  //  放入到服务器
  //  请求---> 根据传入进来的请求 数据库操作
  //  req.query    req.body
  show: find, //后台部分
  add: add,
  update: updates,
  delete: deletes,
  updatePwd: updates,
  //portal部分
  showCourse: find,
  register: add,
  exportexcel: find
};
//主逻辑    服务器  ， 请求    --》 
// req.route.path ==》 防止前端的请求 直接操作你的数据库
module.exports = function (req, res, collections, selector, fn) {
  MongoClient.connect(Urls, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    // 根据 请求的地址来确定是什么操作  （为了安全，避免前端直接通过请求url操作数据库）
    // console.log(req.route.path);
    methodType[req.route.path.substr(1)](db, collections, selector, fn);

    //db.close();
  });

};