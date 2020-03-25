const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
let Carousel = require("../models/carousel.model");

// getAll
router.route("/").get((req, res) => {
  Carousel.find()
    .then(crs => res.json(crs))
    .catch(err => res.status(400).json("Error : " + err));
});

// addCarousel
const uploadDir = path.join(
  __dirname + "./../../client/public/upload/carouselImg/"
);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, "crs-" + Date.now() + "-" + file.originalname);
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

router.route("/add").post(upload.single("carouselImage"), (req, res) => {
  const tripId = req.body.tripId;
  const carouselImage = req.file.filename;

  const newCarousel = new Carousel({
    tripId,
    carouselImage
  });

  newCarousel
    .save()
    .then(() => res.json("New carousel added"))
    .catch(err => res.status(400).json("Error" + err));
});

module.exports = router;
