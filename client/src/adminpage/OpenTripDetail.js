import React from "react";

import OpenTripDetailCard from "../admincomponent/OpenTripDetailCard";

function OpenTripDetail(props) {
  return (
    <div className="otdetail-page">
      <OpenTripDetailCard tripId={props.match.params.tripId} />
    </div>
  );
}

export default OpenTripDetail;
