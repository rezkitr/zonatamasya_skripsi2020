import React, { Component } from "react";
import { Link } from "react-router-dom";
import helpers from "../helperFunction";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import axios from "axios";

import barcodeImg from "../assets/barcode.png";

class PromoCard extends Component {
  state = {
    trip: null,
  };

  componentDidMount() {
    axios
      .get(`/ot/${this.props.tripId}`)
      .then((res) => {
        this.setState({
          trip: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        {this.state.trip ? (
          <>
            <div className="card promo-card h-100">
              <div className="card-body" style={{ backgroundColor: "#ecf0f1" }}>
                <div className="row">
                  <div className="col-md-2 promo-img text-center py-4 mr-5">
                    <img src={barcodeImg} alt="barcode" />
                  </div>
                  <div className="d-flex flex-column justify-content-center promo-info">
                    <h5>
                      KODE PROMO : {"  "}
                      <span className="badge badge-info p-2">
                        {this.props.promoCode}
                      </span>
                    </h5>
                    <h1 className="font-weight-bold">
                      {helpers.priceFormat(this.props.discount)}
                    </h1>
                    <h6>
                      Masa Berlaku :{"  "}
                      <span className="badge badge-warning p-2">
                        {helpers.formatDate(this.props.expDate)}
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex flex-column promo-link justify-content-center mx-auto">
                    <div className="d-flex flex-row">
                      <Link
                        data-toggle="modal"
                        data-target={`#modal${this.props.tripId}`}
                      >
                        <i className="far fa-question-circle fa-lg text-success mr-3"></i>
                      </Link>
                      <Link to={`/opentrip/detail/${this.props.tripId}`}>
                        <i className="far fa-share-square fa-lg text-secondary mr-3"></i>
                      </Link>
                      <CopyToClipboard
                        text={this.props.promoCode}
                        onCopy={() =>
                          toast.success("Promo disalin", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                          })
                        }
                      >
                        <Link>
                          <i className="far fa-copy fa-lg text-info"></i>
                        </Link>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id={`modal${this.props.tripId}`}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md">
                        <label>Kode Promo</label>
                        <h6 className="font-weight-bold">
                          {this.props.promoCode}
                        </h6>
                        <label>Diskon</label>
                        <h6 className="font-weight-bold">
                          Rp{helpers.priceFormat(this.props.discount)}
                        </h6>
                        <label>Masa Berlaku</label>
                        <h6 className="font-weight-bold">
                          {helpers.formatDate(this.props.expDate)}
                        </h6>
                      </div>
                      <div className="col-md">
                        <label>Open Trip</label>
                        <h6 className="font-weight-bold">
                          {this.state.trip.name}
                        </h6>
                        <label>Start</label>
                        <h6 className="font-weight-bold">
                          {this.state.trip.departure.start}
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md">
                        <label>Deskripsi</label>
                        <p className="font-weight-bold">{this.props.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
}

export default PromoCard;
