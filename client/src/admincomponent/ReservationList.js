import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import helpers from "../helperFunction";
import axios from "axios";

import searchIcon from "../assets/search.png";

const RsvItem = (props) => {
  return (
    <tr>
      <td style={{ width: "25%" }} className="rsv-item">
        {props.rsv.participant.coordinator.coorName}
      </td>
      <td style={{ width: "25%" }} className="rsv-item">
        {props.rsv.mepo}
      </td>
      <td style={{ width: "10%" }} className="rsv-item">
        {props.rsv.totalParticipant}
      </td>
      <td
        style={{ width: "20%" }}
        className="rsv-item"
      >{`${props.rsv.payment.type}`}</td>
      <td className="rsv-item">
        <Link to={"/admin/rsv/detail/" + props.rsv._id} className="text-info">
          <i className="fas fa-search mx-2"></i>
        </Link>{" "}
        |{" "}
        <Link to={"/admin/rsv/edit/" + props.rsv._id} className="text-primary">
          <i className="far fa-edit mx-2"></i>
        </Link>{" "}
        |{" "}
        <a
          onClick={() => {
            props.deleteReservation(props.rsv._id, props.rsv.orderId);
          }}
          className="text-danger"
        >
          <i className="far fa-trash-alt mx-2"></i>
        </a>
      </td>
    </tr>
  );
};

const TripItem = (props) => {
  let now = new Date();
  now.setHours(0, 0, 0, 0);
  let dateTemp = new Date(props.trip.tripDate);
  dateTemp.setHours(0, 0, 0, 0);

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h4>
          <i className="fas fa-suitcase-rolling fa-sm mr-2"></i>
          <span className="badge badge-light mr-3">{`${props.trip.tripName} [ ${props.trip.tripStart} ]`}</span>
          <i className="far fa-calendar-check fa-sm mr-2"></i>
          <span
            className={`badge ${
              dateTemp < now
                ? "badge-danger"
                : dateTemp > now
                ? "badge-warning"
                : "badge-success"
            }  mr-3`}
          >
            {helpers.formatDate(props.trip.tripDate)}
          </span>
          <i className="fas fa-users fa-sm mr-2"></i>
          <span className="badge badge-info">{props.totalParticipant}</span>
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive text-nowrap">
          <table className="table table-hover w-100">
            <tbody>
              {props.rsvData.map((rsv, index) => {
                return (
                  <RsvItem
                    key={rsv._id}
                    rsv={rsv}
                    deleteReservation={props.deleteReservation}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

class ReservationList extends Component {
  state = {
    reservations: [],
    status: [],
    filteredReservations: [],
  };

  componentDidMount() {
    let statusTemp = [];
    axios
      .get("/reservation/")
      .then((res) => {
        this.setState(
          {
            reservations: res.data,
          },
          () => {
            this.setState({
              filteredReservations: this.state.reservations,
            });
          }
        );
      })
      .catch((err) => console.log(err));
  }

  groupReservationByDate = (array) => {
    const merged = array.reduce(
      (result, { tripName, tripStart, tripDate, ...obj }) => {
        const key = `${tripName}-${tripStart}-${tripDate}`;
        result[key] = result[key] || {
          tripName,
          tripStart,
          tripDate,
          rsvData: [],
        };
        result[key]["rsvData"].push(obj);
        return result;
      },
      {}
    );

    return Object.values(merged);
  };

  countTotalParticipant = (array) => {
    const sum = array.reduce((result, obj) => {
      return result + obj.totalParticipant;
    }, 0);
    return sum;
  };

  mapReservationList = () => {
    return this.groupReservationByDate(this.state.filteredReservations).map(
      (item, index) => {
        return (
          <TripItem
            key={index}
            trip={item}
            rsvData={item.rsvData}
            deleteReservation={this.deleteReservation}
            totalParticipant={this.countTotalParticipant(item.rsvData)}
          />
        );
      }
    );
  };

  handleKeywordChange = (event) => {
    const { value } = event.target;
    let updatedReservations = this.state.reservations;
    updatedReservations = updatedReservations.filter(
      (rsv) =>
        rsv.tripName.toLowerCase().includes(value.toLowerCase()) ||
        rsv.participant.coordinator.coorName
          .toLowerCase()
          .includes(value.toLowerCase())
    );
    this.setState({ filteredReservations: updatedReservations });
  };

  deleteReservation = (rsvId, orderId) => {
    confirmAlert({
      title: "Hapus Reservasi",
      message: "Apakah anda yakin?",
      buttons: [
        {
          label: "Batal",
        },
        {
          label: "Hapus",
          onClick: () => {
            this.setState({
              reservations: this.state.reservations.filter(
                (rsv) => rsv._id !== rsvId
              ),
              filteredReservations: this.state.filteredReservations.filter(
                (rsv) => rsv._id !== rsvId
              ),
            });
            axios
              .delete(`/reservation/${rsvId}`)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.log(err));

            axios
              .post(`/payment/cancel/${orderId}`)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.log(err));
          },
        },
      ],
    });
  };

  render() {
    return (
      <div className="container-fluid mt-5" id="rsv-list">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <label className="sr-only" for="keyword">
              Name
            </label>
            <input
              type="text"
              className="admin-search-input"
              id="keyword"
              name="keyword"
              placeholder="Tulis nama pemesan atau open trip"
              onChange={this.handleKeywordChange}
              style={{
                backgroundImage: `url(${searchIcon})`,
                backgroundSize: "20px",
              }}
            />
          </div>
        </div>

        {this.mapReservationList()}
      </div>
    );
  }
}

export default ReservationList;
