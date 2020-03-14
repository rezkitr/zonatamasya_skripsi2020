import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'

function PromoAddForm(props) {
  return (
    <div className="container-fluid" >
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="px-3">
              <i className="far fa-plus-square fa-lg light-green z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
              <div className="float-right text-right p-3">
                <p className="text-muted mb-1"><small>Tambah Data Promo</small></p>
              </div>
              <div className="card-body p-5">
                <Formik
                  enableReinitialize
                  initialValues={
                    {
                      code: '',
                      discount: null
                    }
                  }
                  validationSchema={ValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(JSON.stringify(values, null, 2))
                    setTimeout(() => {
                      axios.post('http://localhost:4000/promo/add', values)
                        .then(res => {
                          confirmAlert({
                            title: 'Tambah Promo',
                            message: 'Data Promo Berhasil Ditambakan',
                            buttons: [
                              {
                                label: 'OK'
                              }
                            ]
                          })
                        })
                        .catch(err => alert(err))
                      setSubmitting(false)
                      props.history.push("/admin")
                    }, 200)
                  }}
                >
                  {({ errors, touched, values, isSubmitting }) => (
                    <Form>
                      <div>
                        <div className="form-row">
                          <div className="form-group col-md">
                            <label htmlFor="promoCode" className="font-weight-bold" >Kode</label>
                          </div>
                          <div className="form-group col-md-3">
                            <label htmlFor="promoDiscount" className="font-weight-bold" >Diskon</label>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md">
                            <Field
                              type="text"
                              id="promoCode"
                              name="code"
                              className={`form-control ${touched.code && errors.code ? "is-invalid" : ""}`}
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
                              className={`form-control ${touched.discount && errors.discount ? "is-invalid" : ""}`}
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
                        <button className="btn btn-sm btn-unique" onClick={() => { props.history.push("/admin") }} ><i className="fas fa-angle-left mr-2"></i>KEMBALI</button>
                        <button className={`btn btn-sm btn-success ${isSubmitting ? 'disabled' : ''}`} type="submit" ><i className="far fa-plus-square mr-2"></i>TAMBAH</button>
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

const ValidationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Silahkan masukkan kode promo")
    .uppercase("Gunakan huruf kapital"),
  discount: Yup.number()
    .min(1, "Min. 1")
    .required("Silahkan masukkan nominal diskon (%)")
})

export default PromoAddForm
