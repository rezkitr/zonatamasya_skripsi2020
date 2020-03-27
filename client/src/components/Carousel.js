import React from "react";
import { Link } from "react-router-dom";

import CarouselData from "../carouselSource";

function Carousel(props) {
  const carouselItem = props.carouselData.map((item, index) => {
    let splitFilename = item.carouselFile.split(".");
    let ext = splitFilename[1];

    if (ext === "jpeg" || ext === "png") {
      return (
        <div
          key={item._id}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
          <div className="view">
            <Link to={`/opentrip/detail/${item.tripId}`}>
              <img
                className="d-block w-100"
                src={
                  process.env.PUBLIC_URL +
                  "/upload/carouselFiles/" +
                  item.carouselFile
                }
                alt={item.carouselFile}
              />
              <div className="mask rgba-black-slight"></div>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={item._id}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
          <Link to={`/opentrip/detail/${item.tripId}`}>
            <video className="video-fluid d-block w-100" autoPlay loop muted>
              <source
                src={
                  process.env.PUBLIC_URL +
                  "/upload/carouselFiles/" +
                  item.carouselFile
                }
                type="video/mp4"
              />
            </video>
          </Link>
        </div>
      );
    }
  });

  const indicator = props.carouselData.map((item, index) => {
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
          {carouselItem}
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

export default CarouselData(Carousel);
