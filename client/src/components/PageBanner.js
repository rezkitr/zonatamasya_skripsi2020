import React from "react";


function PageBanner(props) {
  return (
    <div className="container-fluid page-banner">
      <div className="row justify-content-center">
        <div className="col-md-4 my-auto">
          <img src={props.img} alt="illustration" />
        </div>
        <div className="col-md-4 my-auto">
          <h1 className="page-banner-title mb-4">{props.title}</h1>
          <p className="page-banner-subtitle">{props.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default PageBanner;
