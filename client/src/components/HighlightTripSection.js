import React from "react";
import { Link } from "react-router-dom";
import DataSource from "../tripDataSource";

import TripCard from "./TripCard";
import SectionTitle from "./SectionTitle";

function TripCardContainer(props) {
  return (
    <div className="container-fluid trip-card">
      <SectionTitle
        secTitle="Open Trip"
        secTagline="Liburan nyaman, pulang bawa teman!"
      />
      <dxiv className="row row-cols-md-2 row-cols-lg-5 mx-3">
        {props.tripData.map(item =>
          item.highlighted ? (
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
      </dxiv>

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

export default DataSource(TripCardContainer);
