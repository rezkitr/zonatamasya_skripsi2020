import React, { Component } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";

const CarouselItem = props => {
  return (
    <div className="col-md-3 p-3 mb-3 text-center">
      <img
        className="img-fluid mb-3"
        src={
          process.env.PUBLIC_URL +
          "/upload/carouselImg/" +
          props.carousel.carouselImage
        }
        alt={props.carousel.carouselImage}
      />
      <a
        onClick={() => {
          props.deleteCarouselImage(
            props.carousel._id,
            props.carousel.carouselImage
          );
        }}
        className="text-danger"
      >
        <i className="far fa-trash-alt mx-2"></i>
      </a>
    </div>
  );
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
          deleteCarouselImage={this.deleteCarouselImage}
        />
      );
    });
  }

  deleteCarouselImage = (crsId, carouselImage) => {
    let crsData = { crsId, carouselImage };
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
