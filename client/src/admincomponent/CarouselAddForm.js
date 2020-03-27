import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

import DataSource from "../tripDataSource";

class CarouselAddForm extends Component {
  state = {
    carouselFile: null,
    submitting: false
  };

  handleSelectImage = event => {
    const { name, files } = event.target;
    this.setState({
      [name]: files[0]
    });
  };

  render() {
    return (
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
                <i className="far fa-plus-square fa-lg light-green z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                <div className="float-right text-right p-3">
                  <p className="text-muted mb-1">
                    <small>Tambah Carousel</small>
                  </p>
                </div>
                <div
                  className="card-body p-5"
                  style={{ textTransform: "none" }}
                >
                  <Formik
                    enableReinitialize
                    initialValues={{
                      tripId: ""
                    }}
                    validationSchema={ValidationSchema}
                    validateOnBlur={false}
                    onSubmit={(values, { setSubmitting }) => {
                      const data = new FormData();
                      data.append("tripId", values.tripId);
                      data.append("carouselFile", this.state.carouselFile);

                      const config = {
                        headers: {
                          "Content-Type": "multipart/form-data"
                        }
                      };
                      axios
                        .post("/carousel/add", data, config)
                        .then(res => {
                          confirmAlert({
                            title: "Tambah Carousel",
                            message: "Gambar Carousel Berhasil Ditambakan",
                            buttons: [
                              {
                                label: "OK"
                              }
                            ]
                          });
                        })
                        .catch(err => {
                          confirmAlert({
                            title: "Error",
                            message: `${err}`,
                            buttons: [
                              {
                                label: "OK"
                              }
                            ]
                          });
                        });
                      this.props.history.push("/admin");
                    }}
                  >
                    {({ errors, touched, values, isSubmitting }) => (
                      <Form>
                        <div>
                          <div className="form-group">
                            <label
                              htmlFor="tripId"
                              className="font-weight-bold"
                            >
                              Open Trip
                            </label>
                            <Field
                              as="select"
                              id="tripId"
                              name="tripId"
                              className={`form-control ${
                                touched.tripId && errors.tripId
                                  ? "is-invalid"
                                  : ""
                              }`}
                            >
                              <option value="" disabled>
                                Pilih Open Trip
                              </option>
                              {this.props.tripData
                                ? this.props.tripData.map(item => {
                                    return (
                                      <option value={item._id}>
                                        {`${item.name} (${item.departure.start})`}
                                      </option>
                                    );
                                  })
                                : null}
                            </Field>
                            <ErrorMessage
                              component="div"
                              name="tripId"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="carouselFile"
                              className="font-weight-bold"
                            >
                              File Carousel
                            </label>
                            <input
                              type="file"
                              className="form-control-file"
                              name="carouselFile"
                              id="carouselFile"
                              onChange={this.handleSelectImage}
                            />
                            <small className="form-text text-muted">
                              JPEG/ PNG/ MP4 (Max. 500 MB)
                            </small>
                            {this.state.carouselFile === null &&
                            this.state.submitting ? (
                              <div className="pt-1">
                                <p className="my-invalid-feedback">
                                  Silahkan pilih file
                                </p>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="text-right mt-4">
                          <button
                            className="btn btn-sm btn-unique"
                            onClick={() => {
                              this.props.history.push("/admin");
                            }}
                          >
                            <i className="fas fa-angle-left mr-2"></i>KEMBALI
                          </button>
                          <button
                            className="btn btn-sm btn-success"
                            type="submit"
                            onClick={() => this.setState({ submitting: true })}
                          >
                            <i className="far fa-plus-square mr-2"></i>TAMBAH
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
      </div>
    );
  }
}

const ValidationSchema = Yup.object().shape({
  tripId: Yup.string()
    .required("Silahkan pilih open trip")
    .notOneOf([""])
});

export default DataSource(CarouselAddForm);
