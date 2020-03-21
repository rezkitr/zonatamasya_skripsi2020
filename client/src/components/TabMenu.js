import React from "react";
import helpers from "../helperFunction";
import { Link } from "react-router-dom";
import DataSource from "../tripDataSource";

import OtherTripSlide from "./OtherTripSlide";

function splitItinerary(itin) {
  let result = itin.split("#");
  return result;
}

function TabMenu(props) {
  let itinTemp = [];
  let facility = [];
  let price = 0;
  let start = "";
  let duration = "";

  props.tripData.map(item => {
    if (item._id === props.tripId) {
      itinTemp = item.itinerary;
      facility = item.facility;
      price = item.price.priceFull;
      start = item.tripDeparture.start;
      duration = item.tripDuration;
    }
  });

  const itinerary = itinTemp.map((item, index) => {
    return (
      <>
        <tr>
          <th scope="row" rowSpan={item.length + 1}>
            {index + 1}
          </th>
        </tr>
        {item.map(i => {
          let splittedItin = splitItinerary(i);
          return (
            <tr>
              <td>{splittedItin[0]}</td>
              <td>{splittedItin[1]}</td>
              <td>{splittedItin[2]}</td>
            </tr>
          );
        })}
      </>
    );
  });

  const fasilitas = facility.map(item => {
    return (
      <p>
        <i className="fas fa-check fa-sm mr-3"></i>
        {item}
      </p>
    );
  });

  return (
    <div className="container-fluid tab-menu">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active tab-link"
                id="itinerary-tab"
                data-toggle="tab"
                href="#itinerary"
                role="tab"
                aria-controls="itinerary"
                aria-selected="true"
              >
                <i className="far fa-list-alt mr-2"></i>Itinerary
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link tab-link"
                id="facility-tab"
                data-toggle="tab"
                href="#fasilitas"
                role="tab"
                aria-controls="facility"
                aria-selected="false"
              >
                <i className="fas fa-couch mr-2"></i>Fasilitas
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link tab-link font-weight-bold text-success"
                id="reservation-tab"
                data-toggle="tab"
                href="#reservasi"
                role="tab"
                aria-controls="reservation"
                aria-selected="false"
              >
                <i className="fas fa-file-invoice mr-2"></i>Reservasi
              </a>
            </li>
          </ul>

          <div className="tab-content mt-4" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="itinerary"
              role="tabpanel"
              aria-labelledby="itinerary-tab"
            >
              <p className="h3 mb-4">
                <span className="badge badge-warning ml-2 px-3 py-2">
                  <i className="far fa-clock mr-3"></i>
                  {duration.toUpperCase()}
                </span>
              </p>
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th scope="col">Hari</th>
                    <th scope="col">Waktu</th>
                    <th scope="col">Kegiatan</th>
                    <th scope="col">Keterangan</th>
                  </tr>
                </thead>
                <tbody>{itinerary}</tbody>
              </table>
            </div>

            <div
              className="tab-pane fade"
              id="fasilitas"
              role="tabpanel"
              aria-labelledby="facility-tab"
            >
              {fasilitas}
            </div>

            <div
              className="tab-pane fade"
              id="reservasi"
              role="tabpanel"
              aria-labelledby="price-tab"
            >
              <div className="card card-price text-center px-5">
                <div className="card-body text-center text-success">
                  <h1 className="font-weight-bold mb-3">
                    Rp{helpers.priceFormat(price)}
                  </h1>
                  <p className="text-muted h5">
                    <i className="fas fa-plane-departure fa-sm mr-3"></i>Start{" "}
                    {start}
                  </p>
                  <hr />
                  <Link to={"/reservation/" + props.tripId}>
                    <button
                      type="button"
                      className="btn btn-success mt-3 font-weight-bold"
                    >
                      RESERVASI<i className="fas fa-pen-alt fa-lg ml-3 "></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OtherTripSlide tripId={props.tripId} />
    </div>
  );
}

export default DataSource(TabMenu);
