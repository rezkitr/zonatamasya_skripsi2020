import React from 'react'

import RsvDetailCard from '../admincomponent/ReservationDetailCard'

function ReservationDetail(props) {
  return (
    <div className="revdetail-page" >
      <RsvDetailCard rsvId={props.match.params.rsvId} />
    </div>
  )
}

export default ReservationDetail
