import React from "react";
import DataSource from "../tripDataSource";

import TripCard from "./TripCard";

function FilterResult(props) {
  if (props.reset === false) {
    return (
      <div className="container-fluid trip-card">
        <div className="row row-cols-md-2 row-cols-lg-5 mx-3 mt-3">
          {props.tripData.map(item => {
            if (props.tag === item.region) {
              return (
                <div className="col my-3">
                  <TripCard
                    key={item._id}
                    tripId={item._id}
                    cardImg={item.cardImage}
                    name={item.tripName}
                    price={item.price.priceFull}
                    start={item.tripDeparture.start}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid trip-card">
        <div className="row row-cols-md-2 row-cols-lg-5 mx-3 mt-3">
          {props.tripData.map(item => (
            <div className="col my-3">
              <TripCard
                key={item._id}
                tripId={item._id}
                cardImg={item.cardImage}
                name={item.tripName}
                price={item.price.priceFull}
                start={item.tripDeparture.start}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DataSource(FilterResult);
