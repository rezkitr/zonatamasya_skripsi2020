import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";

import loginImage from "../assets/login.png";
import userIcon from "../assets/user.png";
import keyIcon from "../assets/key.png";

class LoginAdminForm2 extends Component {
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
      <div style={{ height: "100vh" }}>
        <div className="container-fluid login-admin-page">
          <div className="row justify-content-center">
            <div className="col-md-4 img-col text-center">
              <img src={loginImage} alt={loginImage} />
            </div>
            <div className="col-md-3 form-col text-center">
              <h3>Login</h3>
              <form onSubmit={this.loginSubmit} className="mt-5">
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={this.state.username}
                    onChange={this.formHandle}
                    className="login-admin-input"
                    placeholder="Username"
                    style={{ backgroundImage: `url(${userIcon})` }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.formHandle}
                    className="login-admin-input"
                    placeholder="Password"
                    style={{ backgroundImage: `url(${keyIcon})` }}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn-sm m-0 w-100 font-weight-bold ${
                    this.state.isLoading
                      ? "dusty-grass-gradient disabled"
                      : "peach-gradient"
                  }`}
                >
                  {this.state.isLoading ? "Hang on..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginAdminForm2;
