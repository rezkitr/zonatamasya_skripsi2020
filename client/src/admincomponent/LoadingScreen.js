import React from "react";

import loadingImg from "../assets/loading.gif";

function LoadingScreen() {
  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="col my-auto text-center">
          <h1>Loading</h1>
          <img src={loadingImg} alt={loadingImg} width="200px" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
