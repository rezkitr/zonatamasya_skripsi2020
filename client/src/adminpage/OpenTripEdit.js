import React from "react";

import OpenTripEditForm from "../admincomponent/OpenTripEditForm";

function OpenTripEdit(props) {
  return (
    <div>
      <OpenTripEditForm {...props} tripId={props.match.params.tripId} />
    </div>
  );
}

export default OpenTripEdit;
