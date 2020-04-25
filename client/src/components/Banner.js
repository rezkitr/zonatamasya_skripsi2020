import React from "react";
import { Link } from "react-router-dom";

import defaultBanner from "../assets/defaultBanner.png";
import BannerData from "../bannerDataSource";
import BannerItem from "./BannerItem";

function Banner(props) {
  const bannerItem = props.bannerData.map((item, index) => {
    let splitFilename = item.fileName.split(".");
    let ext = splitFilename[1];
    return (
      <BannerItem
        key={item._id}
        type={ext}
        index={index}
        tripId={item.tripId}
        fileName={item.fileName}
      />
    );
  });

  const indicator = props.bannerData.map((item, index) => {
    return index === 0 ? (
      <li
        data-target="#myCarousel"
        data-slide-to={index}
        className="active"
      ></li>
    ) : (
      <li data-target="#myCarousel" data-slide-to={index}></li>
    );
  });

  return (
    <div>
      <div
        id="myCarousel"
        className="carousel slide carousel-fade"
        data-ride="carousel"
        data-interval="false"
      >
        <ol className="carousel-indicators">{indicator}</ol>

        <div className="carousel-inner" role="listbox">
          {props.bannerData.length > 0 ? (
            bannerItem
          ) : (
            <div className="carousel-item active">
              <div className="view">
                <img
                  className="d-block w-100"
                  src={defaultBanner}
                  alt="zonatamasya"
                />
                <div className="mask rgba-black-slight"></div>
              </div>
            </div>
          )}
        </div>

        <a
          className="carousel-control-prev"
          href="#myCarousel"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#myCarousel"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default BannerData(Banner);
