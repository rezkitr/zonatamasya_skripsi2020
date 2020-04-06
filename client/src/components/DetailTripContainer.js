import React, { Component } from "react";
import axios from "axios";

import OtherTripSlide from "./OtherTripSlide";
import TripBanner from "./TripBanner";
import TabMenu from "./TabMenu";
import LoadingScreen from "./LoadingScreen";

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

  componentDidUpdate(prevProps) {
    if (this.props.tripId !== prevProps.tripId) {
      this.setState({ tripData: null });
      setTimeout(() => {
        axios
          .get(`/opentrip/${this.props.tripId}`)
          .then(res => {
            this.setState({
              tripData: res.data
            });
          })
          .catch(err => console.log(err));
      }, 2500);
    }
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
        <OtherTripSlide />
      </div>
    ) : (
      <LoadingScreen />
    );
  }
}
export default DetailTripContainer;
