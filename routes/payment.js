const router = require("express").Router();
const midtransClient = require("midtrans-client");
require("dotenv").config();

const clientKey = process.env.MIDTRANS_CLIENT_KEY;
const serverKey = process.env.MIDTRANS_SERVER_KEY;

// initialize snap client object
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: serverKey,
  clientKey: clientKey,
});

// get snap token
router.route("/gettoken").post((req, res) => {
  let order_id = `ZT-${Date.now()}${req.body.participant.coordinator.coorTelp}`;
  let first_name = req.body.participant.coordinator.coorName
    .split(" ")
    .slice(0, -1)
    .join(" ");
  let last_name = req.body.participant.coordinator.coorName
    .split(" ")
    .slice(-1)
    .join(" ");

  let price = 0;

  if (req.body.payment.type === "LUNAS") {
    price = req.body.tripPriceFull;
  } else {
    price = req.body.tripPriceDP;
  }

  let itemName = `${req.body.tripName} / ${req.body.tripStart} / ${req.body.tripDate}`;

  let parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: req.body.payment.amount,
    },
    item_details: [
      {
        id: req.body.tripId,
        price: price,
        quantity: req.body.totalParticipant,
        name: itemName,
      },
    ],
    customer_details: {
      first_name: first_name,
      last_name: last_name,
      email: req.body.participant.coordinator.coorEmail,
      phone: req.body.participant.coordinator.coorTelp,
    },
  };

  if (req.body.promoValid && req.body.payment.type === "LUNAS") {
    parameter.item_details.push({
      id: req.body.promoData._id,
      price: -req.body.promoData.discount,
      quantity: 1,
      name: "PROMO",
    });
    parameter.promo_code = req.body.promoData.code;
  }

  snap
    .createTransaction(parameter)
    .then((transaction) => {
      res.json(transaction);
    })
    .catch((e) => {
      console.log("Error occured:", e.message);
    });
});

router.route("/getstatus/:order_id").get((req, res) => {
  snap.transaction
    .status(req.params.order_id)
    .then((result) => {
      let paymentstatus = result.transaction_status;
      res.send(paymentstatus);
    })
    .catch((error) => {
      console.log("Error occured:", error.message);
    });
});

module.exports = router;
