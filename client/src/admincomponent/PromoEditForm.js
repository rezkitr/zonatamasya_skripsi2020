import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

class PromoEditForm extends Component {
  state = {
    promo: null
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/promo/id/${this.props.promoId}`)
      .then(res => {
        this.setState({
          promo: res.data
        });
      })
      .catch(err => console.log(err));
  }

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
                <i className="far fa-edit fa-lg primary-color z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                <div className="float-right text-right p-3">
                  <p className="text-muted mb-1">
                    <small>Edit Data Promo</small>
                  </p>
                </div>
              </div>
              <div className="card-body p-5">
                {this.state.promo ? (
                  <Formik
                    enableReinitialize
                    initialValues={{
                      code: this.state.promo.code,
                      discount: this.state.promo.discount,
                      description: this.state.promo.description,
                      expDate: this.state.promo.expDate,
                      tripId: this.state.promo.tripId
                    }}
                    validationSchema={ValidationSchema}
                    validateOnBlur={false}
                    onSubmit={(values, { setSubmitting }) => {
                      axios
                        .post(
                          `http://localhost:4000/promo/update/${this.props.promoId}`,
                          values
                        )
                        .then(res => {
                          confirmAlert({
                            title: "Update Promo",
                            message: "Data Promo Berhasil Diupdate",
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
                            className="btn btn-sm btn-success"
                            type="submit"
                          >
                            <i className="far fa-save mr-2"></i>SIMPAN
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                ) : null}
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
  discount: Yup.number()
    .required("Silahkan masukkan nominal diskon")
    .min(0),
  description: Yup.string().required("Silahkan masukkan deskripsi promo"),
  expDate: Yup.string().required("Silahkan pilih tanggal batas berlaku promo"),
  tripId: Yup.string()
    .required("Silahkan pilih open trip")
    .notOneOf([""])
});

export default PromoEditForm;
