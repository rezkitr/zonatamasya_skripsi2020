import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import helpers from "../helperFunction";
import axios from "axios";

import searchIcon from "../assets/search.png";

const ReservationItem = props => {
  return (
    <tr>
      <td>{props.reservation.tripName}</td>
      <td>{helpers.formatDate(props.reservation.tripDate)}</td>
      <td>{props.reservation.tripStart}</td>
      <td>{props.reservation.mepo}</td>
      <td>{props.reservation.participant.coordinator.coorName}</td>
      <td>{props.reservation.totalParticipant}</td>
      <td>{`${props.reservation.payment.type}`}</td>
      <td>
        <Link
          to={"/admin/rsv/detail/" + props.reservation._id}
          className="text-info"
        >
          <i className="fas fa-search mx-2"></i>
        </Link>{" "}
        |{" "}
        <Link
          to={"/admin/rsv/edit/" + props.reservation._id}
          className="text-primary"
        >
          <i className="far fa-edit mx-2"></i>
        </Link>{" "}
        |{" "}
        <a
          onClick={() => {
            props.deleteReservation(props.reservation._id);
          }}
          className="text-danger"
        >
          <i className="far fa-trash-alt mx-2"></i>
        </a>
      </td>
    </tr>
  );
};

class ReservationList extends Component {
  state = {
    reservations: [],
    filteredReservations: []
  };

  componentDidMount() {
    axios
      .get("/reservation/")
      .then(res => {
        this.setState({
          reservations: res.data,
          filteredReservations: res.data
        });
      })
      .catch(err => console.log(err));
  }

  mapReservationList = () => {
    return this.state.filteredReservations.map((item, index) => {
      return (
        <ReservationItem
          key={item._id}
          reservation={item}
          deleteReservation={this.deleteReservation}
        />
      );
    });
  };

  handleKeywordChange = event => {
    const { value } = event.target;
    let updatedReservations = this.state.reservations;
    updatedReservations = updatedReservations.filter(
      rsv =>
        rsv.tripName.toLowerCase().includes(value.toLowerCase()) ||
        rsv.participant.coordinator.coorName
          .toLowerCase()
          .includes(value.toLowerCase())
    );
    this.setState({ filteredReservations: updatedReservations });
  };

  deleteReservation = rsvId => {
    confirmAlert({
      title: "Hapus Reservasi",
      message: "Apakah anda yakin?",
      buttons: [
        {
          label: "Batal"
        },
        {
          label: "Hapus",
          onClick: () => {
            axios
              .delete(`/reservation/${rsvId}`)
              .then(res => console.log(res.data))
              .catch(err => console.log(err));
            this.setState({
              reservations: this.state.reservations.filter(
                rsv => rsv._id !== rsvId
              )
            });
          }
        }
      ]
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
                backgroundSize: "20px"
              }}
            />
          </div>
        </div>

        <div class="table-responsive mt-5 text-nowrap">
          <table className="table table-hover mx-auto w-100">
            <thead>
              <tr>
                <th scope="col">
                  <i className="fas fa-suitcase-rolling mr-2 fa-lg"></i>Open
                  Trip
                </th>
                <th scope="col">
                  <i className="far fa-calendar-check mr-2 fa-lg"></i>Tgl.
                  Keberangkatan
                </th>
                <th scope="col">
                  <i className="fas fa-plane-departure mr-2 fa-lg"></i>Start
                </th>
                <th scope="col">
                  <i className="far fa-flag mr-2 fa-lg"></i>Meeting Point
                </th>
                <th scope="col">
                  <i className="fas fa-user mr-2 fa-lg"></i>Pemesan
                </th>
                <th scope="col">
                  <i className="fas fa-users mr-2 fa-lg"></i>Jumlah Peserta
                </th>
                <th scope="col">
                  <i className="fas fa-money-check-alt mr-2 fa-lg"></i>
                  Pembayaran
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.mapReservationList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ReservationList;
