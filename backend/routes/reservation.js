const router = require("express").Router();
let Reservation = require("../models/reservation.model");

// getAll
router.route("/").get((req, res) => {
  Reservation.find()
    .sort({ tripName: "asc", tripDate: "asc" })
    .then(rsv => res.json(rsv))
    .catch(err => res.status(400).json("Error : " + err));
});

// findRsv
router.route("/:rsvId").get((req, res) => {
  Reservation.find({ _id: req.params.rsvId })
    .then(rsv => res.json(rsv))
    .catch(err => res.status(400).json("Error : " + err));
});

// AddRsv
router.route("/add").post((req, res) => {
  const tripName = req.body.tripName;
  const tripStart = req.body.tripStart;
  const mepo = req.body.mepo;
  const reservationDate = req.body.reservationDate;
  const tripDate = req.body.tripDate;
  const totalParticipant = req.body.totalParticipant;
  const participant = req.body.participant;
  const payment = req.body.payment;
  const promoCode = req.body.promoCode;

  const newReservation = new Reservation({
    tripName,
    tripStart,
    mepo,
    reservationDate,
    tripDate,
    totalParticipant,
    participant,
    payment,
    promoCode
  });

  newReservation
    .save()
    .then(() => res.json("New reservation added"))
    .catch(err => res.status(400).json("Error : " + err));
});

// DeleteRsv
router.route("/:id").delete((req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(() => res.json("Reservation deleted"))
    .catch(err => res.status(400).json("Error : " + err));
});

// UpdateRsv
router.route("/update/:id").post((req, res) => {
  Reservation.findById(req.params.id)
    .then(rsv => {
      rsv.tripName = req.body.tripName;
      rsv.tripStart = req.body.tripStart;
      rsv.mepo = req.body.mepo;
      rsv.reservationDate = req.body.reservationDate;
      rsv.tripDate = req.body.tripDate;
      rsv.totalParticipant = req.body.totalParticipant;
      rsv.participant = req.body.participant;
      rsv.payment = req.body.payment;
      rsv.promoCode = req.body.promoCode;

      rsv
        .save()
        .then(() => res.json("Reservation updated"))
        .catch(err => res.status(400).json("Error : " + err));
    })
    .catch(err => res.status(400).json("Error : " + err));
});

module.exports = router;
