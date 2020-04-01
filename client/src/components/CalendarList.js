import React from "react";
import helpers from "../helperFunction";
import dateBadgeColorizer from "../dateBadgeColorizer";
import OpenTripData from "../tripDataSource";

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
              now.setHours(0, 0, 0, 0);
              let dateTemp = new Date(schedItem);
              dateTemp.setHours(0, 0, 0, 0);
              let badgeColor = dateBadgeColorizer.colorizeTag(schedItem);

              if (dateTemp < now) {
                pass = true;
              }

              return (
                <span
                  className={`badge ${badgeColor} mr-2 my-2 p-2`}
                  style={{
                    fontSize: "14px",
                    textDecoration: `${pass ? "line-through" : ""}`
                  }}
                >
                  {helpers.formatDate(schedItem)}
                </span>
              );
            })}
          </td>
        </tr>
      </>
    );
  });

  return (
    <div className="container-fluid" style={{ minHeight: "380px" }}>
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
  );
}

export default OpenTripData(CalendarList);
