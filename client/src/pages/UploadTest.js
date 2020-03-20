import React, { Component } from "react";
import axios from "axios";

export default class UploadTest extends Component {
  state = {
    selectedFile: null,
    name: ""
  };

  onChangeHandler = event => {
    this.setState({
      name: event.target.value
    });
  };

  formHandle = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append("myImage", this.state.selectedFile);
    data.append("name", this.state.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post("http://localhost:4000/image/upload", data, config)
      .then(res => {
        alert("sukses");
      })
      .catch(err => {
        alert("gagal");
      });
  };

  render() {
    return (
      <div className="container" style={{ marginTop: "160px" }}>
        <div className="row text-center justify-content-center">
          <div className="col-md-4">
            <form onSubmit={this.onFormSubmit}>
              <div class="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeHandler}
                  name="name"
                  id="name"
                />
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  onChange={this.formHandle}
                />
              </div>
              <button className="btn btn-sm btn-primary w-100" type="submit">
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
