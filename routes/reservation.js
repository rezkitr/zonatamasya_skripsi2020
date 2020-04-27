const router = require("express").Router();
let Reservation = require("../models/reservation.model");

// getAll
router.route("/").get((req, res) => {
  Reservation.find()
    .sort({ tripDate: "asc", tripName: "asc" })
    .then((rsv) => res.json(rsv))
    .catch((err) => res.status(400).json("Error : " + err));
});

// findRsvbyId
router.route("/:id").get((req, res) => {
  Reservation.findById(req.params.id)
    .then((rsv) => res.json(rsv))
    .catch((err) => res.status(400).json("Error : " + err));
});

// AddRsv
router.route("/add").post((req, res) => {
  const orderId = req.body.orderId;
  const tripId = req.body.tripId;
  const tripName = req.body.tripName;
  const tripStart = req.body.tripStart;
  const mepo = req.body.mepo;
  const reservationDate = req.body.reservationDate;
  const tripDate = req.body.tripDate;
  const totalParticipant = req.body.totalParticipant;
  const participant = req.body.participant;
  const payment = req.body.payment;
  const promoCode = "";

  if (req.body.promoValid) {
    promoCode = req.body.promoData.code;
  }

  const newReservation = new Reservation({
    orderId,
    tripId,
    tripName,
    tripStart,
    mepo,
    reservationDate,
    tripDate,
    totalParticipant,
    participant,
    payment,
    promoCode,
  });

  newReservation
    .save()
    .then(() => res.json("New reservation added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

// DeleteRsv
router.route("/:id").delete((req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(() => res.json("Reservation deleted"))
    .catch((err) => res.status(400).json("Error : " + err));
});

// UpdateRsv
router.route("/update/:id").post((req, res) => {
  Reservation.findById(req.params.id)
    .then((rsv) => {
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
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
