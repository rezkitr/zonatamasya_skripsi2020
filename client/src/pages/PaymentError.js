import React from "react";

import PaymentInfo from "../components/PaymentInfo";
import errorImg from "../assets/error.png";

function PaymentError() {
  return (
    <div className="payment-finish-page" style={{ marginBottom: "200px" }}>
      <PaymentInfo
        title={"Reservasi Gagal"}
        image={errorImg}
        text={
          "Maaf reservasi anda gagal kami proses. Silahkan lakukan reservasi ulang."
        }
      />
    </div>
  );
}

export default PaymentError;
