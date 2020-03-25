import React from "react";
import { Link } from "react-router-dom";

import CarouselImageData from "../carouselImageSource";

function Carousel(props) {
  const carouselItem = props.carouselImages.map((item, index) =>
    index === 0 ? (
      <div key={item._id} className="carousel-item active">
        <div className="view">
          <Link to={`/opentrip/detail/${item.tripId}`}>
            <img
              className="d-block w-100"
              src={
                process.env.PUBLIC_URL +
                "/upload/carouselImg/" +
                item.carouselImage
              }
              alt={item.carouselImage}
            />
            <div className="mask rgba-black-slight"></div>
          </Link>
        </div>
      </div>
    ) : (
      <div key={item._id} className="carousel-item">
        <div className="view">
          <Link to={`/opentrip/detail/${item.tripId}`}>
            <img
              className="d-block w-100"
              src={
                process.env.PUBLIC_URL +
                "/upload/carouselImg/" +
                item.carouselImage
              }
              alt={item.carouselImage}
            />
            <div className="mask rgba-black-slight"></div>
          </Link>
        </div>
      </div>
    )
  );

  return (
    <div>
      <div
        id="myCarousel"
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
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

export default CarouselImageData(Carousel);
