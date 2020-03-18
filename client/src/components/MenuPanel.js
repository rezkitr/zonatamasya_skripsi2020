import React from "react";
import { Link } from "react-router-dom";

import opentripimg from "../assets/menupanelImg/suitcase.png";
import promoimg from "../assets/menupanelImg/promo.png";
import calendarimg from "../assets/menupanelImg/calendar.png";
import galleryimg from "../assets/menupanelImg/gallery.png";

function MenuPanel() {
  return (
    <div className="container-fluid menupanel-section">
      <div className="row justify-content-center">
        <div className="col-md-7 menu-panel text-center">
          <div className="row">
            <div className="col-md">
              <Link to="/opentrip">
                <img className="img-fluid" src={opentripimg} alt="opentrip" />
                <h5 className="font-weight-bold text-muted mt-2">Open Trip</h5>
              </Link>
            </div>
            <div className="col-md">
              <Link to="/promo">
                <img className="img-fluid" src={promoimg} alt="opentrip" />
                <h5 className="font-weight-bold text-muted mt-2">Promo</h5>
              </Link>
            </div>
            <div className="col-md">
              <Link to="/kalendaropentrip">
                <img className="img-fluid" src={calendarimg} alt="opentrip" />
                <h5 className="font-weight-bold text-muted mt-2">Kalendar</h5>
              </Link>
            </div>
            <div className="col-md">
              <Link to="/galeri">
                <img className="img-fluid" src={galleryimg} alt="opentrip" />
                <h5 className="font-weight-bold text-muted mt-2">Galeri</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuPanel;
