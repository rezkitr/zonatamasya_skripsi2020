import React from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function OpenTripAddForm() {
  return (
    <div className="container-fluid mt-5" >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="px-3">
              <i className="far fa-plus-square fa-lg light-green z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
              <div className="float-right text-right p-3">
                <p className="text-muted mb-1"><small>Tambah Data Open Trip</small></p>
              </div>
              <div className="card-body mt-4 px-5 py-3">
                <Formik
                  enableReinitialize
                  initialValues={
                    {
                      tripName: '',
                      tripKeyword: [],
                      region: '',
                      highlighted: false,
                      cardImage: '',
                      bannerImage: '',
                      tripDuration: '',
                      tripDeparture: {
                        start: '',
                        mepo: []
                      },
                      price: {
                        priceFull: 0,
                        priceDP: 0
                      },
                      schedule: [],
                      itinerary: [],
                      facility: []
                    }
                  }
                >
                  {({ errors, touched, values, isSubmitting }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="tripName" className="font-weight-bold">Nama Open Trip</label>
                        <Field
                          type="text"
                          id="tripName"
                          name="tripName"
                          className={`form-control ${touched.tripName && errors.tripName ? "is-invalid" : ""}`}
                        />
                      </div>

                      <FieldArray>
                        
                      </FieldArray>
                      
                      <div className="form-group">
                        <label htmlFor="region" className="font-weight-bold">Region</label>
                        <input type="text" className="form-control" id="region" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="highlight" className="font-weight-bold">Highlight</label>
                        <input type="text" className="form-control" id="highlight" />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md">
                          <label htmlFor="featured" className="font-weight-bold">Gambar Card</label>
                          <input type="file" className="form-control-file" id="region" />
                        </div>
                        <div className="form-group col-md">
                          <label htmlFor="featured" className="font-weight-bold">Gambar Banner</label>
                          <input type="file" className="form-control-file" id="region" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">Durasi</label>
                        <input type="text" className="form-control" id="region" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">Start</label>
                        <input type="text" className="form-control" id="region" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">Meeting Point</label>
                        <input type="text" className="form-control" id="region" />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md">
                          <label htmlFor="featured" className="font-weight-bold">Harga Lunas</label>
                          <input type="number" className="form-control" id="region" />
                        </div>
                        <div className="form-group col-md">
                          <label htmlFor="featured" className="font-weight-bold">Harga DP</label>
                          <input type="number" className="form-control" id="region" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">Jadwal</label>
                        <input type="text" className="form-control" id="region" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">Itinerary</label>
                        <input type="text" className="form-control" id="region" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="featured" className="font-weight-bold">Fasilitas</label>
                        <input type="text" className="form-control" id="region" />
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
  )
}

export default OpenTripAddForm
