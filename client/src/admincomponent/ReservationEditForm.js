import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import { confirmAlert } from "react-confirm-alert";
import helpers from "../helperFunction";

class ReservationEditForm extends Component {
  state = {
    rsv: null,
    opentrip: null
  };

  componentDidMount() {
    axios
      .get(`/reservation/${this.props.rsvId}`)
      .then(res => {
        this.setState({ rsv: res.data }, () => {
          axios
            .get(`/opentrip/${this.state.rsv.tripId}`)
            .then(res => {
              this.setState({ opentrip: res.data });
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return this.state.rsv && this.state.opentrip ? (
      <div className="container my-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-10">
            <Link to="/admin">
              <p className="h5 text-dark">
                <i className="fas fa-angle-left mr-2"></i>KEMBALI
              </p>
            </Link>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-md-10">
            <div className="card">
              <div className="px-3">
                <i className="far fa-edit fa-lg primary-color z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                <div className="float-right text-right p-3">
                  <p className="text-muted mb-1">
                    <small>Edit Data Reservasi</small>
                  </p>
                  <h6 className="text-right muted">
                    Reservation ID : {this.state.rsv.orderId}
                  </h6>
                </div>
              </div>
              <div className="card-body p-5">
                <Formik
                  enableReinitialize
                  initialValues={{
                    tripName: this.state.rsv.tripName,
                    tripStart: this.state.rsv.tripStart,
                    mepo: this.state.rsv.mepo,
                    reservationDate: this.state.rsv.reservationDate,
                    tripDate: this.state.rsv.tripDate,
                    totalParticipant: this.state.rsv.totalParticipant,
                    participant: {
                      coordinator: {
                        coorName: this.state.rsv.participant.coordinator
                          .coorName,
                        coorGender: this.state.rsv.participant.coordinator
                          .coorGender,
                        coorTelp: this.state.rsv.participant.coordinator
                          .coorTelp,
                        coorEmail: this.state.rsv.participant.coordinator
                          .coorEmail
                      },
                      member: this.state.rsv.participant.member
                    },
                    payment: {
                      type: this.state.rsv.payment.type,
                      amount: this.state.rsv.payment.amount
                    }
                  }}
                  validationSchema={ValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    axios
                      .post(`/reservation/update/${this.props.rsvId}`, values)
                      .then(res =>
                        confirmAlert({
                          title: "Update Reservasi",
                          message: "Data Reservasi Berhasil Diupdate",
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
                  }}
                >
                  {({ values, errors, touched, isSubmitting }) => (
                    <Form>
                      <div>
                        <hr />
                        <div className="form-group row">
                          <label
                            htmlFor="tripName"
                            className="col-sm-2 col-md-4 col-form-label font-weight-bold"
                          >
                            Open Trip
                          </label>
                          <div className="col-sm-10 col-md-8">
                            <Field
                              type="text"
                              id="tripName"
                              name="tripName"
                              readOnly
                              className="form-control-plaintext"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="tripStart"
                            className="col-sm-2 col-md-4 col-form-label font-weight-bold"
                          >
                            Start
                          </label>
                          <div className="col-sm-10 col-md-8">
                            <Field
                              type="text"
                              id="tripStart"
                              name="tripStart"
                              readOnly
                              className="form-control-plaintext"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="mepo"
                            className="col-sm-2 col-md-4 col-form-label font-weight-bold"
                          >
                            Meeting Point
                          </label>
                          <div className="col-sm-10 col-md-8">
                            <Field
                              as="select"
                              id="mepo"
                              name="mepo"
                              className="custom-select"
                            >
                              {this.state.opentrip && this.state.rsv
                                ? this.state.opentrip.departure.mepo.map(
                                    item => {
                                      return item.toUpperCase() ===
                                        this.state.rsv.mepo ? (
                                        <option
                                          value={item.toUpperCase()}
                                          selected
                                        >
                                          {item}
                                        </option>
                                      ) : (
                                        <option value={item.toUpperCase()}>
                                          {item}
                                        </option>
                                      );
                                    }
                                  )
                                : null}
                            </Field>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="tripDateTemp"
                            className="col-sm-2 col-md-4 col-form-label font-weight-bold"
                          >
                            Tgl. Keberangkatan
                          </label>
                          <div className="col-sm-10 col-md-8">
                            <Field
                              as="select"
                              id="tripDateTemp"
                              name="tripDate"
                              className="custom-select"
                            >
                              {this.state.opentrip && this.state.rsv
                                ? this.state.opentrip.schedule.map(item => {
                                    return item === this.state.rsv.tripDate ? (
                                      <option value={item} selected>
                                        {helpers.formatDate(item)}
                                      </option>
                                    ) : (
                                      <option value={item}>
                                        {helpers.formatDate(item)}
                                      </option>
                                    );
                                  })
                                : null}
                            </Field>
                          </div>
                        </div>
                        <hr />
                        <div className="form-row">
                          <div className="form-group col-md-5">
                            <label
                              htmlFor="coorName"
                              className="font-weight-bold"
                            >
                              Pemesan
                            </label>
                            <Field
                              type="text"
                              id="coorName"
                              name="participant.coordinator.coorName"
                              readOnly
                              className="form-control-plaintext"
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label
                              htmlFor="coorTelp"
                              className="font-weight-bold"
                            >
                              No. HP
                            </label>
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
                          <div className="form-group col-md">
                            <label
                              htmlFor="coorEmail"
                              className="font-weight-bold"
                            >
                              Email
                            </label>
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
                        <hr />
                        {values.participant.member.length > 0 ? (
                          <div className="form-row">
                            <div className="form-group col-md">
                              <label className="font-weight-bold">
                                Peserta
                              </label>
                            </div>
                            <div className="form-group col-md-2">
                              <label className="font-weight-bold">L/P</label>
                            </div>
                            <div className="form-group col-md">
                              <label className="font-weight-bold">No. HP</label>
                            </div>
                          </div>
                        ) : null}

                        <FieldArray
                          name="participant.member"
                          render={arrayHelpers => (
                            <div>
                              {values.participant.member.length > 0 ? (
                                values.participant.member.map((item, index) => {
                                  return (
                                    <div key={index}>
                                      <div className="form-row">
                                        <div className="form-group col-md">
                                          <Field
                                            type="text"
                                            id="memberName"
                                            name={`participant.member[${index}].memberName`}
                                            className="form-control"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            name={`participant.member[${index}].memberName`}
                                            className="my-invalid-feedback"
                                          />
                                        </div>
                                        <div className="form-group col-md-2">
                                          <Field
                                            as="select"
                                            id={`memberGender${index}`}
                                            name={`participant.member[${index}].memberGender`}
                                            className="custom-select"
                                          >
                                            <option value="L">L</option>
                                            <option value="P">P</option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            name={`participant.member[${index}].memberGender`}
                                            className="my-invalid-feedback"
                                          />
                                        </div>
                                        <div className="form-group col-md">
                                          <Field
                                            type="text"
                                            id="memberTelp"
                                            name={`participant.member[${index}].memberTelp`}
                                            className="form-control"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            name={`participant.member[${index}].memberTelp`}
                                            className="my-invalid-feedback"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <h1>-</h1>
                              )}
                            </div>
                          )}
                        ></FieldArray>
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
  participant: Yup.object().shape({
    coordinator: Yup.object().shape({
      coorName: Yup.string().required("Silahkan masukkan nama lengkap anda"),
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
  })
});

export default ReservationEditForm;
