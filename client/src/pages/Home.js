import React from "react";

import Banner from "../components/Banner";
import SearchTrip from "../components/TripSearch";
import MenuPanel from "../components/MenuPanel";
import HighlightTripSection from "../components/HighlightTripSection";
import GallerySection from "../components/GallerySection";
import Services from "../components/Services";

function Home(props) {
  return (
    <div className="home-page">
      <Banner />
      <SearchTrip {...props} />
      <MenuPanel />
      <HighlightTripSection />
      <GallerySection />
      <Services />
    </div>
  );
}

export default Home;
