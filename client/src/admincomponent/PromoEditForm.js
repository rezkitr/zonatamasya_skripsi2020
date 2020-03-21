import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
      <div className="container-fluid">
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
                      discount: this.state.promo.discount
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log(JSON.stringify(values, null, 2));
                      setTimeout(() => {
                        axios
                          .post(
                            `http://localhost:4000/promo/update/${this.props.promoId}`,
                            values
                          )
                          .then(res =>
                            confirmAlert({
                              title: "Update Promo",
                              message: "Data Promo Berhasil Diupdate",
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
                                htmlFor="promoCode"
                                className="font-weight-bold"
                              >
                                Kode
                              </label>
                            </div>
                            <div className="form-group col-md-3">
                              <label
                                htmlFor="promoDiscount"
                                className="font-weight-bold"
                              >
                                Diskon
                              </label>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md">
                              <Field
                                type="text"
                                id="promoCode"
                                name="code"
                                className={`form-control ${
                                  touched.code && errors.code
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="code"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group col-md-3">
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
    .required("Silahkan masukkan kode promo")
    .uppercase("Gunakan huruf kapital"),
  discount: Yup.number()
    .min(1, "Min. 1")
    .required("Silahkan masukkan nominal diskon (%)")
});

export default PromoEditForm;
