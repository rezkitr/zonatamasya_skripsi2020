import React from "react";

import ReservationForm from "../components/ReservationForm";

function Reservation(props) {
  return (
    <div className="reservation-page">
      <ReservationForm {...props} tripId={props.match.params.tripId} />
    </div>
  );
}

export default Reservation;
