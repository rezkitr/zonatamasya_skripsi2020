import React from "react";

import UserAdminAddForm from "../admincomponent/UserAdminAddForm";

function AdminAdd(props) {
  return (
    <div>
      <UserAdminAddForm {...props} />
    </div>
  );
}

export default AdminAdd;
