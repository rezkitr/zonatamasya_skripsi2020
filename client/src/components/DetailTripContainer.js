import React, { Component } from "react";
import axios from "axios";

import TripBanner from "./TripBanner";
import TabMenu from "./TabMenu";

class DetailTripContainer extends Component {
  state = {
    trip: null
  };

  componentDidMount() {
    axios
      .get(`/opentrip/${this.props.tripId}`)
      .then(res => {
        this.setState({
          trip: res.data
        });
      })
      .catch(err => console.log(err));
  }

  // componentWillUpdate() {
  //   axios
  //     .get(`/opentrip/${this.props.tripId}`)
  //     .then(res => {
  //       this.setState({
  //         trip: res.data
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }

  render() {
    return this.state.trip ? (
      <div>
        <TripBanner
          bannerImage={this.state.trip.bannerImage}
          name={this.state.trip.name}
          start={this.state.trip.departure.start}
        />
        <TabMenu
          tripId={this.props.tripId}
          itinerary={this.state.trip.itinerary}
          facility={this.state.trip.facility}
          priceFull={this.state.trip.price.priceFull}
          start={this.state.trip.departure.start}
          duration={this.state.trip.duration}
          schedule={this.state.trip.schedule}
        />
      </div>
    ) : null;
  }
}
export default DetailTripContainer;
