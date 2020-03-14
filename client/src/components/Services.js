import React from 'react'

import SectionTitle from '../components/SectionTitle'

function Services() {
  return (
    <div className="container-fluid">
      <SectionTitle secTitle="Mengapa berlibur bersama kami?" secTagline="Alasan anda harus memilih kami" />

      <div className="row mx-3 mt-5">
        <div className="col-md-6 col-xl-3 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <p className="mt-4 pt-2"><i className="fas fa-dollar-sign fa-4x grey-text"></i></p>
                <h5 className="font-weight-bold my-4 py-2"><a className="dark-grey-text">Harga Terbaik</a></h5>
                <p className="text-muted mb-4">Tak perlu bimbang, lihat-lihat saja dulu. Kami memberikan penawaran harga terbaik</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <p className="mt-4 pt-2"><i className="far fa-grin-beam fa-4x grey-text"></i></p>
                <h5 className="font-weight-bold my-4 py-2"><a className="dark-grey-text">Crew Ramah</a></h5>
                <p className="text-muted mb-4">Senyuman hangat crew kami akan selalu mengiringi perjalanan anda</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <p className="mt-4 pt-2"><i className="fas fa-camera-retro fa-4x grey-text"></i></p>
                <h5 className="font-weight-bold my-4 py-2"><a className="dark-grey-text">Dokumentasi Spesial</a></h5>
                <p className="text-muted mb-4">Karena sebuah foto menyimpan kenangan. Crew kami selalu siap mengabadikan pose terbaik anda</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <p className="mt-4 pt-2"><i className="fas fa-shuttle-van fa-4x grey-text"></i></p>
                <h5 className="font-weight-bold my-4 py-2"><a className="dark-grey-text">Armada Nyaman</a></h5>
                <p className="text-muted mb-4">Armada yang bersih dan prima, memastikan perjalanan anda nyaman dan menyenangkan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  )
}
export default Services
