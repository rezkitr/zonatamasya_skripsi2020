import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import helpers from "../helperFunction";
import axios from "axios";

const TripItem = props => {
  return (
    <tr>
      <td>{props.trip.name}</td>
      <td>{props.trip.departure.start}</td>
      <td>{props.trip.duration.toUpperCase()}</td>
      <td>{helpers.priceFormat(props.trip.price.priceDP)}</td>
      <td>{helpers.priceFormat(props.trip.price.priceFull)}</td>
      <td>
        <Link
          to={"/admin/opentrip/detail/" + props.trip._id}
          className="text-info"
        >
          <i className="fas fa-search mx-2"></i>
        </Link>{" "}
        |{" "}
        <Link
          to={"/admin/opentrip/edit/" + props.trip._id}
          className="text-primary"
        >
          <i className="far fa-edit mx-2"></i>
        </Link>{" "}
        |{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteTrip(
              props.trip._id,
              props.trip.cardImage,
              props.trip.bannerImage
            );
          }}
          className="text-danger"
        >
          <i className="far fa-trash-alt mx-2"></i>
        </a>
      </td>
    </tr>
  );
};

class OpenTripList extends Component {
  state = {
    opentrips: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/opentrip/")
      .then(res => {
        this.setState({ opentrips: res.data });
      })
      .catch(err => console.log(err));
  }

  mapTripList() {
    return this.state.opentrips.map(item => {
      return (
        <TripItem key={item._id} trip={item} deleteTrip={this.deleteTrip} />
      );
    });
  }

  deleteTrip = (tripId, cardImage, bannerImage) => {
    let imgData = { cardImage, bannerImage };
    confirmAlert({
      title: "Hapus Open Trip",
      message: "Apakah anda yakin?",
      buttons: [
        {
          label: "Batal"
        },
        {
          label: "Hapus",
          onClick: () => {
            axios
              .delete(`http://localhost:4000/opentrip/${tripId}`)
              .then(res => console.log(res.data))
              .catch(err => console.log(err));
            this.setState({
              opentrips: this.state.opentrips.filter(ot => ot._id !== tripId)
            });

            axios
              .post("http://localhost:4000/opentrip/deleteimg", imgData)
              .then(res => console.log(res.data))
              .catch(err => console.log(err));
          }
        }
      ]
    });
  };

  render() {
    return (
      <div className="container-fluid mt-5">
        <Link to="/admin/opentrip/add" className="green-text font-weight-bold">
          <i className="far fa-plus-square mr-2"></i>Tambah
        </Link>
        <div className="table-responsive mt-4">
          <table className="table table-hover mx-auto w-100">
            <thead>
              <tr>
                <th scope="col">
                  <i className="fas fa-tag mr-2 fa-lg"></i>Nama
                </th>
                <th scope="col">
                  <i className="fas fa-plane-departure mr-2 fa-lg"></i>Start
                </th>
                <th scope="col">
                  <i className="fas fa-stopwatch mr-2 fa-lg"></i>Durasi
                </th>
                <th scope="col">
                  <i className="fas fa-hourglass-end mr-2 fa-lg"></i>Harga DP
                </th>
                <th scope="col">
                  <i className="fas fa-hourglass mr-2 fa-lg"></i>Harga Lunas
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.mapTripList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default OpenTripList;
