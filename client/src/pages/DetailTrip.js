import React from "react";

import DetailTripContainer from '../components/DetailTripContainer'

function DetailTrip(props) {
  return (
    <div className="detail-page">
      <DetailTripContainer tripId={props.match.params.tripId} />
    </div>
  );
}
export default DetailTrip;
