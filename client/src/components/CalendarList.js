import React from "react";
import helpers from "../helperFunction";
import OpenTripData from "../tripDataSource";

import PageBanner from "./PageBanner";
import bannerImg from "../assets/bannerPageImage/calendar.jpg";

function CalendarList(props) {
  const tripSched = props.tripData.map((item, index) => {
    return (
      <>
        <tr>
          <th scope="row" rowSpan="2" style={{ fontSize: "18px" }}>
            {item.name}
          </th>
        </tr>

        <tr>
          <td>
            {item.schedule.map(schedItem => {
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
                        textDecoration: `${pass ? "line-through" : ""}`
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
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
      <PageBanner bannerImg={bannerImg} bannerTitle={"Kalendar Open Trip"} subTitle ={`Masih bingung kapan mau liburan? Lihat jadwal open trip di sini.`} />

      <div className="container-fluid">
        <div className="row pt-5">
          <div className="col-md">
            <table className="table mx-auto w-75">
              <thead>
                <tr>
                  <th
                    style={{ width: "30%" }}
                    scope="col"
                    className="font-weight-bold"
                  >
                    <i className="fas fa-suitcase fa-lg mr-2"></i>Open Trip
                  </th>
                  <th scope="col" className="font-weight-bold">
                    <i className="far fa-calendar-alt fa-lg mr-2"></i>Jadwal
                  </th>
                </tr>
              </thead>
              <tbody>{tripSched}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenTripData(CalendarList);
