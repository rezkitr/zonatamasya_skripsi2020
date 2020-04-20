import React from "react";
import { Link } from "react-router-dom";
import helpers from "../helperFunction";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

function PromoCardTabMenu(props) {
  return (
    <div className="card h-100 tab-inside-content">
      <div className="card-body">
        <div className="row p-2">
          <div className="d-flex flex-column justify-content-center promo-info">
            <h6>
              KODE PROMO : {"  "}
              <span className="badge badge-info p-2">{props.promoCode}</span>
            </h6>
            <h1 className="font-weight-bold">
              {helpers.priceFormat(props.discount)}
            </h1>
            <h6>
              Masa Berlaku :{"  "}
              <span className="badge badge-warning p-2">
                {helpers.formatDate(props.expDate)}
              </span>
            </h6>
          </div>
          <div className="d-flex flex-column promo-link justify-content-center mx-auto">
            <CopyToClipboard
              text={props.promoCode}
              onCopy={() =>
                toast.info("Promo disalin", {
                  position: "bottom-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                })
              }
            >
              <i
                className="far fa-copy fa-lg text-secondary"
                style={{ cursor: "pointer" }}
              ></i>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoCardTabMenu;
