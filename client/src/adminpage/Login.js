import React from "react";

import LoginForm from "../admincomponent/LoginAdminForm2";

function LoginAdmin(props) {
  console.log(props);
  return (
    <div>
      <LoginForm {...props} />
    </div>
  );
}

export default LoginAdmin;
