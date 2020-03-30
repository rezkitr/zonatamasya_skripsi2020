import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";

import logo from "../assets/logo2.png";
import bglogin from "../assets/login-bg2.jpg";

class LoginAdminForm extends Component {
  state = {
    username: "",
    password: "",
    isLoading: false
  };

  formHandle = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  loginSubmit = e => {
    e.preventDefault();
    const values = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post("/admin/auth", values)
      .then(res => {
        if (res.data) {
          localStorage.setItem("isLoggedIn", "true");
          this.setState({ isLoading: true });
          setTimeout(() => {
            this.props.history.push("/admin");
          }, 2000);
        } else {
          confirmAlert({
            title: "Login Gagal",
            message: "Password Salah",
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      })
      .catch(err => {
        confirmAlert({
          title: "Login Gagal",
          message: "Username Salah",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
      });
  };

  render() {
    return (
      <div
        className="login-bg border border-black"
        style={{ backgroundImage: `url(${bglogin})` }}
      >
        <div className="container-fluid login-adm-form">
          <div className="row justify-content-center">
            <div className="col-md-3 col-sm-6 text-center">
              <div className="card">
                <div className="card-body">
                  <img src={logo} alt="zt-logo" width="80" />
                  <h5 className="card-title font-weight-bold my-3">
                    Admin Login
                  </h5>
                  <form onSubmit={this.loginSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={this.state.username}
                        onChange={this.formHandle}
                        className="form-control"
                        placeholder="Username"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.formHandle}
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <button
                      type="submit"
                      className={`btn btn-sm ${
                        this.state.isLoading
                          ? "btn-warning disabled"
                          : "btn-primary"
                      }`}
                    >
                      {this.state.isLoading ? "Hang on..." : "Login"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginAdminForm;
