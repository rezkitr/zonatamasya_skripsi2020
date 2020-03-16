import React from 'react'
import helpers from '../helperFunction'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import DataSource from '../dataSource'

function OtherTripSlide(props) {

  let otherTrips = props.tripData.filter(trip => trip.tripID !== props.tripId)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  return (
    <div className="container-fluid othertrip-section">
      <p className="h4 mx-3" >Open Trip Lainnya</p>
      <hr />
      <div className="row">
        <div className="col-md">
          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={false}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="carousel-item-padding-40-px"
          >
            {
              otherTrips.map(item => {
                return (
                  <div className="mb-3 text-center">
                    <div className="card card-cascade wider h-100 mx-3">
                      <Link to={"/opentrip/detail/" + (item.tripID)}>
                        <img src={item.tripCardImage} style={{ height: "160px" }} className="card-img-top" alt={item.tripName} />
                      </Link>
                      <div className="card-body">
                        <Link to={"/opentrip/detail/"+(item.tripID)}>
                          <h5 className="card-title font-weight-bold text-dark">{item.tripName}</h5>
                        </Link>
                        <h6 className="text-muted" ><i className="fas fa-plane-departure mr-2"></i>Start {item.tripDeparture.start}</h6>
                        <h6>Rp{helpers.priceFormat(item.tripPrice)}</h6>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default DataSource(OtherTripSlide)
