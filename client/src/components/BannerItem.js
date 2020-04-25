import React from "react";
import { Link } from "react-router-dom";

function BannerItem(props) {
  if (props.type === "jpeg" || props.type === "png") {
    return (
      <div className={`carousel-item ${props.index === 0 ? "active" : ""}`}>
        <div className="view">
          <Link
            to={`${
              props.tripId !== "nontrip"
                ? `/opentrip/detail/${props.tripId}`
                : "/"
            }`}
          >
            <img
              className="d-block w-100"
              src={
                process.env.PUBLIC_URL + "/upload/bannerFiles/" + props.fileName
              }
              alt={props.fileName}
            />
            <div className="mask rgba-black-slight"></div>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`carousel-item ${props.index === 0 ? "active" : ""}`}>
        <Link
          to={`${
            props.tripId !== "nontrip"
              ? `/opentrip/detail/${props.tripId}`
              : "/"
          }`}
        >
          <video className="video-fluid d-block w-100" autoPlay loop muted>
            <source
              src={
                process.env.PUBLIC_URL + "/upload/bannerFiles/" + props.fileName
              }
              type="video/mp4"
            />
          </video>
        </Link>
      </div>
    );
  }
}

export default BannerItem;
