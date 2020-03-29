import React from "react";

import DetailTripContainer from "../components/DetailTripContainer";
import OtherTripSlide from "../components/OtherTripSlide";

function DetailTrip(props) {
  return (
    <div className="detail-page">
      <DetailTripContainer tripId={props.match.params.tripId} />
      <OtherTripSlide tripId={props.match.params.tripId} />
    </div>
  );
}
export default DetailTrip;
