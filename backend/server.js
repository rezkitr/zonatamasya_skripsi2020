const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use('/uploads', express.static('uploads'));

const reservationRouter = require('./routes/reservation');
const adminRouter = require('./routes/admin');
const promoRouter = require('./routes/promo');
const imageRouter = require('./routes/images');

app.use('/reservation', reservationRouter);
app.use('/admin', adminRouter);
app.use('/promo', promoRouter);
app.use('/image', imageRouter);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});