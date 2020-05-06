import React, { Component } from "react";
import axios from "axios";

export default class HandleNotification extends Component {
  componentDidMount() {
    axios
      .post("/payment/notification")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  render() {
    return null;
  }
}
