const router = require("express").Router();
const midtransClient = require("midtrans-client");
require("dotenv").config();

const clientKey = process.env.MIDTRANS_CLIENT_KEY;
const serverKey = process.env.MIDTRANS_SERVER_KEY;

// initialize snap client object
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: serverKey,
  clientKey: clientKey
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

  let parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: req.body.payment.amount
    },
    item_details: [
      {
        id: req.body.tripId,
        price: req.body.tripPriceFull,
        quantity: req.body.totalParticipant,
        name: req.body.tripName
      }
    ],
    customer_details: {
      first_name: first_name,
      last_name: last_name,
      email: req.body.participant.coordinator.coorEmail,
      phone: req.body.participant.coordinator.coorTelp
    }
  };

  snap
    .createTransaction(parameter)
    .then(transaction => {
      res.json(transaction);
    })
    .catch(e => {
      console.log("Error occured:", e.message);
    });
});
module.exports = router;
