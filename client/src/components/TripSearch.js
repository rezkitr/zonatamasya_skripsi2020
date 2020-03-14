import React, { Component } from 'react'

export default class TripSearch extends Component {
  render() {
    return (
      <div className="searchtrip-section mb-5" >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form>
                <label htmlFor="searchtrip" className="font-weight-bold">Cari Open Trip</label>
                <div className="input-group">
                  <input type="text" className="form-control form-control-lg" id="searchtrip" placeholder="Mau Kemana? (bromo, ijen, ...)" />
                  <div className="input-group-append">
                    <button className="btn btn-md btn-amber rounded-right m-0 px-3 py-2 z-depth-0 waves-effect" type="submit"><i className="fas fa-search fa-lg mx-2"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
