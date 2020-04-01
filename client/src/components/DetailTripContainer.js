import React, { Component } from "react";
import axios from "axios";

import TripBanner from "./TripBanner";
import TabMenu from "./TabMenu";

class DetailTripContainer extends Component {
  state = {
    tripData: null
  };

  componentDidMount() {
    axios
      .get(`/opentrip/${this.props.tripId}`)
      .then(res => {
        this.setState({
          tripData: res.data
        });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    axios
      .get(`/opentrip/${this.props.tripId}`)
      .then(res => {
        this.setState({
          tripData: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return this.state.tripData ? (
      <div>
        <TripBanner
          bannerImage={this.state.tripData.bannerImage}
          name={this.state.tripData.name}
          start={this.state.tripData.departure.start}
        />
        <TabMenu
          tripId={this.props.tripId}
          itinerary={this.state.tripData.itinerary}
          facility={this.state.tripData.facility}
          priceFull={this.state.tripData.price.priceFull}
          start={this.state.tripData.departure.start}
          duration={this.state.tripData.duration}
          schedule={this.state.tripData.schedule}
        />
      </div>
    ) : null;
  }
}
export default DetailTripContainer;
