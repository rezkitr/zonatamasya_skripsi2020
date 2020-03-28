import React from "react";

import notfoundIcon from "../assets/404.png";

function NotFound() {
  return (
    <div
      className="container-fluid notfound-page"
      style={{
        backgroundImage: `url(${notfoundIcon})`
      }}
    ></div>
  );
}

export default NotFound;
