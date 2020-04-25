const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
let Banner = require("../models/banner.model");

// getAll
router.route("/").get((req, res) => {
  Banner.find()
    .then((bnr) => res.json(bnr))
    .catch((err) => res.status(400).json("Error : " + err));
});

// addBanner
const uploadDir = path.join(
  __dirname + "./../client/public/upload/bannerFiles/"
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, "bnr-" + Date.now() + "-" + file.originalname.replace(/ /g, "_"));
  },
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
    fileSize: 1024 * 1024 * 512,
  },
  fileFilter: fileFilter,
});

router.route("/add").post(upload.single("bannerFile"), (req, res) => {
  const tripId = req.body.tripId;
  const fileName = req.file.filename;

  const newBanner = new Banner({
    tripId,
    fileName,
  });

  newBanner
    .save()
    .then(() => res.json("New banner added"))
    .catch((err) => res.status(400).json("Error" + err));
});

// deleteCarousel
router.route("/delete").post((req, res) => {
  Banner.findByIdAndDelete(req.body.bnrId)
    .then(() => res.json("Banner deleted"))
    .catch((err) => res.status(400).json("Error : " + err));

  fs.unlink(uploadDir + req.body.fileName, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
