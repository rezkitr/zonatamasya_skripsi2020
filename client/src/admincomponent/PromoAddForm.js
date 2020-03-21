import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

import DataSource from "../tripDataSource";

class PromoAddForm extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <div className="card">
              <div className="px-3">
                <i className="far fa-plus-square fa-lg light-green z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                <div className="float-right text-right p-3">
                  <p className="text-muted mb-1">
                    <small>Tambah Data Promo</small>
                  </p>
                </div>
                <div className="card-body p-5">
                  <Formik
                    enableReinitialize
                    initialValues={{
                      code: "",
                      discount: 0,
                      description: "",
                      expDate: "",
                      tripId: ""
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        axios
                          .post("http://localhost:4000/promo/add", values)
                          .then(res => {
                            confirmAlert({
                              title: "Tambah Promo",
                              message: "Data Promo Berhasil Ditambakan",
                              buttons: [
                                {
                                  label: "OK"
                                }
                              ]
                            });
                          })
                          .catch(err => alert(err));
                        setSubmitting(false);
                        this.props.history.push("/admin");
                      }, 200);
                    }}
                  >
                    {({ errors, touched, values, isSubmitting }) => (
                      <Form>
                        <div>
                          <div className="form-group">
                            <label
                              htmlFor="promoTripId"
                              className="font-weight-bold"
                            >
                              Open Trip
                            </label>
                            <Field
                              as="select"
                              id="promoTripId"
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
                                      <option value={item.tripID}>
                                        {item.tripName}
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
                              htmlFor="promoCode"
                              className="font-weight-bold"
                            >
                              Kode
                            </label>
                            <Field
                              type="text"
                              id="promoCode"
                              name="code"
                              className={`form-control ${
                                touched.code && errors.code ? "is-invalid" : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="code"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="promoDiscount"
                              className="font-weight-bold"
                            >
                              Diskon
                            </label>
                            <Field
                              type="number"
                              id="promoDiscount"
                              name="discount"
                              className={`form-control ${
                                touched.discount && errors.discount
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="discount"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="promoDescription"
                              className="font-weight-bold"
                            >
                              Deskripsi
                            </label>
                            <Field
                              as="textarea"
                              id="promoDescription"
                              name="description"
                              className={`form-control ${
                                touched.description && errors.description
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="description"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="promoExpDate"
                              className="font-weight-bold"
                            >
                              Batas Berlaku
                            </label>
                            <Field
                              type="date"
                              id="promoExpDate"
                              name="expDate"
                              className={`form-control ${
                                touched.expDate && errors.expDate
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="expDate"
                              className="invalid-feedback"
                            />
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
  code: Yup.string()
    .uppercase("Gunakan huruf kapital")
    .required("Silahkan masukkan kode promo")
    .strict(true),
  discount: Yup.number().required("Silahkan masukkan nominal diskon")
});

export default DataSource(PromoAddForm);
