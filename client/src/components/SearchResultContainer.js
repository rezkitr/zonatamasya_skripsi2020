import React from "react";
import OpenTripData from "../tripDataSource";

import TripCard from "./TripCard";

function SearchResultContainer(props) {
  return (
    <div className="container-fluid" style={{ marginTop: "120px" }}>
      <div className="row mx-3">
        <div className="col-md">
          <p className="h5">
            Hasil pencarian :{" "}
            <span className="badge badge-info">{props.keyword}</span>{" "}
          </p>
        </div>
      </div>
      <hr />
      <div className="row row-cols-md-2 row-cols-lg-5 mx-3 mt-4">
        {props.tripData.map(item =>
          item.keyword.map(kwd =>
            kwd.includes(props.keyword) ? (
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
          )
        )}
      </div>
    </div>
  );
}

export default OpenTripData(SearchResultContainer);
