import React, { Component } from "react";
import axios from "axios";

import EditForm from "./OpenTripEditForm";

class OpenTripEditContainer extends Component {
  state = {
    opentripData: null
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/opentrip/${this.props.tripId}`)
      .then(res => {
        this.setState({ opentripData: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      this.state.opentripData && (
        <div>
          <EditForm {...this.props} opentripData={this.state.opentripData} />
        </div>
      )
    );
  }
}

export default OpenTripEditContainer;
