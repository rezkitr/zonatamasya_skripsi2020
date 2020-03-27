import React, { Component } from "react";
import { Link } from "react-router-dom";
import helpers from "../helperFunction";
import axios from "axios";

class OpenTripDetailCard extends Component {
  state = {
    ot: null
  };

  componentDidMount() {
    axios
      .get(`/opentrip/${this.props.tripId}`)
      .then(res => {
        this.setState({ ot: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      this.state.ot && (
        <div className="container my-5">
          <div className="row justify-content-center mb-5">
            <div className="col-md-10">
              <Link to="/admin">
                <p className="h5 text-dark">
                  <i className="fas fa-angle-left mr-2"></i>KEMBALI
                </p>
              </Link>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card mt-3">
                <div className="px-3">
                  <i className="fas fa-info fa-lg blue z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                </div>
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Nama</p>
                      <h4 className="purple-text">{this.state.ot.name}</h4>
                    </div>
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Wilayah</p>
                      <h4 className="purple-text">{this.state.ot.region}</h4>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Highlight</p>
                      {this.state.ot.highlighted ? (
                        <h4 className="purple-text pt-1">
                          <i className="far fa-check-circle"></i>
                        </h4>
                      ) : (
                        <h4 className="purple-text pt-1">
                          <i className="far fa-times-circle"></i>
                        </h4>
                      )}
                    </div>
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Keyword</p>
                      {this.state.ot.keyword.map(item => {
                        return (
                          <span
                            className="badge badge-secondary mr-2 mb-2 p-1"
                            style={{ fontSize: "14px" }}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-md-10">
              <div className="card mt-3">
                <div className="px-3">
                  <i className="fas fa-map-pin fa-lg green lighten-2 z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                </div>
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Start</p>
                      <h4 className="purple-text">
                        {this.state.ot.departure.start}
                      </h4>
                    </div>
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Meeting Point</p>
                      {this.state.ot.departure.mepo.map(item => {
                        return (
                          <span
                            className="badge badge-secondary mr-2 mb-2 p-1"
                            style={{ fontSize: "14px" }}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-md-10">
              <div className="card mt-3">
                <div className="px-3">
                  <i className="fas fa-dollar-sign fa-lg orange lighten-1 z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                </div>
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-md">
                      <p className="h6 font-weight-bold">DP</p>
                      <h4 className="purple-text">
                        {helpers.priceFormat(this.state.ot.price.priceDP)}
                      </h4>
                    </div>
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Lunas</p>
                      <h4 className="purple-text">
                        {helpers.priceFormat(this.state.ot.price.priceFull)}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-md-10">
              <div className="card mt-3">
                <div className="px-3">
                  <i className="far fa-calendar-alt fa-lg grey lighten-1 z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                </div>
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-md">
                      {this.state.ot.schedule.map(schedItem => {
                        let pass = false;
                        let now = new Date();
                        let dateTemp = new Date(schedItem);

                        if (dateTemp < now) {
                          pass = true;
                        }

                        switch (schedItem.substr(5, 2)) {
                          case "01":
                            return (
                              <span
                                className="badge blue accent-4 mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "02":
                            return (
                              <span
                                className="badge deep-purple mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "03":
                            return (
                              <span
                                className="badge purple lighten-2 mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "04":
                            return (
                              <span
                                className="badge pink mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "05":
                            return (
                              <span
                                className="badge red darken-2 mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "06":
                            return (
                              <span
                                className="badge orange darken-3 mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "07":
                            return (
                              <span
                                className="badge amber mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "08":
                            return (
                              <span
                                className="badge lime accent-2 mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "09":
                            return (
                              <span
                                className="badge green darken-3 mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "10":
                            return (
                              <span
                                className="badge teal lighten-3 mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "11":
                            return (
                              <span
                                className="badge indigo accent-4 mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;
                          case "12":
                            return (
                              <span
                                className="badge indigo lighten-3 mr-2 my-2 p-2"
                                style={{
                                  fontSize: "14px",
                                  textDecoration: `${
                                    pass ? "line-through" : ""
                                  }`
                                }}
                              >
                                {helpers.formatDate(schedItem)}
                              </span>
                            );
                            break;

                          default:
                            break;
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-md-10">
              <div className="card mt-3">
                <div className="px-3">
                  <i className="fas fa-clipboard fa-lg brown lighten-1 z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                </div>
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-md">
                      <table className="table table-sm mx-auto w-75">
                        {this.state.ot.itinerary.length > 0
                          ? this.state.ot.itinerary.map((item, index) => {
                              return (
                                <>
                                  {this.state.ot.itinerary[0].length > 0 ? (
                                    <thead>
                                      <tr>
                                        <tr>
                                          <th
                                            scope="col"
                                            className="font-weight-bold"
                                          >
                                            <span
                                              className="badge badge-secondary"
                                              style={{
                                                fontSize: "16px"
                                              }}
                                            >
                                              {`Hari ${index + 1}`}
                                            </span>
                                          </th>
                                        </tr>
                                      </tr>
                                    </thead>
                                  ) : null}

                                  <tbody>
                                    {item.map(i => {
                                      return (
                                        <tr>
                                          <td>{i}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </>
                              );
                            })
                          : null}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-md-10">
              <div className="card mt-3">
                <div className="px-3">
                  <i className="fas fa-cocktail fa-lg pink lighten-1 z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                </div>
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-md">
                      {this.state.ot.facility.map(item => {
                        return (
                          <span
                            className="badge badge-secondary mr-2 mb-2 p-2"
                            style={{ fontSize: "14px" }}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
export default OpenTripDetailCard;
