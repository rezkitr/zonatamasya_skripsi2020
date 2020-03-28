import React from "react";

import PageBanner from "../components/PageBanner";
import MyGallery from "../components/MyGallery";

import photoImage from '../assets/photo.png'

function Gallery() {
  return (
    <div className="gallery-page">
    <PageBanner
        img={photoImage}
        title={"Galeri"}
        subtitle={
          "Tujuan utama liburan sudah pasti dong foto-foto buat ngisi feed instagram"
        }
      />
      <MyGallery />
    </div>
  );
}

export default Gallery;
