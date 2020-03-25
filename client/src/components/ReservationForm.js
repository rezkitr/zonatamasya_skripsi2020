import React, { Component } from "react";
import helpers from "../helperFunction";
import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OpenTripData from "../tripDataSource";

class ReservationForm extends Component {
  state = {
    currentStep: 1,
    promoData: null,
    promoValid: false
  };

  _next = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep >= 2 ? 3 : prevState.currentStep + 1
    }));
  };
  _prev = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep <= 1 ? 1 : prevState.currentStep - 1
    }));
  };

  getPromo = (promocode, paymentType) => {
    let ignoreCasePromo = promocode.toUpperCase();

    if (ignoreCasePromo.length > 0) {
      axios
        .get(`http://localhost:4000/promo/${ignoreCasePromo}`)
        .then(res => {
          this.setState({ promoData: res.data });
        })
        .then(() => {
          if (this.state.promoData && this.state.promoData.length > 0) {
            let now = new Date();
            let expDate = new Date(this.state.promoData[0].expDate);

            if (paymentType === "LUNAS") {
              if (this.state.promoData[0].tripId === this.props.tripId) {
                if (now <= expDate) {
                  this.setState({ promoValid: true });
                  toast.success("Berhasil menggunakan promo", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                  });
                } else {
                  toast.warn("Promo telah berakhir", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                  });
                }
              } else {
                toast.warn("Promo tidak berlaku untuk open trip ini", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true
                });
              }
            } else {
              toast.info("Promo hanya berlaku untuk pembayaran LUNAS", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              });
            }
          } else {
            toast.error("Tidak dapat menemukan promo", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true
            });
          }
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ promoData: null });
    }
  };

  getDiscount() {
    if (this.state.promoValid) {
      return this.state.promoData[0].discount;
    } else {
      return 0;
    }
  }

  render() {
    // predefined field
    let tripId = "";
    let tripName = "";
    let tripStart = "";
    let mepo = [];
    let tripSched = [];
    let formImage = "";
    let priceFull = 0;
    let priceDP = 0;

    this.props.tripData.map(item => {
      if (item._id === this.props.tripId) {
        tripId = item._id;
        tripName = item.name;
        tripStart = item.departure.start;
        mepo = item.departure.mepo;
        tripSched = item.schedule;
        formImage = item.cardImage;
        priceFull = item.price.priceFull;
        priceDP = item.price.priceDP;
      }
    });

    return (
      <div className="container-fluid reservation-form">
        <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <div className="card">
              <img
                className="card-img-top"
                src={
                  process.env.PUBLIC_URL + "/upload/opentripImg/" + formImage
                }
                alt={formImage}
              />
              <div className="card-body px-5 py-3">
                <Formik
                  enableReinitialize
                  initialValues={{
                    tripId: tripId,
                    tripName: tripName.toUpperCase(),
                    tripStart: tripStart.toUpperCase(),
                    mepo: "".toUpperCase(),
                    reservationDate: new Date().toDateString(),
                    tripDate: "",
                    totalParticipant: 0,
                    participant: {
                      coordinator: {
                        coorName: "".toUpperCase(),
                        coorGender: "L",
                        coorTelp: "",
                        coorEmail: ""
                      },
                      member: []
                    },
                    payment: {
                      type: "",
                      amount: 0
                    },
                    promoCode: "".toUpperCase()
                  }}
                  validationSchema={ValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      axios
                        .post("http://localhost:4000/reservation/add", values)
                        .then(res => alert(res.data))
                        .catch(err => alert(err));
                      setSubmitting(false);
                    }, 200);
                  }}
                >
                  {({ errors, touched, values, isSubmitting }) => (
                    <Form>
                      {this.state.currentStep === 1 ? (
                        <div>
                          <h4 className="text-center font-weight-bold ">#1</h4>
                          <h6 className="text-center text-muted">
                            Detail Open Trip
                          </h6>
                          <hr className="mb-4" />

                          <div className="form-group row">
                            <label htmlFor="tripName" className="col-md-3">
                              Open Trip
                            </label>
                            <div className="col-md">
                              <Field
                                type="text"
                                id="tripName"
                                name="tripName"
                                disabled
                                className={`form-control ${
                                  touched.tripName && errors.tripName
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="tripName"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="tripStart"
                              className="col-md-3 col-form-label"
                            >
                              Start
                            </label>
                            <div className="col-md">
                              <Field
                                type="text"
                                id="tripStart"
                                name="tripStart"
                                disabled
                                className={`form-control ${
                                  touched.tripStart && errors.tripStart
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="tripStart"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="mepo"
                              className="col-md-3 col-form-label"
                            >
                              Meeting Point
                            </label>
                            <div className="col-md-5">
                              <Field
                                as="select"
                                id="mepo"
                                name="mepo"
                                className={`custom-select ${
                                  touched.mepo && errors.mepo
                                    ? "is-invalid"
                                    : ""
                                }`}
                              >
                                <option value="" disabled>
                                  Pilih Meeting Point
                                </option>
                                {mepo.map(item => {
                                  return (
                                    <option value={item.toUpperCase()}>
                                      {item}
                                    </option>
                                  );
                                })}
                              </Field>
                              <ErrorMessage
                                component="div"
                                name="mepo"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="tripDate"
                              className="col-md-3 col-form-label"
                            >
                              Tanggal
                            </label>
                            <div className="col-md-5">
                              <Field
                                as="select"
                                id="tripDate"
                                name="tripDate"
                                className={`custom-select ${
                                  touched.tripDate && errors.tripDate
                                    ? "is-invalid"
                                    : ""
                                }`}
                              >
                                <option value="" disabled>
                                  Pilih Tanggal Keberangkatan
                                </option>
                                {tripSched.map(item => {
                                  let now = new Date("12/12/2019");
                                  let dateTemp = new Date(item);
                                  if (dateTemp >= now) {
                                    return (
                                      <option value={item}>
                                        {helpers.formatDate(item)}
                                      </option>
                                    );
                                  }
                                })}
                              </Field>
                              <ErrorMessage
                                component="div"
                                name="tripDate"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="text-right">
                            <button
                              type="button"
                              className="btn btn-sm btn-success font-weight-bold"
                              style={{ fontSize: "14px" }}
                              onClick={this._next}
                            >
                              SELANJUTNYA
                              <i className="fas fa-angle-right ml-2"></i>
                            </button>
                          </div>
                        </div>
                      ) : this.state.currentStep === 2 ? (
                        <div>
                          <h4 className="text-center font-weight-bold ">#2</h4>
                          <h6 className="text-center text-muted">
                            Detail Peserta
                          </h6>
                          <hr className="mb-4" />

                          <p className="font-weight-bold">
                            PEMESAN/KOORDINATOR
                          </p>

                          <div className="form-group row">
                            <label
                              htmlFor="coorName"
                              className="col-md-3 col-form-label"
                            >
                              nama lengkap
                            </label>
                            <div className="col-md">
                              <Field
                                type="text"
                                id="coorName"
                                name="participant.coordinator.coorName"
                                className={`form-control ${
                                  getIn(
                                    errors,
                                    "participant.coordinator.coorName"
                                  ) &&
                                  getIn(
                                    touched,
                                    "participant.coordinator.coorName"
                                  )
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="participant.coordinator.coorName"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="coorEmail"
                              className="col-md-3 col-form-label"
                            >
                              email
                            </label>
                            <div className="col-md">
                              <Field
                                type="email"
                                id="coorEmail"
                                name="participant.coordinator.coorEmail"
                                className={`form-control ${
                                  getIn(
                                    errors,
                                    "participant.coordinator.coorEmail"
                                  ) &&
                                  getIn(
                                    touched,
                                    "participant.coordinator.coorEmail"
                                  )
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="participant.coordinator.coorEmail"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="coorTelp"
                              className="col-md-3 col-form-label"
                            >
                              no. HP
                            </label>
                            <div className="col-md-4">
                              <Field
                                type="text"
                                id="coorTelp"
                                name="participant.coordinator.coorTelp"
                                className={`form-control ${
                                  getIn(
                                    errors,
                                    "participant.coordinator.coorTelp"
                                  ) &&
                                  getIn(
                                    touched,
                                    "participant.coordinator.coorTelp"
                                  )
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="participant.coordinator.coorTelp"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="coorGender"
                              className="col-md-3 col-form-label"
                            >
                              jenis kelamin
                            </label>
                            <div className="col-md-2">
                              <Field
                                as="select"
                                id="coorGender"
                                name="participant.coordinator.coorGender"
                                className={`custom-select ${
                                  getIn(
                                    errors,
                                    "participant.coordinator.coorGender"
                                  ) &&
                                  getIn(
                                    touched,
                                    "participant.coordinator.coorGender"
                                  )
                                    ? "is-invalid"
                                    : ""
                                }`}
                              >
                                <option value="L" selected>
                                  L
                                </option>
                                <option value="P">P</option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                name="participant.coordinator.coorGender"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                          <p className="font-weight-bold mt-5">DATA PESERTA</p>
                          <FieldArray
                            name="participant.member"
                            render={arrayHelpers => (
                              <div>
                                {values.participant.member.length > 0
                                  ? values.participant.member.map(
                                      (item, index) => {
                                        return (
                                          <div key={index}>
                                            <div className="form-row align-items-center">
                                              <div className="col-md-5">
                                                <label
                                                  htmlFor={`memberName${index}`}
                                                >
                                                  Nama Lengkap
                                                </label>
                                              </div>
                                              <div className="col-md-2">
                                                <label
                                                  htmlFor={`memberGender${index}`}
                                                >
                                                  Jenis Kelamin
                                                </label>
                                              </div>
                                              <div className="col-md-4">
                                                <label
                                                  htmlFor={`memberTelp${index}`}
                                                >
                                                  No. HP
                                                </label>
                                              </div>
                                            </div>
                                            <div className="form-row align-items-center">
                                              <div
                                                className="col-md-5"
                                                key={index}
                                              >
                                                <Field
                                                  type="text"
                                                  id={`memberName${index}`}
                                                  name={`participant.member[${index}].memberName`}
                                                  className="form-control"
                                                />
                                              </div>
                                              <div className="col-md-2">
                                                <Field
                                                  as="select"
                                                  id={`memberGender${index}`}
                                                  name={`participant.member[${index}].memberGender`}
                                                  className="custom-select"
                                                >
                                                  <option value="L" selected>
                                                    L
                                                  </option>
                                                  <option value="P">P</option>
                                                </Field>
                                              </div>
                                              <div className="col-md-4">
                                                <Field
                                                  type="text"
                                                  id={`memberTelp${index}`}
                                                  name={`participant.member[${index}].memberTelp`}
                                                  className="form-control"
                                                />
                                              </div>
                                              <div className="col-md">
                                                <a
                                                  className="text-danger"
                                                  onClick={() =>
                                                    arrayHelpers.remove(index)
                                                  }
                                                >
                                                  <i className="fas fa-times fa-lg ml-4"></i>
                                                </a>
                                              </div>
                                            </div>

                                            <div className="form-row mt-1 mb-3">
                                              <div className="col-5">
                                                <ErrorMessage
                                                  component="div"
                                                  name={`participant.member[${index}].memberName`}
                                                  className="my-invalid-feedback"
                                                />
                                              </div>
                                              <div className="col-md-2">
                                                <ErrorMessage
                                                  component="div"
                                                  name={`participant.member[${index}].memberGender`}
                                                  className="my-invalid-feedback"
                                                />
                                              </div>
                                              <div className="col-md-4">
                                                <ErrorMessage
                                                  component="div"
                                                  name={`participant.member[${index}].memberTelp`}
                                                  className="my-invalid-feedback"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )
                                  : null}

                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      memberName: "",
                                      memberGender: "L",
                                      memberTelp: ""
                                    })
                                  }
                                >
                                  <i className="fas fa-plus fa-lg"></i>
                                </button>
                              </div>
                            )}
                          ></FieldArray>
                          <div className="text-right">
                            <button
                              type="button"
                              className="btn btn-sm btn-cyan font-weight-bold"
                              style={{ fontSize: "14px" }}
                              onClick={this._prev}
                            >
                              <i className="fas fa-angle-left mr-2"></i> KEMBALI
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-success font-weight-bold"
                              style={{ fontSize: "14px" }}
                              onClick={this._next}
                            >
                              SELANJUTNYA
                              <i className="fas fa-angle-right ml-2"></i>
                            </button>
                          </div>
                          <div className="d-none">
                            {
                              (values.totalParticipant =
                                values.participant.member.length + 1)
                            }
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4 className="text-center font-weight-bold ">#3</h4>
                          <h6 className="text-center text-muted">Checkout</h6>
                          <hr className="mb-4" />

                          <p className="font-weight-bold mt-3">
                            DETAIL OPEN TRIP
                          </p>
                          <div className="form-group row">
                            <label
                              htmlFor="tripName"
                              className="col-md-3 col-form-label text-muted"
                            >
                              Open Trip
                            </label>
                            <div className="col-md">
                              <input
                                type="text"
                                className="form-control-plaintext checkout-field"
                                id="tripName"
                                readOnly
                                value={values.tripName}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="tripDate"
                              className="col-md-3 col-form-label text-muted"
                            >
                              Tanggal
                            </label>
                            <div className="col-md">
                              <input
                                type="text"
                                className="form-control-plaintext checkout-field"
                                id="tripDate"
                                readOnly
                                value={helpers
                                  .formatDate(values.tripDate)
                                  .toUpperCase()}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="tripStart"
                              className="col-md-3 col-form-label text-muted"
                            >
                              Start
                            </label>
                            <div className="col-md">
                              <input
                                type="text"
                                className="form-control-plaintext checkout-field"
                                id="tripStart"
                                readOnly
                                value={values.tripStart}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="mepo"
                              className="col-md-3 col-form-label text-muted"
                            >
                              Meeting Point
                            </label>
                            <div className="col-md">
                              <input
                                type="text"
                                className="form-control-plaintext checkout-field"
                                id="mepo"
                                readOnly
                                value={values.mepo}
                              />
                            </div>
                          </div>

                          <p className="font-weight-bold mt-5">
                            DETAIL PEMESAN & PESERTA
                          </p>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="card mb-3">
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item text-secondary">
                                    <strong>
                                      {values.participant.coordinator.coorName}
                                    </strong>
                                    {values.participant.coordinator
                                      .coorGender === "L" ? (
                                      <i className="fas fa-mars fa-lg ml-2"></i>
                                    ) : (
                                      <i className="fas fa-venus fa-lg ml-2"></i>
                                    )}
                                  </li>
                                  <li className="list-group-item">
                                    {values.participant.coordinator.coorTelp}
                                  </li>
                                  <li className="list-group-item email-part">
                                    {values.participant.coordinator.coorEmail}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {values.participant.member &&
                            values.participant.member.length > 0
                              ? values.participant.member.map((item, index) => {
                                  return (
                                    <div className="col-md-4">
                                      <div className="card mb-3">
                                        <ul className="list-group list-group-flush">
                                          <li className="list-group-item">
                                            <strong>{item.memberName}</strong>
                                            {item.memberGender === "L" ? (
                                              <i className="fas fa-mars fa-lg ml-2"></i>
                                            ) : (
                                              <i className="fas fa-venus fa-lg ml-2"></i>
                                            )}
                                          </li>
                                          <li className="list-group-item">
                                            {item.memberTelp}
                                          </li>
                                          <li className="list-group-item email-part">
                                            -
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>

                          <div className="row">
                            <div className="col-md">
                              <p className="font-weight-bold mt-5">
                                PEMBAYARAN
                              </p>
                              <div className="form-row align-items-center ">
                                <div className="col-md">
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <Field
                                      type="radio"
                                      id="payDP"
                                      name="payment.type"
                                      value="DP"
                                      checked={
                                        values.payment.type === "DP"
                                          ? (values.payment.amount =
                                              values.totalParticipant * priceDP)
                                          : false
                                      }
                                      className="custom-control-input"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="payDP"
                                    >
                                      <h4>
                                        <span className="badge badge-warning">
                                          DP
                                        </span>
                                      </h4>
                                    </label>
                                  </div>
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <Field
                                      type="radio"
                                      id="payFull"
                                      name="payment.type"
                                      value="LUNAS"
                                      checked={
                                        (values.payment.type === "LUNAS" &&
                                          this.state.promoData == null) ||
                                        (values.payment.type === "LUNAS" &&
                                          this.state.promoData &&
                                          this.state.promoData.length == 0)
                                          ? (values.payment.amount =
                                              values.totalParticipant *
                                              priceFull)
                                          : values.payment.type === "LUNAS" &&
                                            this.state.promoData &&
                                            this.state.promoData.length > 0
                                          ? (values.payment.amount =
                                              values.totalParticipant *
                                                priceFull -
                                              this.getDiscount())
                                          : false
                                      }
                                      className="custom-control-input"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="payFull"
                                    >
                                      <h4>
                                        <span className="badge badge-secondary">
                                          LUNAS
                                        </span>
                                      </h4>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-md">
                                  <h2 className="font-weight-bold">
                                    Rp
                                    {helpers.priceFormat(values.payment.amount)}
                                  </h2>
                                </div>
                              </div>
                              <ErrorMessage
                                component="div"
                                name="payment.type"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="col-md">
                              <p className="font-weight-bold mt-5">
                                KODE PROMO*
                              </p>
                              <div className="input-group">
                                <Field
                                  type="text"
                                  name="promoCode"
                                  placeholder="Masukkan Kode Promo"
                                  className="form-control"
                                />
                                <div className="input-group-append">
                                  <button
                                    type="button"
                                    className="btn btn-md btn-amber rounded-right m-0 px-3 py-2 z-depth-0 font-weight-bold"
                                    onClick={() =>
                                      this.getPromo(
                                        values.promoCode,
                                        values.payment.type
                                      )
                                    }
                                  >
                                    APPLY
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <small
                              id="passwordHelpBlock"
                              className="form-text text-muted mt-0"
                            >
                              *Promo hanya berlaku untuk pembayaran LUNAS
                            </small>
                          </div>
                          <div className="text-right">
                            <button
                              type="button"
                              className="btn btn-sm btn-cyan font-weight-bold"
                              style={{ fontSize: "14px" }}
                              onClick={this._prev}
                            >
                              <i className="fas fa-angle-left mr-2"></i> KEMBALI
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-success font-weight-bold"
                              style={{ fontSize: "14px" }}
                              onClick={this._next}
                            >
                              CHECK OUT
                              <i className="fas fa-angle-right ml-2"></i>
                            </button>
                            <button type="submit">
                              {isSubmitting ? "Loading..." : "Submit"}
                            </button>
                          </div>
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ValidationSchema = Yup.object().shape({
  tripName: Yup.string().required(),
  tripStart: Yup.string().required(),
  mepo: Yup.string()
    .required("Silahkan pilih lokasi meeting point")
    .notOneOf([""]),
  tripDate: Yup.string()
    .required("Silahkan pilih tanggal keberangkatan")
    .notOneOf([""]),
  participant: Yup.object().shape({
    coordinator: Yup.object().shape({
      coorName: Yup.string().required("Silahkan masukkan nama lengkap anda"),
      coorGender: Yup.string().oneOf(["L", "P"], "Invalid"),
      coorTelp: Yup.string().required("Silahkan masukkan No. HP anda"),
      coorEmail: Yup.string()
        .email("Bukan sebuah email")
        .required("Silahkan masukkan email anda")
    }),
    member: Yup.array().of(
      Yup.object().shape({
        memberName: Yup.string().required(
          "Silahkan masukkan nama lengkap peserta"
        ),
        memberGender: Yup.string().oneOf(["L", "P"], "Invalid"),
        memberTelp: Yup.string().required("Silahkan masukkan No. HP peserta")
      })
    )
  }),
  payment: Yup.object().shape({
    type: Yup.string()
      .required("Silahkan pilih salah satu jenis pembayaran")
      .oneOf(["DP", "LUNAS"])
  })
});

export default OpenTripData(ReservationForm);
