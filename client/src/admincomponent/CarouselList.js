import React, { Component } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";

const CarouselItem = props => {
  let splitFilename = props.carousel.carouselFile.split(".");
  let ext = splitFilename[1];

  if (ext === "jpeg" || ext === "png") {
    return (
      <div className="col-md-3 mb-4 text-center">
        <div className="row px-2 py-3 h-100">
          <img
            className="img-fluid"
            src={
              process.env.PUBLIC_URL +
              "/upload/carouselFiles/" +
              props.carousel.carouselFile
            }
            alt={props.carousel.carouselFile}
          />
        </div>
        <div className="row">
          <div className="col text-center">
            <a
              onClick={() => {
                props.deleteCarouselFile(
                  props.carousel._id,
                  props.carousel.carouselFile
                );
              }}
              className="text-danger"
            >
              <i className="far fa-trash-alt mx-2"></i>
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-md-3 mb-4 text-center">
        <div className="row px-2 h-100">
          <video
            autoPlay
            loop
            muted
            className="video-fluid d-block"
            src={
              process.env.PUBLIC_URL +
              "/upload/carouselFiles/" +
              props.carousel.carouselFile
            }
          ></video>
        </div>
        <div className="row">
          <div className="col text-center">
            <a
              onClick={() => {
                props.deleteCarouselFile(
                  props.carousel._id,
                  props.carousel.carouselFile
                );
              }}
              className="text-danger"
            >
              <i className="far fa-trash-alt mx-2"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

class CarouselList extends Component {
  state = {
    carousels: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/carousel/")
      .then(res => {
        this.setState({ carousels: res.data });
      })
      .catch(err => console.log(err));
  }

  mapCarouselList() {
    return this.state.carousels.map(item => {
      return (
        <CarouselItem
          key={item._id}
          carousel={item}
          deleteCarouselFile={this.deleteCarouselFile}
        />
      );
    });
  }

  deleteCarouselFile = (crsId, carouselFile) => {
    let crsData = { crsId, carouselFile };
    confirmAlert({
      title: "Hapus Gambar Carousel",
      message: "Apakah anda yakin?",
      buttons: [
        {
          label: "Batal"
        },
        {
          label: "Hapus",
          onClick: () => {
            axios
              .post("http://localhost:4000/carousel/delete", crsData)
              .then(res => console.log(res.data))
              .catch(err => console.log(err));

            this.setState({
              carousels: this.state.carousels.filter(crs => crs._id !== crsId)
            });
          }
        }
      ]
    });
  };

  render() {
    return (
      <div className="container-fluid mt-5">
        <Link to="/admin/carousel/add" className="green-text font-weight-bold">
          <i className="far fa-plus-square mr-2"></i>Tambah
        </Link>

        <div className="row mt-4">{this.mapCarouselList()}</div>
      </div>
    );
  }
}
export default CarouselList;
