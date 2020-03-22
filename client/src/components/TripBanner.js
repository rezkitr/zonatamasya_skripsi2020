import React from "react";

import DataSource from "../tripDataSource";

function TripBanner(props) {
  let bannerImage = "";
  let tripName = "";

  props.tripData.map(item => {
    if (item._id === props.tripId) {
      bannerImage = item.bannerImage;
      tripName = item.name;
    }
    return bannerImage, tripName;
  });

  return (
    <div>
      <div
        className="hero"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL +
            "/upload/opentripImg/" +
            bannerImage})`
        }}
      >
        <div className="hero-title text-center">{tripName}</div>
        <div className="overlay"></div>
      </div>
    </div>
  );
}

export default DataSource(TripBanner);
