import React from "react";

import Carousel from "../components/Carousel";
import SearchTrip from "../components/TripSearch";
import MenuPanel from "../components/MenuPanel";
import HighlightTripSection from "../components/HighlightTripSection";
import GallerySection from "../components/GallerySection";
import Services from "../components/Services";

function Home(props) {
  return (
    <div className="home-page">
      <Carousel />
      <SearchTrip {...props} />
      {/* <MenuPanel /> */}
      <HighlightTripSection />
      <GallerySection />
      <Services />
    </div>
  );
}

export default Home;
