import React from "react";
import { Link } from "react-router-dom";

function PaymentInfo(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md my-auto text-center pt-5">
          <h1 className="mb-4">{props.title}</h1>
          <img
            src={props.image}
            alt={props.image}
            className="img-fluid"
            width="640"
          />
          <p className="h5">{props.text}</p>
          <Link to="/">
            <button className="btn btn-sm btn-success mt-4 py-3">
              <i className="fas fa-home fa-2x"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
