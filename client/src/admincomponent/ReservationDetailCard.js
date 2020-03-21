import React, { Component } from "react";
import { Link } from "react-router-dom";
import helpers from "../helperFunction";
import axios from "axios";

class ReservationDetail extends Component {
  state = {
    rsv: []
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/reservation/${this.props.rsvId}`)
      .then(res => {
        this.setState({ rsv: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      this.state.rsv.length > 0 && (
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
                  <i className="fas fa-suitcase fa-lg blue z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                  <div className="float-right text-right p-3">
                    <p className="text-muted mb-1">
                      <small>
                        Dipesan pada :{" "}
                        {this.state.rsv[0].reservationDate.substr(4)}
                      </small>
                    </p>
                  </div>
                </div>
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Open Trip</p>
                      <h4 className="purple-text">
                        {this.state.rsv[0].tripName}
                      </h4>
                    </div>
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Start</p>
                      <h4 className="purple-text">
                        {this.state.rsv[0].tripStart}
                      </h4>
                    </div>
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Meeting Point</p>
                      <h4 className="purple-text">{this.state.rsv[0].mepo}</h4>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Tgl. Keberangkatan</p>
                      <h4 className="purple-text">
                        {helpers.formatDate(this.state.rsv[0].tripDate)}
                      </h4>
                    </div>
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Jumlah Peserta</p>
                      <h4 className="purple-text">
                        {this.state.rsv[0].totalParticipant} pax
                      </h4>
                    </div>
                    <div className="col-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-md-10">
              <div className="card mt-3">
                <div className="px-3" width="50px" height="50px">
                  <i className="fas fa-users fa-lg light-green z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                </div>
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-md">
                      <div className="list-group list-group-flush">
                        <p
                          className="list-group-item h5 brown-text"
                          style={{ textTransform: "none" }}
                        >
                          {this.state.rsv[0].participant.coordinator.coorName} (
                          {this.state.rsv[0].participant.coordinator.coorGender}
                          )<i className="fas fa-bell ml-2"></i> /{" "}
                          {this.state.rsv[0].participant.coordinator.coorTelp} /{" "}
                          {this.state.rsv[0].participant.coordinator.coorEmail}
                        </p>
                        {this.state.rsv[0].participant.member.map(item => {
                          return (
                            <p
                              className="list-group-item h5"
                              style={{ textTransform: "none" }}
                            >
                              {item.memberName} ({item.memberGender}) /{" "}
                              {item.memberTelp}
                            </p>
                          );
                        })}
                      </div>
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
                  <i className="fas fa-money-check-alt fa-lg grey lighten-1 z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                </div>
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Jenis</p>
                      <h4 className="purple-text">
                        {this.state.rsv[0].payment.type}
                      </h4>
                    </div>
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Jumlah</p>
                      <h4 className="purple-text">
                        Rp
                        {helpers.priceFormat(this.state.rsv[0].payment.amount)}
                      </h4>
                    </div>
                    <div className="col-md">
                      <p className="h6 font-weight-bold">Promo</p>
                      <h4 className="purple-text">
                        {this.state.rsv[0].promoCode}
                      </h4>
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

export default ReservationDetail;
