import React from "react";
import OpenTripData from "../tripDataSource";

import TripCard from "./TripCard";

function FilterResult(props) {
  let resultCount = false;

  const FilteredTripItem = props.tripData.map((item) => {
    if (props.tag === item.region) {
      resultCount = true;
      return (
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
      );
    }
  });

  if (props.reset === false) {
    return (
      <div className="container-fluid trip-card">
        {resultCount ? (
          <div className="row row-cols-md-2 row-cols-lg-5 mx-3 mt-3">
            {FilteredTripItem}
          </div>
        ) : (
          <div className="row">
            <div className="col text-center ">
              <h3 className="text-danger">Belum Tersedia</h3>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="container-fluid trip-card">
        <div className="row row-cols-md-2 row-cols-lg-5 mx-3 mt-3">
          {props.tripData.map((item) => (
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
          ))}
        </div>
      </div>
    );
  }
}

export default OpenTripData(FilterResult);
