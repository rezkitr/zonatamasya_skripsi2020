import React from "react";

import UserAdminAddForm from "../admincomponent/UserAdminAddForm";

function AdminAdd(props) {
  if (
    window.localStorage.getItem("isLoggedIn") === "false" ||
    window.localStorage.getItem("isLoggedIn") === null
  ) {
    props.history.push("/admin/login");
  }
  return (
    <div>
      <UserAdminAddForm {...props} />
    </div>
  );
}

export default AdminAdd;
