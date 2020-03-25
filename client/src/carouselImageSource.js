import React, { Component } from "react";
import axios from "axios";

const CarouselImageData = WrappedComponent => {
  return class extends Component {
    state = {
      carouselImages: []
    };

    componentDidMount() {
      axios
        .get("http://localhost:4000/carousel/")
        .then(res => {
          this.setState({ carouselImages: res.data });
        })
        .catch(err => console.log(err));
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default CarouselImageData;
