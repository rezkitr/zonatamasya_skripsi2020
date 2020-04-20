import React from "react";
import helpers from "../helperFunction";
import { Link } from "react-router-dom";

import PromoCard from "./PromoCardTabMenu";

function splitItinerary(itin) {
  let result = itin.split("#");
  return result;
}

function TabMenu(props) {
  const itinerary = props.itinerary.map((item, index) => {
    return (
      <>
        <tr>
          <th scope="row" rowSpan={item.length + 1}>
            {index + 1}
          </th>
        </tr>
        {item.map((i) => {
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

  const facility = props.facility.map((item) => {
    return (
      <p className="tab-inside-content">
        <i className="fas fa-check fa-sm mr-3"></i>
        {item}
      </p>
    );
  });

  const schedule = props.schedule.map((item) => {
    let pass = false;
    let now = new Date();
    let dateTemp = new Date(item);
    let badgeColor = helpers.colorizeTag(item);

    if (dateTemp < now) {
      pass = true;
    }

    return (
      <span
        className={`badge ${badgeColor} mr-2 my-2 p-2 tab-inside-content`}
        style={{
          fontSize: "14px",
          textDecoration: `${pass ? "line-through" : ""}`,
        }}
      >
        {helpers.formatDate(item)}
      </span>
    );
  });

  const promo = props.promoData.map((item) => {
    return (
      <div className="col-md-4">
        <PromoCard
          key={item._id}
          promoCode={item.code}
          discount={item.discount}
          expDate={item.expDate}
        />
      </div>
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
                className="nav-link tab-link"
                id="schedule-tab"
                data-toggle="tab"
                href="#jadwal"
                role="tab"
                aria-controls="schedule"
                aria-selected="false"
              >
                <i className="far fa-calendar-check mr-2"></i>Jadwal
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link tab-link"
                id="promo-tab"
                data-toggle="tab"
                href="#promo"
                role="tab"
                aria-controls="promo"
                aria-selected="false"
              >
                <i className="fas fa-cut mr-2"></i>Promo
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
                  {props.duration.toUpperCase()}
                </span>
              </p>
              <table className="table table-hover table-sm tab-inside-content">
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
              {facility}
            </div>

            <div
              className="tab-pane fade"
              id="jadwal"
              role="tabpanel"
              aria-labelledby="schedule-tab"
            >
              {schedule}
            </div>

            <div
              className="tab-pane fade"
              id="promo"
              role="tabpanel"
              aria-labelledby="promo-tab"
            >
              <div className="row">{promo}</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 detail-trip-rsv text-center">
          <h2 className="detail-trip-price">
            Rp{helpers.priceFormat(props.priceFull)}
          </h2>
          <Link to={"/reservation/" + props.tripId}>
            <button
              type="button"
              className="btn btn-light-green font-weight-bold rsv-btn"
            >
              RESERVASI<i className="fas fa-arrow-right fa-lg ml-3 "></i>
            </button>
          </Link>
          <div className="mt-5 feature-info">
            <p>
              <i className="far fa-map mr-3"></i> Banyak Pilihan
            </p>
            <p>
              <i className="fas fa-users mr-3"></i> Tanpa Minimum Kuota
            </p>
            <p>
              <i className="far fa-credit-card mr-3"></i> Transaksi Aman
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabMenu;
