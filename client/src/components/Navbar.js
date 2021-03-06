import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo2.png";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top grey lighten-5 navbar-light primary-color">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            <img src={logo} className="mr-3" alt="zt logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  to="/opentrip"
                  activeClassName="navActive"
                  className="nav-link"
                >
                  <i className="fas fa-suitcase mr-1"></i>Open Trip
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/promo"
                  activeClassName="navActive"
                  className="nav-link"
                >
                  <i className="fas fa-percentage mr-1"></i>Promo
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/kalendaropentrip"
                  activeClassName="navActive"
                  className="nav-link"
                >
                  <i className="far fa-calendar-alt mr-1"></i>Kalendar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/galeri"
                  activeClassName="navActive"
                  className="nav-link"
                >
                  <i className="far fa-image mr-1"></i>Galeri
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  activeClassName="navActive"
                  className="nav-link"
                >
                  <i className="fas fa-headset mr-1"></i>Kontak
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
