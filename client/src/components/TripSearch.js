import React, { Component } from "react";
import { Link } from "react-router-dom";

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

  render() {
    return (
      <div className="searchtrip-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form>
                <label htmlFor="keyword" className="font-weight-bold">
                  Cari Open Trip
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    id="keyword"
                    name="keyword"
                    placeholder="Mau ke..."
                    className="form-control form-control-lg"
                    onChange={this.keywordChangeHandle}
                  />
                  <div className="input-group-append">
                    <Link
                      to={`/searchtrip/${this.state.keyword}`}
                      className="input-group-text amber"
                    >
                      <i className="fas fa-search mx-2"></i>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TripSearch;
