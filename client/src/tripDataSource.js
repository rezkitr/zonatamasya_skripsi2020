import React, { Component } from "react";
import axios from "axios";

const OpenTripData = (WrappedComponent) => {
  return class extends Component {
    state = {
      tripData: [],
    };

    componentDidMount() {
      axios
        .get("/ot/")
        .then((res) => {
          this.setState({ tripData: res.data });
        })
        .catch((err) => console.log(err));
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default OpenTripData;
