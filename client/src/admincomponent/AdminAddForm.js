import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'

function AdminAddForm(props) {
  return (
    <div className="container-fluid" >
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="px-3">
              <i className="far fa-plus-square fa-lg light-green z-depth-2 p-4 ml-3 mt-n3 rounded text-white"></i>
              <div className="float-right text-right p-3">
                <p className="text-muted mb-1"><small>Tambah Data Admin</small></p>
              </div>
              <div className="card-body p-5">
                <Formik
                  enableReinitialize
                  initialValues={
                    {
                      username: '',
                      password: ''
                    }
                  }
                  validationSchema={ValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      axios.post('http://localhost:4000/admin/add', values)
                        .then(res => {
                          confirmAlert({
                            title: 'Tambah Admin',
                            message: 'Data Admin Berhasil Ditambakan',
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
                            <label htmlFor="username" className="font-weight-bold" >Username</label>
                          </div>
                          <div className="form-group col-md">
                            <label htmlFor="password" className="font-weight-bold" >Password</label>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md">
                            <Field
                              type="text"
                              id="username"
                              name="username"
                              className={`form-control ${touched.username && errors.username ? "is-invalid" : ""}`}
                            />
                            <ErrorMessage
                              component="div"
                              name="username"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group col-md">
                            <Field
                              type="text"
                              id="password"
                              name="password"
                              className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                            />
                            <ErrorMessage
                              component="div"
                              name="password"
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
  username: Yup.string()
    .required("Silahkan masukkan username"),
  password: Yup.string()
    .required("Silahkan masukkan password")
    .min(6, 'Min. 6 karakter')
})

export default AdminAddForm
