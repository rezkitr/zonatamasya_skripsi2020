const router = require("express").Router();
let OpenTrip = require("../models/opentrip.model");
const multer = require("multer");
var path = require("path");

// getAll
router.route("/").get((req, res) => {
  OpenTrip.find()
    .sort({ tripName: "asc" })
    .then(ot => res.json(ot))
    .catch(err => res.status(400).json("Error : " + err));
});

// getTripbyId
router.route("/:id").get((req, res) => {
  OpenTrip.findById(req.params.id)
    .then(ot => res.json(ot))
    .catch(err => res.status(400).json("Error : " + err));
});

// addOpenTrip
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(
      null,
      path.join(__dirname + "./../../client/public/upload/opentripImg/")
    );
  },
  filename: function(req, file, cb) {
    cb(null, "zt-" + Date.now() + "-" + file.originalname);
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
      const name = req.body.name;
      const keyword = JSON.parse(req.body.keyword);
      const region = req.body.region;
      const highlighted = req.body.highlighted;
      const duration = req.body.duration;
      const departure = JSON.parse(req.body.departure);
      const price = JSON.parse(req.body.price);
      const schedule = JSON.parse(req.body.schedule);
      const itinerary = JSON.parse(req.body.itinerary);
      const facility = JSON.parse(req.body.facility);
      const cardImage = req.files.cardImage[0].filename;
      const bannerImage = req.files.bannerImage[0].filename;

      const newOpenTrip = new OpenTrip({
        name,
        keyword,
        region,
        highlighted,
        duration,
        departure,
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
        .catch(err => res.status(400).json("Error" + err));
    }
  );

router.route("/:id").delete((req, res) => {
  OpenTrip.findByIdAndDelete(req.params.id)
    .then(() => res.json("Trip deleted"))
    .catch(err => res.status(400).json("Error : " + err));
});

module.exports = router;
