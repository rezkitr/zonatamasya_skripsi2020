const router = require("express").Router();
let OpenTrip = require("../models/opentrip.model");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router
  .route("/add")
  .post(
    upload.fields([{ name: "cardImage" }, { name: "bannerImage" }]),
    (req, res) => {
      console.log(req.body);

      const tripName = req.body.tripName;
      const tripKeyword = req.body.tripKeyword;
      const region = req.body.region;
      const highlighted = req.body.highlighted;
      const tripDuration = req.body.tripDuration;
      const tripDeparture = JSON.parse(req.body.tripDeparture);
      const price = JSON.parse(req.body.price);
      const schedule = req.body.schedule;
      const itinerary = req.body.itinerary;
      const facility = req.body.facility;
      const cardImage = req.files.cardImage[0].filename;
      const bannerImage = req.files.bannerImage[0].filename;

      const newOpenTrip = new OpenTrip({
        tripName,
        tripKeyword,
        region,
        highlighted,
        tripDuration,
        tripDeparture,
        price,
        schedule,
        itinerary,
        facility,
        cardImage,
        bannerImage
      });

      newOpenTrip
        .save()
        .then(() => res.json("New open trip added"))
        .catch(err => console.log(err));
    }
  );

module.exports = router;
