import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CarouselItem = props => {
  return (
    <tr>
      <td>
        <img
          width="500"
          className="img-fluid"
          src={
            process.env.PUBLIC_URL +
            "/upload/carouselImg/" +
            props.carousel.carouselImage
          }
          alt={props.carousel.carouselImage}
        />
      </td>
      <td>
        <a
          href="#"
          onClick={() => {
            props.deletePromo(props.carousel._id);
          }}
          className="text-danger"
        >
          <i className="far fa-trash-alt mx-2"></i>
        </a>
      </td>
    </tr>
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
      return <CarouselItem key={item._id} carousel={item} />;
    });
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <Link to="/admin/carousel/add" className="green-text font-weight-bold">
          <i className="far fa-plus-square mr-2"></i>Tambah
        </Link>

        <div className="table-responsive mt-4">
          <table className="table table-hover w-50">
            <tbody>{this.mapCarouselList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default CarouselList;
