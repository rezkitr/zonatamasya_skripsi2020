import React from 'react'
import helpers from './helperFunction'
import { Link } from 'react-router-dom'

function TripCard(props) {
  return (
    <div className="card card-cascade wider h-100">
      <Link to={"/opentrip/detail/" + (props.tripId)}>
        <img src={props.cardImg} className="card-img-top" alt={props.name} />
      </Link>
      <div className="card-body text-center">
        <Link to={"/opentrip/detail/" + (props.tripId)}>
          <h5 className="card-title font-weight-bold text-dark">{props.name}</h5>
        </Link>
        <h6 className="text-muted" ><i className="fas fa-plane-departure mr-2"></i>Start {props.start}</h6>
        <h6>Rp{helpers.priceFormat(props.price)}</h6>
      </div>
    </div>
  )
}

export default TripCard
