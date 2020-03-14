import React from 'react'
import DataSource from '../dataSource'

import TripCard from './TripCard'

function FilterResult(props) {
  if (props.reset === false) {
    return (
      <div className="container-fluid trip-card" >
        <div className="row row-cols-md-2 row-cols-lg-5 mx-3 mt-3">
          {
            props.tripData.map((item) => {
              if (props.tag === item.filterTag) {
                return (
                  <div className="col my-3">
                    <TripCard key={item.tripID} tripId={item.tripID} cardImg={item.tripCardImage} name={item.tripName} price={item.tripPrice} start={item.tripDeparture.start} />
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="container-fluid trip-card" >
        <div className="row row-cols-md-2 row-cols-lg-5 mx-3 mt-3">
          {
            props.tripData.map((item) => (
              <div className="col my-3">
                <TripCard key={item.tripID} tripId={item.tripID} cardImg={item.tripCardImage} name={item.tripName} price={item.tripPrice} start={item.tripDeparture.start} />
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default DataSource(FilterResult)
