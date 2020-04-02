import React from "react";

import RsvEditForm from "../admincomponent/ReservationEditForm";

function ReservationEdit(props) {
  return (
    <div>
      <RsvEditForm {...props} rsvId={props.match.params.rsvId} />
    </div>
  );
}

export default ReservationEdit;
