import React, { Component } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";

const BannerItem = (props) => {
  let splitFilename = props.banner.fileName.split(".");
  let ext = splitFilename[1];

  if (ext === "jpeg" || ext === "png") {
    return (
      <div className="col-md-3 mb-4 text-center">
        <div className="row px-2 py-3 h-100">
          <img
            className="img-fluid"
            src={
              process.env.PUBLIC_URL +
              "/upload/bannerFiles/" +
              props.banner.fileName
            }
            alt={props.banner.fileName}
          />
        </div>
        <div className="row">
          <div className="col text-center">
            <a
              onClick={() => {
                props.deleteBannerFile(props.banner._id, props.banner.fileName);
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
              "/upload/bannerFiles/" +
              props.banner.fileName
            }
          ></video>
        </div>
        <div className="row">
          <div className="col text-center">
            <a
              onClick={() => {
                props.deleteBannerFile(props.banner._id, props.banner.fileName);
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

class BannerList extends Component {
  state = {
    banners: [],
  };

  componentDidMount() {
    axios
      .get("/banner/")
      .then((res) => {
        this.setState({ banners: res.data });
      })
      .catch((err) => console.log(err));
  }

  mapBannerList() {
    return this.state.banners.map((item) => {
      return (
        <BannerItem
          key={item._id}
          banner={item}
          deleteBannerFile={this.deleteBannerFile}
        />
      );
    });
  }

  deleteBannerFile = (bnrId, fileName) => {
    let bnrData = { bnrId, fileName };
    confirmAlert({
      title: "Hapus Banner",
      message: "Apakah anda yakin?",
      buttons: [
        {
          label: "Batal",
        },
        {
          label: "Hapus",
          onClick: () => {
            axios
              .post("/banner/delete", bnrData)
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err));

            this.setState({
              banners: this.state.banners.filter((bnr) => bnr._id !== bnrId),
            });
          },
        },
      ],
    });
  };

  render() {
    return (
      <div className="container-fluid mt-5">
        <Link to="/admin/banner/add" className="green-text font-weight-bold">
          <i className="far fa-plus-square mr-2"></i>Tambah
        </Link>

        <div className="row mt-4">{this.mapBannerList()}</div>
      </div>
    );
  }
}
export default BannerList;
