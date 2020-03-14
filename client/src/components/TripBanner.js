import React from 'react'

import DataSource from '../dataSource'

function TripBanner(props) {

  let tripBannerImg = ''
  let tripName = ''

  props.tripData.map(item => {
    if (item.tripID === props.tripId) {
      tripBannerImg = item.tripBannerImage
      tripName = item.tripName
    }
    return (
      tripBannerImg,
      tripName
    )
  })

  return (
    <div>
      <div className="hero" style={{ backgroundImage: `url(${tripBannerImg})` }} >
        <div className="hero-title text-center">{tripName}</div>
        <div className="overlay"></div>
      </div>
    </div>

  )
}

export default DataSource(TripBanner)
