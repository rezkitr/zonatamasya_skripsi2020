const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const ipfilter = require("express-ipfilter").IpFilter;

const reservationRouter = require("./routes/reservation");
const adminRouter = require("./routes/admin");
const promoRouter = require("./routes/promo");
const opentripRouter = require("./routes/opentrip");
const bannerRouter = require("./routes/banner");
const paymentRouter = require("./routes/payment");
const photoRouter = require("./routes/photo");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 80;
const ips = [
  "103.58.103.177",
  "103.208.23.0/24",
  "103.208.23.6/32",
  "103.127.16.0/23",
  "103.127.17.6/32",
];

app.use(cors());
app.use(express.json());
app.use(ipfilter(ips, { mode: "allow" }));

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
    console.log(error);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// route
app.use("/reservation", reservationRouter);
app.use("/adm", adminRouter);
app.use("/promo", promoRouter);
app.use("/opentrip", opentripRouter);
app.use("/banner", bannerRouter);
app.use("/payment", paymentRouter);
app.use("/photo", photoRouter);

// serve static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
