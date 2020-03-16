const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const promoSchema = new Schema({
  tripId : {
    type : String,
    required : true
  },
  code: {
    type: String,
    unique: true,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  description : {
    type : String
  },
  expDate : {
    type : String,
    required : true
  }
});

const Promo = mongoose.model('Promo', promoSchema);
module.exports = Promo;