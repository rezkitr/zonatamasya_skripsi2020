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
  __dirname + "./../client/public/upload/carouselFiles/"
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
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 512
  },
  fileFilter: fileFilter
});

router.route("/add").post(upload.single("carouselFile"), (req, res) => {
  const tripId = req.body.tripId;
  const carouselFile = req.file.filename;

  const newCarousel = new Carousel({
    tripId,
    carouselFile
  });

  newCarousel
    .save()
    .then(() => res.json("New carousel added"))
    .catch(err => res.status(400).json("Error" + err));
});

// deleteCarousel
router.route("/delete").post((req, res) => {
  Carousel.findByIdAndDelete(req.body.crsId)
    .then(() => res.json("Carousel deleted"))
    .catch(err => res.status(400).json("Error : " + err));

  fs.unlink(uploadDir + req.body.carouselFile, err => {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
