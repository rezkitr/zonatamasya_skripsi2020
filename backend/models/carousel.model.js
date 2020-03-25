const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carouselSchema = new Schema({
  tripId: {
    type: String,
    required: true
  },
  carouselImage: {
    type: String,
    required: true
  }
});

const Carousel = mongoose.model("Carousel", carouselSchema);
module.exports = Carousel;
