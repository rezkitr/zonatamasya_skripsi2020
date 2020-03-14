import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import axios from 'axios'

const PromoItem = (props) => {
  return (
    <tr>
      <td>{props.promos.code}</td>
      <td>{props.promos.discount}</td>
      <td><Link to={"/admin/promo/edit/" + props.promos._id} className="text-primary" ><i className="far fa-edit mx-2"></i></Link> | <a href="#" onClick={() => { props.deletePromo(props.promos._id) }} className="text-danger" ><i className="far fa-trash-alt mx-2"></i></a></td>
    </tr>
  )
}

class PromoList extends Component {

  state = {
    promos: []
  }

  componentDidMount() {
    axios.get('http://localhost:4000/promo/')
      .then(res => {
        this.setState({ promos: res.data })
      })
      .catch(err => console.log(err))
  }

  mapPromoList () {
    return (this.state.promos.map(item => {
      return (
        <PromoItem key={item._id} promos={item} deletePromo={this.deletePromo}/>
      )
    }))
  }

  deletePromo = (promoId) => {
    confirmAlert({
      title: 'Hapus Promo',
      message: 'Apakah anda yakin?',
      buttons: [
        {
          label: 'Batal'
        },
        {
          label: 'Hapus',
          onClick: () => {
            axios.delete(`http://localhost:4000/promo/${promoId}`)
              .then(res => console.log(res.data))
              .catch(err => console.log(err))
            this.setState({
              promos: this.state.promos.filter(prm => prm._id !== promoId)
            })
          }
        }
        
      ]
    })
  }

  render() {
    return (
      <div className="container-fluid mt-5" >
        <Link to="/admin/promo/add" className="green-text font-weight-bold" ><i className="far fa-plus-square mr-2"></i>Tambah</Link>
        <div class="table-responsive text-nowrap mt-4">
          <table className="table table-hover w-75">
          <thead>
              <tr>
                <th scope="col"><i className="fas fa-pen mr-2 fa-lg"></i>Kode</th>
                <th scope="col"><i className="fas fa-percent mr-2 fa-lg"></i>Diskon</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.mapPromoList()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default PromoList
