import React from "react";
import PromoDataSource from "../promoDataSource";

import PageBanner from "./PageBanner";
import PromoCard from "./PromoCard";

import bannerImg from "../assets/bannerPageImage/discount.jpg";

function PromoList(props) {
  return (
    <>
      <PageBanner
        bannerImg={bannerImg}
        bannerTitle={"Promo"}
        subTitle={`Ingin liburan tapi budget pas banget? Tak usah risau, cari kode promo
          di sini dan jangan lupa masukkan kode nya saat reservasi.`}
      />
      <div className="container-fluid mt-4">
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
    </>
  );
}

export default PromoDataSource(PromoList);
