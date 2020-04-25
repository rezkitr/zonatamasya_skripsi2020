import React, { Component } from "react";
import axios from "axios";

const BannerData = (WrappedComponent) => {
  return class extends Component {
    state = {
      bannerData: [],
    };

    componentDidMount() {
      axios
        .get("/banner/")
        .then((res) => {
          this.setState({ bannerData: res.data });
        })
        .catch((err) => console.log(err));
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default BannerData;
