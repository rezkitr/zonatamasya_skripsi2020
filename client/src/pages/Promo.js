import React from "react";

import PageBanner from "../components/PageBanner";
import PromoList from "../components/PromoList";

import discountImage from '../assets/discount.png'

function Promo() {
  return (
    <div className="promo-page">
    <PageBanner
        img={discountImage}
        title={"Promo"}
        subtitle={
          "Ingin liburan tapi budget pas banget. Pakai kode promo aja biar dapat potongan, yuk!"
        }
      />
      <PromoList />
    </div>
  );
}

export default Promo;
