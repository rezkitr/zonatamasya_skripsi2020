import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import axios from "axios";

function OpenTripAddForm() {
  return (
    <div className="container-fluid mt-5">
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
              <div className="card-body mt-4 px-5 py-3">
                <Formik
                  enableReinitialize
                  initialValues={{
                    tripName: "",
                    tripKeyword: [],
                    region: "",
                    highlighted: false,
                    cardImage: "",
                    bannerImage: "",
                    tripDuration: "",
                    tripDeparture: {
                      start: "",
                      mepo: []
                    },
                    price: {
                      priceFull: 0,
                      priceDP: 0
                    },
                    schedule: [],
                    itinerary: [],
                    facility: [],
                    tripKeywordTemp: "",
                    highlightedTemp: ""
                  }}
                >
                  {({ errors, touched, values, isSubmitting }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="tripName" className="font-weight-bold">
                          Nama Open Trip
                        </label>
                        <Field
                          type="text"
                          id="tripName"
                          name="tripName"
                          className={`form-control ${
                            touched.tripName && errors.tripName
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                      </div>

                      <FieldArray
                        name="tripKeyword"
                        render={arrayHelpers => (
                          <div>
                            <div className="form-group">
                              <label
                                htmlFor="tripKeywordTemp"
                                className="font-weight-bold"
                              >
                                Keyword
                              </label>
                              <div className="input-group">
                                <Field
                                  type="text"
                                  id="tripKeywordTemp"
                                  name="tripKeywordTemp"
                                  className="form-control"
                                />
                                <div className="input-group-append">
                                  <button
                                    className="btn btn-md btn-primary rounded-right m-0 px-3 py-2 z-depth-0 waves-effect"
                                    type="button"
                                    onClick={() => {
                                      values.tripKeyword.length > 0
                                        ? arrayHelpers.insert(
                                            values.tripKeyword.length + 1,
                                            values.tripKeywordTemp
                                          )
                                        : arrayHelpers.insert(
                                            0,
                                            values.tripKeywordTemp
                                          );
                                    }}
                                  >
                                    <i className="fas fa-plus fa-lg mx-2"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            {values.tripKeyword && values.tripKeyword.length > 0
                              ? values.tripKeyword.map((item, index) => {
                                  return (
                                    <h5 className="d-inline mr-2">
                                      <span className="badge badge-info p-2">
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
                                    </h5>
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
                          className="form-control"
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
                      </div>
                      <div className="form-group">
                        <label className="font-weight-bold">Highlight</label>
                        <br />
                        <div className="custom-control custom-radio custom-control-inline">
                          <Field
                            type="radio"
                            id="highlight1"
                            name="highlightedTemp"
                            value="1"
                            checked={values.highlightedTemp == "1"}
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="highlight1"
                          >
                            Ya
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <Field
                            type="radio"
                            id="highlight2"
                            name="highlightedTemp"
                            value="0"
                            checked={values.highlightedTemp == "0"}
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="highlight2"
                          >
                            Tidak
                          </label>
                        </div>
                        <div className="d-none">
                          {values.highlightedTemp === "1"
                            ? (values.highlighted = true)
                            : (values.highlighted = false)}
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md">
                          <label
                            htmlFor="featured"
                            className="font-weight-bold"
                          >
                            Gambar Card
                          </label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="region"
                          />
                        </div>
                        <div className="form-group col-md">
                          <label
                            htmlFor="featured"
                            className="font-weight-bold"
                          >
                            Gambar Banner
                          </label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="region"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">
                          Durasi
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="region"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">
                          Start
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="region"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">
                          Meeting Point
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="region"
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md">
                          <label
                            htmlFor="featured"
                            className="font-weight-bold"
                          >
                            Harga Lunas
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="region"
                          />
                        </div>
                        <div className="form-group col-md">
                          <label
                            htmlFor="featured"
                            className="font-weight-bold"
                          >
                            Harga DP
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="region"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">
                          Jadwal
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="region"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">
                          Itinerary
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="region"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">
                          Fasilitas
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="region"
                        />
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

export default OpenTripAddForm;
