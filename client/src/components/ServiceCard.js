import React from "react";

function ServiceCard(props) {
  return (
    <div className="card h-100 text-center">
      <div className="card-body">
        <p className="mt-4 pt-2">
          <i className={`${props.icon} fa-4x grey-text`}></i>
        </p>
        <h5
          className="font-weight-bold my-4 py-2 dark-grey-text"
          style={{ cursor: "pointer" }}
        >
          {props.title}
        </h5>
        <p className="text-muted mb-4">{props.desc}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
