import React from "react";

import opentripImage from "../assets/trip.png";

import PageBanner from "../components/PageBanner";
import FilterTripSection from "../components/FilterTripSection";

function OpenTrip() {
  return (
    <div className="opentrip-page">
      <PageBanner
        img={opentripImage}
        title={"Open Trip"}
        subtitle={
          "Silahkan dipilih open trip nya. Jangan lupa ajak keluarga, sahabat, atau kekasih (kalau ada) ya!"
        }
      />
      <FilterTripSection />
    </div>
  );
}

export default OpenTrip;
