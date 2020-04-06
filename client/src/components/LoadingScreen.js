import React from "react";

import loadingImg from "../assets/loading2.gif";

function LoadingScreen() {
  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="col my-auto text-center">
          <img src={loadingImg} alt={loadingImg} />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
