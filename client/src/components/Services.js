import React from "react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

function Services() {
  return (
    <div className="container-fluid">
      <SectionTitle
        secTitle="Mengapa berlibur bersama kami?"
        secTagline="Alasan anda harus memilih kami"
      />

      <div className="row mx-3 mt-5">
        <div className="col-md-6 col-xl-3 mb-4">
          <ServiceCard
            icon={"fas fa-dollar-sign"}
            title={"Harga Terbaik"}
            desc={
              "Tak perlu bimbang, lihat-lihat saja dulu. Kami memberikan penawaran harga terbaik"
            }
          />
        </div>

        <div className="col-md-6 col-xl-3 mb-4">
          <ServiceCard
            icon={"far fa-grin-beam"}
            title={"Crew Ramah"}
            desc={
              "Senyuman hangat crew kami akan selalu mengiringi perjalanan anda"
            }
          />
        </div>

        <div className="col-md-6 col-xl-3 mb-4">
          <ServiceCard
            icon={"fas fa-camera-retro"}
            title={"Dokumentasi Spesial"}
            desc={
              "Karena sebuah foto menyimpan kenangan. Crew kami selalu siap mengabadikan pose terbaik anda"
            }
          />
        </div>

        <div className="col-md-6 col-xl-3 mb-4">
          <ServiceCard
            icon={"fas fa-shuttle-van"}
            title={"Armada Nyaman"}
            desc={
              "Armada yang bersih dan prima, memastikan perjalanan anda nyaman dan menyenangkan"
            }
          />
        </div>
      </div>
    </div>
  );
}
export default Services;
