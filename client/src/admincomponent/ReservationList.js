import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ReservationItem = (props) => {
  return (
    <tr>
      <td>{props.reservations.tripName}</td>
      <td>{props.formatDate(props.reservations.tripDate)}</td>
      <td>{props.reservations.tripStart}</td>
      <td>{props.reservations.mepo}</td>
      <td>{props.reservations.participant.coordinator.coorName}</td>
      <td>{props.reservations.totalParticipant}</td>
      <td>{props.reservations.payment.type}</td>
      <td><Link to={"/admin/rsv/detail/" + props.reservations._id} className="text-info" ><i className="fas fa-search mx-2"></i></Link> | <Link to={"/admin/rsv/edit/" + props.reservations._id} className="text-primary" ><i className="far fa-edit mx-2"></i></Link> | <a href="#" onClick={() => { props.deleteReservation(props.reservations._id) }} className="text-danger" ><i className="far fa-trash-alt mx-2"></i></a></td>
    </tr>
  )
}

class ReservationList extends Component {

  state = {
    reservations: []
  }

  componentDidMount() {
    axios.get('http://localhost:4000/reservation/')
      .then(res => {
        this.setState({ reservations: res.data })
      })
      .catch(err => console.log(err))
  }

  formatDate(strDate) {
    let months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]

    let dateTemp = new Date(strDate)
    let monthIndex = dateTemp.getMonth()
    let monthName = months[monthIndex]
    let day = dateTemp.getDate().toString()
    let year = dateTemp.getFullYear()

    if (day.length < 2) {
      day = `0${day}`
    }
    let formattedDate = `${day} ${monthName} ${year}`
    return formattedDate
  }

  mapReservationList() {
    return (this.state.reservations.map(item => {
      return (
        <ReservationItem key={item._id} reservations={item} formatDate={this.formatDate} deleteReservation={this.deleteReservation} />
      )
    }))
  }

  deleteReservation = (rsvId) => {
    confirmAlert({
      title: 'Hapus Reservasi',
      message: 'Apakah anda yakin?',
      buttons: [
        {
          label: 'Batal'
        },
        {
          label: 'Hapus',
          onClick: () => {
            axios.delete(`http://localhost:4000/reservation/${rsvId}`)
              .then(res => console.log(res.data))
              .catch(err => console.log(err))
            this.setState({
              reservations: this.state.reservations.filter(rsv => rsv._id !== rsvId)
            })
          }
        }
        
      ]
    })
  }

  render() {
    return (
      <div className="container-fluid mt-5" id="rsv-list" >
        <div class="table-responsive text-nowrap">
          <table className="table table-hover mx-auto w-100 ">
            <thead>
              <tr>
                <th scope="col"><i className="fas fa-suitcase-rolling mr-2 fa-lg"></i>Open Trip</th>
                <th scope="col"><i className="far fa-calendar-check mr-2 fa-lg"></i>Tgl. Keberangkatan</th>
                <th scope="col"><i className="fas fa-plane-departure mr-2 fa-lg"></i>Start</th>
                <th scope="col"><i className="far fa-flag mr-2 fa-lg"></i>Meeting Point</th>
                <th scope="col"><i className="fas fa-user mr-2 fa-lg"></i>Pemesan</th>
                <th scope="col"><i className="fas fa-users mr-2 fa-lg"></i>Jumlah Peserta</th>
                <th scope="col"><i className="fas fa-money-check-alt mr-2 fa-lg"></i>Pembayaran</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.mapReservationList()}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}

export default ReservationList
