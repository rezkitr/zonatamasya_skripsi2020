import React, { Component } from "react";
import helpers from "../helperFunction";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import axios from "axios";

class OpenTripAddForm extends Component {
  state = {
    keywordTemp: "",
    highlightedTemp: "",
    mepoTemp: "",
    scheduleTemp: "",
    facilityTemp: "",
    itineraryDay: [],
    itineraryItem: "",
    splittedItineraryItem: [],
    dayCounter: 0,
    cardImage: null,
    bannerImage: null,
    submitting: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSelectImage = event => {
    const { name, files } = event.target;
    this.setState({
      [name]: files[0]
    });
  };

  addDay = () => {
    this.setState({
      dayCounter: this.state.dayCounter + 1
    });
  };

  handleItineraryInput = event => {
    this.setState({ itineraryItem: event.target.value }, () => {
      this.splitItineraryItem(this.state.itineraryItem);
    });
  };

  splitItineraryItem = item => {
    if (this.state.itineraryItem.length > 0) {
      let result = item.split("\n");
      this.setState({ splittedItineraryItem: result });
    }
  };

  render() {
    return (
      <div className="container-fluid my-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <Link to="/admin">
              <p className="h5 text-dark">
                <i className="fas fa-angle-left mr-2"></i>KEMBALI
              </p>
            </Link>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="px-3">
                <i className="far fa-plus-square fa-lg light-green z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
                <div className="float-right text-right p-3">
                  <p className="text-muted mb-1">
                    <small>Tambah Data Open Trip</small>
                  </p>
                </div>
                <div
                  className="card-body mt-4 px-5 py-3"
                  style={{ textTransform: "none" }}
                >
                  <Formik
                    enableReinitialize
                    initialValues={{
                      name: "",
                      keyword: [],
                      region: "",
                      highlighted: false,
                      duration: "",
                      departure: {
                        start: "",
                        mepo: []
                      },
                      price: {
                        priceFull: 0,
                        priceDP: 0
                      },
                      schedule: [],
                      itinerary: [],
                      facility: []
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      const data = new FormData();
                      data.append("cardImage", this.state.cardImage);
                      data.append("bannerImage", this.state.bannerImage);
                      data.append("name", values.name);
                      data.append("keyword", JSON.stringify(values.keyword));
                      data.append("region", values.region);
                      data.append("highlighted", values.highlighted);
                      data.append("duration", values.duration);
                      data.append(
                        "departure",
                        JSON.stringify(values.departure)
                      );
                      data.append("price", JSON.stringify(values.price));
                      data.append("schedule", JSON.stringify(values.schedule));
                      data.append(
                        "itinerary",
                        JSON.stringify(values.itinerary)
                      );
                      data.append("facility", JSON.stringify(values.facility));

                      const config = {
                        headers: {
                          "Content-Type": "multipart/form-data"
                        }
                      };

                      axios
                        .post(
                          "http://localhost:4000/opentrip/add",
                          data,
                          config
                        )
                        .then(res => {
                          alert("sukses");
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }}
                  >
                    {({ errors, touched, values, isSubmitting }) => (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="name" className="font-weight-bold">
                            Nama Open Trip
                          </label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${
                              touched.name && errors.name ? "is-invalid" : ""
                            }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="name"
                            className="invalid-feedback"
                          />
                        </div>

                        <FieldArray
                          name="keyword"
                          render={arrayHelpers => (
                            <div>
                              <div className="form-group">
                                <label
                                  htmlFor="keyword"
                                  className="font-weight-bold"
                                >
                                  Keyword
                                </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    name="keywordTemp"
                                    id="keyword"
                                    value={this.state.keywordTemp}
                                    className="form-control"
                                    onChange={this.handleChange}
                                  />

                                  <div className="input-group-append">
                                    <button
                                      className="btn btn-md btn-primary rounded-right m-0 px-3 py-2 z-depth-0 waves-effect"
                                      type="button"
                                      onClick={() => {
                                        if (this.state.keywordTemp.length > 0) {
                                          arrayHelpers.push(
                                            this.state.keywordTemp
                                          );
                                        }

                                        this.setState({ keywordTemp: "" });
                                      }}
                                    >
                                      <i className="fas fa-plus fa-lg mx-2"></i>
                                    </button>
                                  </div>
                                </div>
                                {values.keyword.length === 0 &&
                                this.state.submitting ? (
                                  <div className="pt-1">
                                    <p className="my-invalid-feedback">
                                      Silahkan masukkan keyword open trip
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                              {values.keyword && values.keyword.length > 0
                                ? values.keyword.map((item, index) => {
                                    return (
                                      <span className="badge badge-info p-2 p-2 mr-2 mb-2">
                                        {item}
                                        <a>
                                          <i
                                            className="fas fa-times text-danger ml-3"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          ></i>
                                        </a>
                                      </span>
                                    );
                                  })
                                : null}
                            </div>
                          )}
                        ></FieldArray>

                        <div className="form-group mt-4">
                          <label htmlFor="region" className="font-weight-bold">
                            Region
                          </label>
                          <Field
                            as="select"
                            id="region"
                            name="region"
                            className={`custom-select ${
                              touched.region && errors.region
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="" disabled>
                              -
                            </option>
                            <option value="jatim">Jawa Timur</option>
                            <option value="jateng">Jawa Tengah</option>
                            <option value="jabar">Jawa Barat</option>
                            <option value="jogja">Jogjakarta</option>
                            <option value="bali">Bali</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            name="region"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="form-group">
                          <label className="font-weight-bold">Highlight</label>
                          <br />
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="highlightyes"
                              name="highlightedTemp"
                              value="1"
                              checked={this.state.highlightedTemp === "1"}
                              onChange={this.handleChange}
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="highlightyes"
                            >
                              Ya
                            </label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="highlightno"
                              name="highlightedTemp"
                              value="0"
                              checked={this.state.highlightedTemp === "0"}
                              onChange={this.handleChange}
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="highlightno"
                            >
                              Tidak
                            </label>
                          </div>
                          {this.state.highlightedTemp === "" &&
                          this.state.submitting ? (
                            <div className="pt-1">
                              <p className="my-invalid-feedback">
                                Belum dipilih
                              </p>
                            </div>
                          ) : null}
                          <div className="d-none">
                            {this.state.highlightedTemp === "1"
                              ? (values.highlighted = true)
                              : (values.highlighted = false)}
                          </div>
                        </div>

                        <div className="form-row mt-4">
                          <div className="form-group col-md">
                            <label className="font-weight-bold">
                              Gambar Thumbnail Card
                            </label>
                            <input
                              type="file"
                              className="form-control-file"
                              name="cardImage"
                              id="cardImage"
                              onChange={this.handleSelectImage}
                            />
                            {this.state.cardImage === null &&
                            this.state.submitting ? (
                              <div className="pt-1">
                                <p className="my-invalid-feedback">
                                  Silahkan pilih file
                                </p>
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md">
                            <label className="font-weight-bold">
                              Gambar Banner
                            </label>
                            <input
                              type="file"
                              className="form-control-file"
                              name="bannerImage"
                              id="bannerImage"
                              onChange={this.handleSelectImage}
                            />
                            {this.state.bannerImage === null &&
                            this.state.submitting ? (
                              <div className="pt-1">
                                <p className="my-invalid-feedback">
                                  Silahkan pilih file
                                </p>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="duration"
                            className="font-weight-bold"
                          >
                            Durasi
                          </label>
                          <Field
                            type="text"
                            id="duration"
                            name="duration"
                            className={`form-control ${
                              touched.duration && errors.duration
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="duration"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="tripStart"
                            className="font-weight-bold"
                          >
                            Start
                          </label>
                          <Field
                            type="text"
                            id="tripStart"
                            name="departure.start"
                            className={`form-control ${
                              getIn(errors, "departure.start") &&
                              getIn(touched, "departure.start")
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="departure.start"
                            className="invalid-feedback"
                          />
                        </div>

                        <FieldArray
                          name="departure.mepo"
                          render={arrayHelpers => (
                            <div>
                              <div className="form-group">
                                <label
                                  htmlFor="tripMepo"
                                  className="font-weight-bold"
                                >
                                  Meeting Point
                                </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    name="mepoTemp"
                                    id="tripMepo"
                                    value={this.state.mepoTemp}
                                    className="form-control"
                                    onChange={this.handleChange}
                                  />
                                  <div className="input-group-append">
                                    <button
                                      className="btn btn-md btn-primary rounded-right m-0 px-3 py-2 z-depth-0 waves-effect"
                                      type="button"
                                      onClick={() => {
                                        if (this.state.mepoTemp.length > 0) {
                                          arrayHelpers.push(
                                            this.state.mepoTemp
                                          );
                                        }

                                        this.setState({ mepoTemp: "" });
                                      }}
                                    >
                                      <i className="fas fa-plus fa-lg mx-2"></i>
                                    </button>
                                  </div>
                                </div>
                                {values.departure.mepo.length === 0 &&
                                this.state.submitting ? (
                                  <div className="pt-1">
                                    <p className="my-invalid-feedback">
                                      Silahkan masukkan lokasi meeting point
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                              {values.departure.mepo &&
                              values.departure.mepo.length > 0
                                ? values.departure.mepo.map((item, index) => {
                                    return (
                                      <span className="badge badge-info p-2 mr-2 mb-2">
                                        {item}
                                        <a>
                                          <i
                                            className="fas fa-times text-danger ml-3"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          ></i>
                                        </a>
                                      </span>
                                    );
                                  })
                                : null}
                            </div>
                          )}
                        ></FieldArray>

                        <div className="form-row mt-4">
                          <div className="form-group col-md">
                            <label
                              htmlFor="priceFull"
                              className="font-weight-bold"
                            >
                              Harga Lunas
                            </label>
                            <Field
                              type="number"
                              id="priceFull"
                              name="price.priceFull"
                              className={`form-control ${
                                getIn(errors, "price.priceFull") &&
                                getIn(touched, "price.priceFull")
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="price.priceFull"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group col-md">
                            <label
                              htmlFor="priceDP"
                              className="font-weight-bold"
                            >
                              Harga DP
                            </label>
                            <Field
                              type="number"
                              id="priceDP"
                              name="price.priceDP"
                              className={`form-control ${
                                getIn(errors, "price.priceDP") &&
                                getIn(touched, "price.priceDP")
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="price.priceDP"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <FieldArray
                            name="schedule"
                            render={arrayHelpers => (
                              <div>
                                <div className="form-group">
                                  <label
                                    htmlFor="schedule"
                                    className="font-weight-bold"
                                  >
                                    Jadwal
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="date"
                                      name="scheduleTemp"
                                      id="schedule"
                                      value={this.state.scheduleTemp}
                                      className="form-control"
                                      onChange={this.handleChange}
                                    />
                                    <div className="input-group-append">
                                      <button
                                        className="btn btn-md btn-primary rounded-right m-0 px-3 py-2 z-depth-0 waves-effect"
                                        type="button"
                                        onClick={() => {
                                          if (
                                            this.state.scheduleTemp.length > 0
                                          ) {
                                            arrayHelpers.push(
                                              this.state.scheduleTemp
                                            );
                                          }
                                          this.setState({ scheduleTemp: "" });
                                        }}
                                      >
                                        <i className="fas fa-plus fa-lg mx-2"></i>
                                      </button>
                                    </div>
                                  </div>
                                  {values.schedule.length === 0 &&
                                  this.state.submitting ? (
                                    <div className="pt-1">
                                      <p className="my-invalid-feedback">
                                        Silahkan masukkan jadwal open trip
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
                                {values.schedule && values.schedule.length > 0
                                  ? values.schedule.map((item, index) => {
                                      return (
                                        <span className="badge badge-info p-2 p-2 mr-2 mb-2">
                                          {helpers.formatDate(item)}
                                          <a>
                                            <i
                                              className="fas fa-times text-danger ml-3"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            ></i>
                                          </a>
                                        </span>
                                      );
                                    })
                                  : null}
                              </div>
                            )}
                          ></FieldArray>
                        </div>

                        <div className="form-group">
                          <FieldArray
                            name="itinerary"
                            render={arrayHelpers => (
                              <div>
                                <div className="form-group">
                                  <label
                                    htmlFor="schedule"
                                    className="font-weight-bold"
                                  >
                                    Itinerary
                                  </label>
                                  <br />
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-success py-2 px-3 mr-3"
                                    onClick={() => {
                                      this.addDay();
                                      arrayHelpers.push(
                                        this.state.itineraryDay
                                      );
                                    }}
                                  >
                                    <i className="fas fa-plus fa-lg mr-2"></i>
                                    Hari
                                  </button>
                                  {values.itinerary.length === 0 &&
                                  this.state.submitting ? (
                                    <div className="pt-1">
                                      <p className="my-invalid-feedback">
                                        Silahkan masukkan itinerary
                                      </p>
                                    </div>
                                  ) : null}
                                  {values.itinerary.length > 0 ? (
                                    <>
                                      <label htmlFor="itineraryItem">
                                        Hari :{" "}
                                        <span
                                          className="badge badge-warning"
                                          style={{ fontSize: "20px" }}
                                        >
                                          {values.itinerary.length}
                                        </span>
                                      </label>
                                      <a
                                        data-toggle="modal"
                                        data-target="#itnmodal"
                                      >
                                        <i className="far fa-eye fa-lg text-info ml-3"></i>
                                      </a>
                                      <a
                                        onClick={() => {
                                          values.itinerary = [];
                                          this.setState({ dayCounter: 0 });
                                        }}
                                      >
                                        <i className="fas fa-redo text-secondary ml-3"></i>
                                      </a>
                                    </>
                                  ) : null}
                                  <br />

                                  <div
                                    className="modal fade"
                                    id="itnmodal"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="exampleModalCenterTitle"
                                    aria-hidden="true"
                                  >
                                    <div
                                      className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
                                      role="document"
                                    >
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h5
                                            className="modal-title"
                                            id="exampleModalLongTitle"
                                          >
                                            Itinerary
                                          </h5>
                                          <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            <span aria-hidden="true">
                                              &times;
                                            </span>
                                          </button>
                                        </div>
                                        <div className="modal-body">
                                          <table className="table table-sm mx-auto w-75">
                                            {values.itinerary.length > 0
                                              ? values.itinerary.map(
                                                  (item, index) => {
                                                    return (
                                                      <>
                                                        {values.itinerary[0]
                                                          .length > 0 ? (
                                                          <thead>
                                                            <tr>
                                                              <tr>
                                                                <th
                                                                  scope="col"
                                                                  className="font-weight-bold"
                                                                >
                                                                  <span
                                                                    className="badge badge-warning"
                                                                    style={{
                                                                      fontSize:
                                                                        "16px"
                                                                    }}
                                                                  >
                                                                    {`Hari ${index +
                                                                      1}`}
                                                                  </span>
                                                                </th>
                                                              </tr>
                                                            </tr>
                                                          </thead>
                                                        ) : null}

                                                        <tbody>
                                                          {item.map(i => {
                                                            return (
                                                              <tr>
                                                                <td>{i}</td>
                                                              </tr>
                                                            );
                                                          })}
                                                        </tbody>
                                                      </>
                                                    );
                                                  }
                                                )
                                              : null}
                                          </table>
                                        </div>
                                        <div className="modal-footer">
                                          <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            data-dismiss="modal"
                                          >
                                            Close
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <FieldArray
                                    name={`itinerary[${this.state.dayCounter -
                                      1}]`}
                                    render={arrayHelpers => (
                                      <div>
                                        {values.itinerary.length > 0 ? (
                                          <div className="form-group">
                                            <small className="form-text text-muted mt-3">
                                              Masukkan item itinerary untuk
                                              masing-masing hari
                                            </small>
                                            <small className="form-text text-muted">
                                              Format : waktu#kegiatan#keterangan
                                            </small>
                                            <small className="form-text text-muted mb-2">
                                              Setiap item ditempatkan pada baris
                                              baru (Enter) tanpa koma (,)
                                            </small>
                                            <div className="input-group">
                                              <textarea
                                                name="itineraryItem"
                                                id="itineraryItem"
                                                placeholder="06.30-07.00#Wisata di padang savanah#Photo session"
                                                value={this.state.itineraryItem}
                                                className="form-control"
                                                onChange={
                                                  this.handleItineraryInput
                                                }
                                              />
                                              <div className="input-group-append">
                                                <button
                                                  className="btn btn-md btn-primary rounded-right m-0 px-3 py-2 z-depth-0 waves-effect"
                                                  type="button"
                                                  onClick={() => {
                                                    this.state.splittedItineraryItem.map(
                                                      item => {
                                                        arrayHelpers.push(item);
                                                      }
                                                    );
                                                    this.setState({
                                                      itineraryItem: ""
                                                    });
                                                  }}
                                                >
                                                  <i className="fas fa-plus fa-lg mx-2"></i>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        ) : null}
                                      </div>
                                    )}
                                  ></FieldArray>
                                </div>
                              </div>
                            )}
                          ></FieldArray>
                        </div>
                        <div className="form-group">
                          <FieldArray
                            name="facility"
                            render={arrayHelpers => (
                              <div>
                                <div className="form-group">
                                  <label
                                    htmlFor="tripFacility"
                                    className="font-weight-bold"
                                  >
                                    Fasilitas
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      name="facilityTemp"
                                      id="tripFacility"
                                      value={this.state.facilityTemp}
                                      className="form-control"
                                      onChange={this.handleChange}
                                    />
                                    <div className="input-group-append">
                                      <button
                                        className="btn btn-md btn-primary rounded-right m-0 px-3 py-2 z-depth-0 waves-effect"
                                        type="button"
                                        onClick={() => {
                                          if (
                                            this.state.facilityTemp.length > 0
                                          ) {
                                            arrayHelpers.push(
                                              this.state.facilityTemp
                                            );
                                          }

                                          this.setState({ facilityTemp: "" });
                                        }}
                                      >
                                        <i className="fas fa-plus fa-lg mx-2"></i>
                                      </button>
                                    </div>
                                  </div>
                                  {values.facility.length === 0 &&
                                  this.state.submitting ? (
                                    <div className="pt-1">
                                      <p className="my-invalid-feedback">
                                        Silahkan masukkan itinerary
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
                                {values.facility && values.facility.length > 0
                                  ? values.facility.map((item, index) => {
                                      return (
                                        <span className="badge badge-info p-2 p-2 mr-2 mb-2">
                                          {item}
                                          <a>
                                            <i
                                              className="fas fa-times text-danger ml-3"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            ></i>
                                          </a>
                                        </span>
                                      );
                                    })
                                  : null}
                              </div>
                            )}
                          ></FieldArray>
                        </div>
                        <div className="text-right mt-4">
                          <hr />
                          <button
                            className="btn btn-sm btn-unique"
                            onClick={() => {
                              this.props.history.push("/admin");
                            }}
                          >
                            <i className="fas fa-angle-left mr-2"></i>KEMBALI
                          </button>
                          <button
                            className={`btn btn-sm btn-success`}
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
  name: Yup.string().required("Silahkan masukkan nama open trip"),
  keyword: Yup.array()
    .required("Silahkan masukkan keyword open trip")
    .min(1),
  region: Yup.string()
    .required("Silahkan pilih wilayah open trip")
    .notOneOf([""]),
  highlighted: Yup.boolean().required("Silahkan pilih"),
  duration: Yup.string().required("Silahkan masukkan durasi open trip"),
  departure: Yup.object().shape({
    start: Yup.string().required("Silahkan masukkan kota keberangkatan"),
    mepo: Yup.array()
      .required("Silahkan masukkan lokasi meeting point keberangkatan")
      .min(1)
  }),
  price: Yup.object().shape({
    priceFull: Yup.number()
      .required("Silahkan masukkan harga LUNAS")
      .min(0),
    priceDP: Yup.number()
      .required("Silahkan masukkan harga DP")
      .min(0)
  }),
  schedule: Yup.array()
    .required("Silahkan masukkan tanggal keberangkatan")
    .min(1),
  itinerary: Yup.array()
    .required("Silahkan masukkan itinerary")
    .min(1),
  facility: Yup.array()
    .required("Silahkan masukkan fasilitas")
    .min(1)
});

export default OpenTripAddForm;
