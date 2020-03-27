import React, { Component } from "react";
import axios from "axios";

const CarouselData = WrappedComponent => {
  return class extends Component {
    state = {
      carouselData: []
    };

    componentDidMount() {
      axios
        .get("/.netlify/functions/server/carousel/")
        .then(res => {
          this.setState({ carouselData: res.data });
        })
        .catch(err => console.log(err));
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default CarouselData;
