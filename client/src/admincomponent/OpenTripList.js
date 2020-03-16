import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class OpenTripList extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <Link to="/admin/opentrip/add" className="green-text font-weight-bold" ><i className="far fa-plus-square mr-2"></i>Tambah</Link>
      </div>
    )
  }
}
export default OpenTripList
