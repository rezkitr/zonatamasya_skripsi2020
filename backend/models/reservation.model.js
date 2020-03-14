const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  tripName: {
    type: String,
    required: true
  },
  tripStart: {
    type: String,
    required: true
  },
  mepo: {
    type: String,
    required: true
  },
  reservationDate : {
    type : String,
    required : true
  },
  tripDate: {
    type: String,
    required: true
  },
  totalParticipant: {
    type: Number,
    required: true,
    min: 1
  },
  participant: {
    coordinator: {
      coorName: {
        type: String,
        required: true
      },
      coorGender: {
        type: String,
        required: true
      },
      coorTelp: {
        type: String,
        required: true
      },
      coorEmail: {
        type: String,
        required: true
      }
    },
    member: [{
      memberName: {
        type: String,
        required: true
      },
      memberGender: {
        type: String,
        required: true
      },
      memberTelp: {
        type: String,
        required: true
      }
    }]
  },
  payment: {
    type: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }
},
  {
    timestamps: true
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;