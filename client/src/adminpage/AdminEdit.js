import React from 'react'

import AdminEditForm from '../admincomponent/AdminEditForm'

function AdminEdit(props) {
  return (
    <div>
      <AdminEditForm {...props} adminId={props.match.params.adminId} />
    </div>
  )
}

export default AdminEdit
