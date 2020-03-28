import React from "react";
import PromoDataSource from "../promoDataSource";

import PromoCard from "./PromoCard";

function PromoList(props) {
  return (
    <div className="container-fluid mt-4" style={{minHeight:"420px"}}>
      <div className="row justify-content-center mx-3 pt-5">
        {props.promoData.map(item => {
          return (
            <div className="col-md-4 mb-4">
              <PromoCard
                key={item._id}
                promoCode={item.code}
                discount={item.discount}
                desc={item.description}
                expDate={item.expDate}
                tripId={item.tripId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PromoDataSource(PromoList);
