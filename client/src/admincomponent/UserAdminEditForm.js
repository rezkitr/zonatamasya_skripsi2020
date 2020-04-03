import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

class UserAdminEditForm extends Component {
  state = {
    admin: null
  };

  componentDidMount() {
    axios
      .get(`/adm/id/${this.props.adminId}`)
      .then(res => {
        this.setState({
          admin: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return this.state.admin ? (
      <div className="container-fluid my-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-4">
            <Link to="/admin">
              <p className="h5 text-dark">
                <i className="fas fa-angle-left mr-2"></i>KEMBALI
              </p>
            </Link>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <div className="card">
              <div className="px-3">
                <i className="far fa-edit fa-lg primary-color z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                <div className="float-right text-right p-3">
                  <p className="text-muted mb-1">
                    <small>Edit Data Admin</small>
                  </p>
                </div>
              </div>
              <div className="card-body p-5">
                <Formik
                  enableReinitialize
                  initialValues={{
                    username: this.state.admin.username,
                    password: ""
                  }}
                  validationSchema={ValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      axios
                        .post(`/adm/update/${this.props.adminId}`, values)
                        .then(res =>
                          confirmAlert({
                            title: "Update Admin",
                            message: "Data Admin Berhasil Diupdate",
                            buttons: [
                              {
                                label: "OK"
                              }
                            ]
                          })
                        )
                        .catch(err => alert(err));
                      setSubmitting(false);
                      this.props.history.push("/admin");
                    }, 200);
                  }}
                >
                  {({ errors, touched, values, isSubmitting }) => (
                    <Form>
                      <div>
                        <div className="form-row">
                          <div className="form-group col-md">
                            <label
                              htmlFor="username"
                              className="font-weight-bold"
                            >
                              Username
                            </label>
                          </div>
                          <div className="form-group col-md">
                            <label
                              htmlFor="password"
                              className="font-weight-bold"
                            >
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md">
                            <Field
                              type="text"
                              id="username"
                              name="username"
                              className={`form-control ${
                                touched.username && errors.username
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="username"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group col-md">
                            <Field
                              type="text"
                              id="password"
                              name="password"
                              className={`form-control ${
                                touched.password && errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="password"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <button
                          className="btn btn-sm btn-unique"
                          onClick={() => {
                            this.props.history.push("/admin");
                          }}
                        >
                          <i className="fas fa-angle-left mr-2"></i>KEMBALI
                        </button>
                        <button
                          className={`btn btn-sm btn-success ${
                            isSubmitting ? "disabled" : ""
                          }`}
                          type="submit"
                        >
                          <i className="far fa-save mr-2"></i>SIMPAN
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row h-100">
          <div className="col my-auto text-center">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }
}

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required("Silahkan masukkan username"),
  password: Yup.string()
    .required("Silahkan masukkan password")
    .min(6, "Min. 6 karakter")
});

export default UserAdminEditForm;
