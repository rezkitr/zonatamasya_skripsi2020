import React, { Component } from "react";

import bgImage from "../assets/bg-search.png";
import searchIcon from "../assets/search.png";

class TripSearch extends Component {
  state = {
    keyword: ""
  };

  keywordChangeHandle = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  submitSearch = event => {
    if (event.key === "Enter") {
      if (this.state.keyword.length > 0) {
        this.props.history.push(
          `/searchtrip/${this.state.keyword.toLowerCase()}`
        );
      }
    }
  };

  render() {
    return (
      <div
        className="container-fluid searchtrip-section"
        style={{
          backgroundImage: `url(${bgImage})`
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-3" style={{ marginTop: "80px" }}>
            <form autoComplete="off">
              <input
                type="text"
                name="keyword"
                id="keyword"
                placeholder="Cari open trip"
                className="search-input"
                style={{ backgroundImage: `url(${searchIcon})` }}
                onChange={this.keywordChangeHandle}
                onKeyPress={this.submitSearch}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default TripSearch;
