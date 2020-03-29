import React from "react";

import travelImg from "../assets/travel.png";

function TripBanner2(props) {
  return (
    <div className="container-fluid trip-banner">
      <div className="row">
        <div className="col-md-8 p-0 m-0" style={{ height: "520px" }}>
          <img
            className="img-fluid w-100 h-100 trip-banner-img"
            src={
              process.env.PUBLIC_URL +
              "/upload/opentripImg/" +
              props.bannerImage
            }
            alt={props.bannerImage}
          />
        </div>
        <div className="col-md mt-auto pb-3 trip-banner-tripinfo">
          <img
            src={travelImg}
            alt="travel"
            className="img-fluid mb-4 trip-banner-img-2"
            width="200px"
          />
          <h1 className="trip-banner-title mb-3">{props.name}</h1>
          <p className="trip-banner-subtitle">
            <i className="fas fa-plane-departure mr-2"></i>
            {props.start}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TripBanner2;
