var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', function callback() {
    console.log('Connection Error!');
});
db.once('open', function callback() {
    //Create Schemas
    console.log('Connected!');
});
var dataSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    dogcode: String,
    applydate: String,
    compname: String,
    name: String,
    phonenumber: String,
    dogtype: String,
    expirationdate: String,
    remark: String,
    regionalname: String,
    regionalcode: String,
    software: String,
    servicetype: String,
    type: String
});
mongoose.model('data', dataSchema);
mongoose.connect('mongodb://localhost:23233/data');

module.exports = mongoose;