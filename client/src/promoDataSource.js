import React, { Component } from "react";
import axios from "axios";

const PromoDataSource = WrappedComponent => {
  return class extends Component {
    state = {
      promoData: []
    };

    componentDidMount() {
      axios
        .get("/promo/")
        .then(res => {
          this.setState({ promoData: res.data });
        })
        .catch(err => console.log(err));
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default PromoDataSource;
