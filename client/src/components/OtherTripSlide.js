import React from "react";
import helpers from "../helperFunction";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import OpenTripData from "../tripDataSource";

function OtherTripSlide(props) {
  let otherTrips = props.tripData.filter(trip => trip._id !== props.tripId);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1
    },
    medium: {
      breakpoint: { max: 1024, min: 576 },
      items: 3,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <div className="container-fluid othertrip-section">
      <p className="h4 mx-3">Open Trip Lainnya</p>
      <hr />
      <div className="row">
        <div className="col-md">
          <Carousel
            swipeable={false}
            draggable={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={false}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {otherTrips.map(item => {
              return (
                <div className="mb-3 text-center">
                  <div className="card card-cascade wider h-100 mx-3">
                    <Link to={"/opentrip/detail/" + item._id}>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/upload/opentripImg/" +
                          item.cardImage
                        }
                        style={{ height: "160px" }}
                        className="card-img-top"
                        alt={item.name}
                      />
                    </Link>
                    <div className="card-body">
                      <Link to={"/opentrip/detail/" + item._id}>
                        <h5 className="card-title font-weight-bold text-dark">
                          {item.name}
                        </h5>
                      </Link>
                      <h6 className="text-muted">
                        <i className="fas fa-plane-departure mr-2"></i>Start{" "}
                        {item.departure.start}
                      </h6>
                      <h6>Rp{helpers.priceFormat(item.price.priceFull)}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default OpenTripData(OtherTripSlide);
