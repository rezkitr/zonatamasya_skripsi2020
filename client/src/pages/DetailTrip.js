import React from 'react'

import TripBanner from '../components/TripBanner'
import TabMenu from '../components/TabMenu'

function DetailTrip(props) {

  return (
    <div className="detail-page">
      <TripBanner tripId={props.match.params.tripId}  />
      <TabMenu tripId={props.match.params.tripId} />
    </div>
  )
}
export default DetailTrip
