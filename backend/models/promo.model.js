const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const promoSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
  discount: {
    type: Number,
    required: true
  }
});

const Promo = mongoose.model('Promo', promoSchema);
module.exports = Promo;