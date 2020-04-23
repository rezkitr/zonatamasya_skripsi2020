import React from "react";
import Gallery from "react-grid-gallery";
import PhotoDataSource from "../photoDataSource";

function MyGallery(props) {
  return (
    <div className="container-fluid">
      <div className="row gallery-row">
        <div className="col-md">
          <Gallery
            images={props.photoData}
            rowHeight={240}
            margin={3}
            backdropClosesModal={true}
          />
        </div>
      </div>
    </div>
  );
}

export default PhotoDataSource(MyGallery);
