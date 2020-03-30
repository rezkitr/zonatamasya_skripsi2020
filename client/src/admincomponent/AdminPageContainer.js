import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";

import logo from "../assets/logo2.png";

import RsvList from "./ReservationList";
import PromoList from "./PromoList";
import UserAdminList from "./UserAdminList";
import OpenTripList from "./OpenTripList";
import CarouselList from "./CarouselList";

class AdminContainer extends Component {
  state = {
    showSidebar: true,
    menuSelected: "rsv"
  };

  componentDidMount() {
    if (localStorage.getItem("isLoggedIn") === "false") {
      this.props.history.push("/admin/login");
    }
  }

  toggleSideBar = () => {
    this.setState(prevState => {
      return {
        showSidebar: !prevState.showSidebar
      };
    });
  };

  handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setTimeout(() => {
      this.props.history.push("/admin/login");
    }, 1000);
  };

  render() {
    return (
      <div id="admin-container">
        <div
          className={`d-flex ${this.state.showSidebar ? "" : "toggled"}`}
          id="wrapper"
        >
          <div className="primary-color-dark" id="sidebar-wrapper">
            <div className="sidebar-heading text-center pt-4">
              <img src={logo} alt="ztlogo" width="120" />
            </div>
            <div className="list-group list-group-flush mt-3">
              <a
                onClick={() => this.setState({ menuSelected: "rsv" })}
                className="list-group-item list-group-item-action primary-color-dark text-white"
              >
                <i className="far fa-file-alt fa-lg mr-3 text-white"></i>
                Reservation
              </a>
              <a
                onClick={() => this.setState({ menuSelected: "ot" })}
                className="list-group-item list-group-item-action primary-color-dark text-white"
              >
                <i className="fas fa-suitcase-rolling fa-lg mr-3 text-white"></i>
                Open Trip
              </a>
              <a
                onClick={() => this.setState({ menuSelected: "prm" })}
                className="list-group-item list-group-item-action primary-color-dark text-white"
              >
                <i className="fas fa-tag fa-lg mr-3 text-white"></i>Promo
              </a>
              <a
                onClick={() => this.setState({ menuSelected: "crs" })}
                className="list-group-item list-group-item-action primary-color-dark text-white"
              >
                <i className="far fa-object-ungroup  fa-lg mr-3 text-white"></i>
                Carousel
              </a>
              <a
                onClick={() => this.setState({ menuSelected: "adm" })}
                className="list-group-item list-group-item-action primary-color-dark text-white"
              >
                <i className="fas fa-user-secret  fa-lg mr-3 text-white"></i>
                Admin
              </a>
            </div>
          </div>

          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-dark primary-color-dark">
              <a
                id="menu-toggle"
                className={
                  this.state.showSidebar ? "rotate-90-cw" : "rotate-90-ccw"
                }
                onClick={this.toggleSideBar}
              >
                <i className="fas fa-bars fa-lg text-white"></i>
              </a>

              <Link className="navbar-brand ml-3">
                {this.state.menuSelected === "rsv"
                  ? "Reservation"
                  : this.state.menuSelected === "prm"
                  ? "Promo"
                  : this.state.menuSelected === "ot"
                  ? "Open Trip"
                  : this.state.menuSelected === "crs"
                  ? "Carousel"
                  : "Admin"}
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user"></i>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item" onClick={this.handleLogout}>
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-md">
                  {this.state.menuSelected === "rsv" ? (
                    <RsvList />
                  ) : this.state.menuSelected === "prm" ? (
                    <PromoList />
                  ) : this.state.menuSelected === "ot" ? (
                    <OpenTripList />
                  ) : this.state.menuSelected === "crs" ? (
                    <CarouselList />
                  ) : (
                    <UserAdminList />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminContainer;
