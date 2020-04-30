import React from "react";
import { Link } from "react-router-dom";
import OpenTripData from "../tripDataSource";

import TripCard from "./TripCard";
import SectionTitle from "./SectionTitle";

function TripCardContainer(props) {
  return (
    <div className="container-fluid trip-card">
      <SectionTitle
        secTitle="Open Trip"
        secTagline="Liburan nyaman, pulang bawa teman!"
      />
      <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 mx-3">
        {props.tripData.map((item, index) =>
          item.highlighted && index < 5 ? (
            <div className="col my-3">
              <TripCard
                key={item._id}
                tripId={item._id}
                cardImg={item.cardImage}
                name={item.name}
                price={item.price.priceFull}
                start={item.departure.start}
              />
            </div>
          ) : null
        )}
      </div>

      <div className="row justify-content-center mt-5">
        <Link to="/opentrip">
          <button className="btn btn-light-green font-weight-bold">
            LAINNYA
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OpenTripData(TripCardContainer);
