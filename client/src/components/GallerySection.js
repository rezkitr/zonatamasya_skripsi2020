import React from "react";
import { Link } from "react-router-dom";
import Gallery from "react-grid-gallery";
import PhotoDataSource from "../photoDataSource";
import bgImage from "../assets/bg-gallery.jpg";

function GallerySection(props) {
  let photoData = [];

  props.photoData.map((item, index) => {
    if (index < 6) {
      item.thumbnailWidth = Math.floor(Math.random() * 320) + 240;
      item.thumbnailHeight = Math.floor(Math.random() * 300) + 220;
      photoData.push(item);
    }
  });

  return (
    <div
      className="container-fluid gal-section"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPositionY: "-180px",
      }}
    >
      <div className="row p-0">
        <div className="col-md-8 p-5">
          <Gallery
            enableLightbox={false}
            images={photoData}
            enableImageSelection={false}
            rowHeight={240}
            maxRows={2}
            margin={2}
            backdropClosesModal={true}
          />
        </div>
        <div className="col-md text-center my-auto p-5">
          <i className="fas fa-quote-right fa-3x"></i>
          <p className="mt-4 mb-0" style={{ fontSize: "28px" }}>
            A good snapshot keeps a moment from running away.
          </p>
          <small className="mt-0">- E. Welty</small>
          <br />
          <Link to="/galeri">
            <button className="btn btn-sm btn-outline-dark mt-4">
              LAINNYA
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PhotoDataSource(GallerySection);
