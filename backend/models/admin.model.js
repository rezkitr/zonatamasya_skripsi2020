const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username : {
    type : String,
    unique : true,
    required : true
  },
  password : {
    type : String,
    required : true,
    minlength : 6
  }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;

