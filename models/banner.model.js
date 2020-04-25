const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  tripId: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
