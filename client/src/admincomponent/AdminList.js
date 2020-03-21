import React, { Component } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";

const AdminItem = props => {
  return (
    <tr>
      <td>{props.admins.username}</td>
      <td>{props.admins.password}</td>
      <td>
        <Link
          to={"/admin/admuser/edit/" + props.admins._id}
          className="text-primary"
        >
          <i className="far fa-edit mx-2"></i>
        </Link>{" "}
        |{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteAdmin(props.admins._id);
          }}
          className="text-danger"
        >
          <i className="far fa-trash-alt mx-2"></i>
        </a>
      </td>
    </tr>
  );
};

class AdminList extends Component {
  state = {
    admins: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/admin/")
      .then(res => {
        this.setState({ admins: res.data });
      })
      .catch(err => console.log(err));
  }

  mapAdminList() {
    return this.state.admins.map(item => {
      return (
        <AdminItem
          key={item._id}
          admins={item}
          deleteAdmin={this.deleteAdmin}
        />
      );
    });
  }

  deleteAdmin = adminId => {
    confirmAlert({
      title: "Hapus Admin",
      message: "Apakah anda yakin?",
      buttons: [
        {
          label: "Batal"
        },
        {
          label: "Hapus",
          onClick: () => {
            axios
              .delete(`http://localhost:4000/admin/${adminId}`)
              .then(res => console.log(res.data))
              .catch(err => console.log(err));
            this.setState({
              admins: this.state.admins.filter(adm => adm._id !== adminId)
            });
          }
        }
      ]
    });
  };

  render() {
    return (
      <div className="container-fluid mt-5">
        <Link to="/admin/admuser/add" className="green-text font-weight-bold">
          <i className="far fa-plus-square mr-2"></i>Tambah
        </Link>
        <div class="table-responsive text-nowrap mt-4">
          <table className="table table-hover w-75">
            <thead>
              <tr>
                <th scope="col">
                  <i className="far fa-user-circle mr-2 fa-lg"></i>Username
                </th>
                <th scope="col">
                  <i className="fas fa-key mr-2 fa-lg"></i>Password
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.mapAdminList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdminList;
