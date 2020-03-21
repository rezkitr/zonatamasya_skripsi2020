import React from "react";

import ReservationForm from "../components/ReservationForm";

function Reservation(props) {
  return (
    <div className="reservation-page">
      <ReservationForm tripId={props.match.params.tripId} />
    </div>
  );
}

export default Reservation;
