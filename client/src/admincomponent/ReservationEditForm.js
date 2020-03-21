import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from "formik";
import { confirmAlert } from "react-confirm-alert";

class ReservationEditForm extends Component {
  state = {
    rsv: null
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/reservation/${this.props.rsvId}`)
      .then(res => {
        this.setState({ rsv: res.data });
      })
      .catch(err => console.log(err));
  }

  formatDate(strDate) {
    let months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];

    let dateTemp = new Date(strDate);
    let monthIndex = dateTemp.getMonth();
    let monthName = months[monthIndex];
    let day = dateTemp.getDate().toString();
    let year = dateTemp.getFullYear();

    if (day.length < 2) {
      day = `0${day}`;
    }
    let formattedDate = `${day} ${monthName} ${year}`;
    return formattedDate;
  }

  render() {
    return (
      <div className="container">
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
                    Reservation ID : {this.props.rsvId}
                  </h6>
                </div>
              </div>
              <div className="card-body p-5">
                {this.state.rsv && this.state.rsv.length > 0 ? (
                  <Formik
                    enableReinitialize
                    initialValues={{
                      tripName: this.state.rsv[0].tripName,
                      tripStart: this.state.rsv[0].tripStart,
                      mepo: this.state.rsv[0].mepo,
                      reservationDate: this.state.rsv[0].reservationDate,
                      tripDate: this.state.rsv[0].tripDate,
                      totalParticipant: this.state.rsv[0].totalParticipant,
                      participant: {
                        coordinator: {
                          coorName: this.state.rsv[0].participant.coordinator
                            .coorName,
                          coorGender: this.state.rsv[0].participant.coordinator
                            .coorGender,
                          coorTelp: this.state.rsv[0].participant.coordinator
                            .coorTelp,
                          coorEmail: this.state.rsv[0].participant.coordinator
                            .coorEmail
                        },
                        member: this.state.rsv[0].participant.member
                      },
                      payment: {
                        type: this.state.rsv[0].payment.type,
                        amount: this.state.rsv[0].payment.amount
                      }
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log(JSON.stringify(values, null, 2));
                      setTimeout(() => {
                        axios
                          .post(
                            `http://localhost:4000/reservation/update/${this.props.rsvId}`,
                            values
                          )
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
                      }, 200);
                    }}
                  >
                    {({ values, isSubmitting }) => (
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
                                type="text"
                                id="mepo"
                                name="mepo"
                                readOnly
                                className="form-control-plaintext"
                              />
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
                                type="text"
                                id="tripDateTemp"
                                name="tripDateTemp"
                                value={this.formatDate(values.tripDate)}
                                readOnly
                                className="form-control-plaintext"
                              />
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
                                readOnly
                                className="form-control-plaintext"
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
                                readOnly
                                className="form-control-plaintext"
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
                                <label className="font-weight-bold">
                                  No. HP
                                </label>
                              </div>
                            </div>
                          ) : null}

                          <FieldArray
                            name="participant.member"
                            render={arrayHelpers => (
                              <div>
                                {values.participant.member.length > 0 ? (
                                  values.participant.member.map(
                                    (item, index) => {
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
                                            </div>
                                            <div className="form-group col-md">
                                              <Field
                                                type="text"
                                                id="memberTelp"
                                                name={`participant.member[${index}].memberTelp`}
                                                className="form-control"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )
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
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationEditForm;
