import React from 'react'

import LoginForm from '../admincomponent/LoginAdminForm'

function LoginAdmin(props) {
  console.log(props)
  return (
    <div>
      <LoginForm {...props} />
    </div>
  )
}

export default LoginAdmin
