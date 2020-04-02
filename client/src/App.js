import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/Home";
import OpenTripPage from "./pages/OpenTrip";
import DetailTripPage from "./pages/DetailTrip";
import ReservationPage from "./pages/Reservation";
import GalleryPage from "./pages/Gallery";
import CalendarPage from "./pages/Calendar";
import PromoPage from "./pages/Promo";
import ContactPage from "./pages/Contact";
import SearchResultPage from "./pages/SearchResult";
import NotFoundPage from "./pages/NotFound";

import PaymentFinishPage from "./pages/PaymentFinish";
import PaymentErrorPage from "./pages/PaymentError";

import AdminPage from "./adminpage/AdminHome";
import LoginPage from "./adminpage/Login";
import RsvDetailPage from "./adminpage/ReservationDetail";
import RsvEditPage from "./adminpage/ReservationEdit";
import PromoEditPage from "./adminpage/PromoEdit";
import PromoAddPage from "./adminpage/PromoAdd";
import AdminEditPage from "./adminpage/AdminEdit";
import AdminAddPage from "./adminpage/AdminAdd";
import OpenTripAddPage from "./adminpage/OpenTripAdd";
import OpenTripDetailPage from "./adminpage/OpenTripDetail";
import OpenTripEditPage from "./adminpage/OpenTripEdit";
import CarouselAddPage from "./adminpage/CarouselAdd";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          {window.location.pathname !== "/login" &&
          window.location.pathname.search("/admin") === -1 ? (
            <>
              <Navbar />
              <ScrollToTop>
                <Switch>
                  <Route path="/" exact strict component={HomePage} />
                  <Route
                    path="/opentrip"
                    exact
                    strict
                    component={OpenTripPage}
                  />
                  <Route
                    path="/opentrip/detail/:tripId"
                    exact
                    strict
                    component={DetailTripPage}
                  />
                  <Route
                    path="/reservation/:tripId"
                    exact
                    strict
                    component={ReservationPage}
                  />
                  <Route path="/galeri" exact strict component={GalleryPage} />
                  <Route
                    path="/kalendaropentrip"
                    exact
                    strict
                    component={CalendarPage}
                  />
                  <Route path="/promo" exact strict component={PromoPage} />
                  <Route
                    path="/searchtrip/:keyword"
                    exact
                    strict
                    component={SearchResultPage}
                  />
                  <Route path="/contact" exact strict component={ContactPage} />
                  <Route
                    path="/payment/finish"
                    exact
                    strict
                    component={PaymentFinishPage}
                  />
                  <Route
                    path="/payment/error"
                    exact
                    strict
                    component={PaymentErrorPage}
                  />

                  <Route component={NotFoundPage} />
                </Switch>
              </ScrollToTop>
              <Footer />
            </>
          ) : (
            <>
              <ScrollToTop>
                <Switch>
                  <Route
                    path="/admin/login"
                    exact
                    strict
                    component={LoginPage}
                  />
                  <Route
                    path="/admin"
                    exact
                    strict
                    render={() =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <AdminPage />
                      )
                    }
                  />
                  <Route
                    path="/admin/rsv/detail/:rsvId"
                    exact
                    strict
                    render={props =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <RsvDetailPage {...props} />
                      )
                    }
                  />
                  <Route
                    path="/admin/rsv/edit/:rsvId"
                    exact
                    strict
                    render={props =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <RsvEditPage {...props} />
                      )
                    }
                  />
                  <Route
                    path="/admin/promo/edit/:promoId"
                    exact
                    strict
                    render={props =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <PromoEditPage {...props} />
                      )
                    }
                  />
                  <Route
                    path="/admin/promo/add"
                    exact
                    strict
                    render={() =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <PromoAddPage />
                      )
                    }
                  />
                  <Route
                    path="/admin/admuser/edit/:adminId"
                    exact
                    strict
                    render={props =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <AdminEditPage {...props} />
                      )
                    }
                  />
                  <Route
                    path="/admin/admuser/add"
                    exact
                    strict
                    render={() =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <AdminAddPage />
                      )
                    }
                  />
                  <Route
                    path="/admin/opentrip/add"
                    exact
                    strict
                    render={() =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <OpenTripAddPage />
                      )
                    }
                  />
                  <Route
                    path="/admin/opentrip/detail/:tripId"
                    exact
                    strict
                    render={props =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <OpenTripDetailPage {...props} />
                      )
                    }
                  />
                  <Route
                    path="/admin/opentrip/edit/:tripId"
                    exact
                    strict
                    render={props =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <OpenTripEditPage {...props} />
                      )
                    }
                  />
                  <Route
                    path="/admin/carousel/add"
                    exact
                    strict
                    render={() =>
                      localStorage.getItem("isLoggedIn") === "false" ||
                      localStorage.getItem("isLoggedIn") === null ? (
                        <Redirect to="/admin/login" />
                      ) : (
                        <CarouselAddPage />
                      )
                    }
                  />
                </Switch>
              </ScrollToTop>
            </>
          )}
        </>
      </Router>
    );
  }
}
export default App;
