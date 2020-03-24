import React from "react";

import UserAdminEditForm from "../admincomponent/UserAdminEditForm";

function AdminEdit(props) {
  return (
    <div>
      <UserAdminEditForm {...props} adminId={props.match.params.adminId} />
    </div>
  );
}

export default AdminEdit;
