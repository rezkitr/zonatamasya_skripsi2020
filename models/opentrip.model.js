const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opentripSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    keyword: {
      type: [String],
      required: true
    },
    region: {
      type: String,
      required: true
    },
    highlighted: {
      type: Boolean,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    departure: {
      start: {
        type: String,
        required: true
      },
      mepo: {
        type: [String],
        required: true
      }
    },
    price: {
      priceFull: {
        type: Number,
        required: true
      },
      priceDP: {
        type: Number,
        required: true
      }
    },
    schedule: {
      type: [String],
      required: true
    },
    itinerary: {
      type: [],
      required: true
    },
    facility: {
      type: [String],
      required: true
    },
    cardImage: {
      type: String,
      required: true
    },
    bannerImage: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const OpenTrip = mongoose.model("OpenTrip", opentripSchema);
module.exports = OpenTrip;
