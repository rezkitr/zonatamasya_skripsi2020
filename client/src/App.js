import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import store from "store";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/Home";
import OpenTripPage from "./pages/OpenTrip";
import DetailTripPage from "./pages/DetailTrip";
import ReservationPage from "./pages/Reservation";
import GalleryPage from "./pages/Gallery";
import CalendarPage from "./pages/Calendar";
import ContactPage from "./pages/Contact";

import AdminPage from "./adminpage/AdminHome";
import LoginAdminPage from "./adminpage/LoginAdmin";
import RsvDetailPage from "./adminpage/ReservationDetail";
import RsvEditPage from "./adminpage/ReservationEdit";
import PromoEditPage from "./adminpage/PromoEdit";
import PromoAddPage from "./adminpage/PromoAdd";
import AdminEditPage from "./adminpage/AdminEdit";
import AdminAddPage from "./adminpage/AdminAdd";
import OpenTripAddPage from "./adminpage/OpenTripAdd";
import OpenTripDetailPage from "./adminpage/OpenTripDetail";

class App extends Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    // change to false later
    store.set("loggedIn", true);
  }

  handleAuth = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  render() {
    let loggedIn = store.get("loggedIn");
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
                  <Route path="/contact" exact strict component={ContactPage} />
                </Switch>
              </ScrollToTop>
              <Footer />
            </>
          ) : (
            <>
              <Switch>
                <Route
                  path="/login"
                  exact
                  strict
                  render={props => (
                    <LoginAdminPage {...props} handleAuth={this.handleAuth} />
                  )}
                />
                <Route
                  path="/admin"
                  exact
                  strict
                  render={props =>
                    loggedIn ? (
                      <AdminPage {...props} />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
                <Route
                  path="/admin/rsv/detail/:rsvId"
                  exact
                  strict
                  component={RsvDetailPage}
                />
                <Route
                  path="/admin/rsv/edit/:rsvId"
                  exact
                  strict
                  render={props => <RsvEditPage {...props} />}
                />
                <Route
                  path="/admin/promo/edit/:promoId"
                  exact
                  strict
                  render={props => <PromoEditPage {...props} />}
                />
                <Route
                  path="/admin/promo/add"
                  exact
                  strict
                  render={props => <PromoAddPage {...props} />}
                />
                <Route
                  path="/admin/admuser/edit/:adminId"
                  exact
                  strict
                  render={props => <AdminEditPage {...props} />}
                />
                <Route
                  path="/admin/admuser/add"
                  exact
                  strict
                  render={props => <AdminAddPage {...props} />}
                />
                <Route
                  path="/admin/opentrip/add"
                  exact
                  strict
                  render={props => <OpenTripAddPage {...props} />}
                />
                <Route
                  path="/admin/opentrip/detail/:tripId"
                  exact
                  strict
                  component={OpenTripDetailPage}
                />
              </Switch>
            </>
          )}
        </>
      </Router>
    );
  }
}
export default App;
