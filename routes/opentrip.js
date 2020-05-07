const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
let OpenTrip = require("../models/opentrip.model");

// getAll
router.route("/").get((req, res) => {
  OpenTrip.find()
    .sort({ name: "asc" })
    .then((ot) => res.json(ot))
    .catch((err) => res.status(400).json("Error : " + err));
});

// getTripbyId
router.route("/:id").get((req, res) => {
  OpenTrip.findById(req.params.id)
    .then((ot) => res.json(ot))
    .catch((err) => res.status(400).json("Error : " + err));
});

// addOpenTrip

const uploadDir = path.join(
  __dirname + "./../client/public/upload/opentripImg/"
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, "zt-" + Date.now() + "-" + file.originalname.replace(/ /g, "_"));
  },
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
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
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
        bannerImage,
      });

      newOpenTrip
        .save()
        .then(() => res.json("New open trip added"))
        .catch((err) => res.status(400).json("Error" + err));
    }
  );

// update
router.route("/update/:id").post((req, res) => {
  OpenTrip.findById(req.params.id)
    .then((ot) => {
      ot.name = req.body.name;
      ot.keyword = req.body.keyword;
      ot.region = req.body.region;
      ot.highlighted = req.body.highlighted;
      ot.duration = req.body.duration;
      ot.departure = req.body.departure;
      ot.price = req.body.price;
      ot.schedule = req.body.schedule;
      ot.itinerary = req.body.itinerary;
      ot.facility = req.body.facility;

      ot.save()
        .then(() => res.json("Open trip updated"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// updateAllImage
router
  .route("/updateimg/:id")
  .post(
    upload.fields([{ name: "cardImage" }, { name: "bannerImage" }]),
    (req, res) => {
      OpenTrip.findById(req.params.id)
        .then((ot) => {
          ot.cardImage = req.files.cardImage[0].filename;
          ot.bannerImage = req.files.bannerImage[0].filename;

          ot.save()
            .then(() => res.json("Open trip image updated"))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      fs.unlink(uploadDir + req.body.oldCardImage, (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Old card image deleted");
      });
      fs.unlink(uploadDir + req.body.oldBannerImage, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  );

// updatecardImage
router
  .route("/updatecardimg/:id")
  .post(upload.single("cardImage"), (req, res) => {
    OpenTrip.findById(req.params.id)
      .then((ot) => {
        ot.cardImage = req.file.filename;

        ot.save()
          .then(() => res.json("Open trip card image updated"))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    fs.unlink(uploadDir + req.body.oldCardImage, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

// updatebannerImage
router
  .route("/updatebannerimg/:id")
  .post(upload.single("bannerImage"), (req, res) => {
    OpenTrip.findById(req.params.id)
      .then((ot) => {
        ot.bannerImage = req.file.filename;

        ot.save()
          .then(() => res.json("Open trip banner image updated"))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    fs.unlink(uploadDir + req.body.oldBannerImage, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

// delete
router.route("/delete").post((req, res) => {
  OpenTrip.findByIdAndDelete(req.body.tripId)
    .then(() => res.json("Trip deleted"))
    .catch((err) => res.status(400).json("Error : " + err));

  fs.unlink(uploadDir + req.body.cardImage, (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.unlink(uploadDir + req.body.bannerImage, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
