import React, { Component } from "react";
import OpenTripData from "../tripDataSource";

import TripCard from "./TripCard";

class SearchResultContainer extends Component {
  render() {
    let resultCount = false;
    const TripItem = this.props.tripData.map((item) => {
      if (item.name.toLowerCase().includes(this.props.keyword.toLowerCase())) {
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
      } else {
        return item.keyword.map((kwd) => {
          if (kwd.toLowerCase().includes(this.props.keyword.toLowerCase())) {
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
      }
    });

    return (
      <div className="container-fluid" style={{ marginTop: "120px" }}>
        <div className="row mx-3">
          <div className="col">
            <p className="h5">
              Hasil pencarian :{" "}
              <span className="badge badge-info">{this.props.keyword}</span>{" "}
            </p>
          </div>
        </div>
        <hr />

        {resultCount ? (
          <div className="row row-cols-md-2 row-cols-lg-5 mx-3 mt-4">
            {TripItem}
          </div>
        ) : (
          <div className="row">
            <div className="col text-center ">
              <h3 className="text-danger">Tidak dapat menemukan Open Trip</h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default OpenTripData(SearchResultContainer);
