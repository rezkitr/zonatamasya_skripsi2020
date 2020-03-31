import React from "react";

import PaymentInfo from "../components/PaymentInfo";
import successImg from "../assets/success.png";

function PaymentFinish() {
  return (
    <div className="payment-finish-page" style={{ marginBottom: "200px" }}>
      <PaymentInfo
        title={"Reservasi Sukses"}
        image={successImg}
        text={
          "Reservasi anda telah berhasil kami proses. Silahkan selesaikan pembayaran sesuai dengan instruksi yang diberikan. Terimakasih."
        }
      />
    </div>
  );
}

export default PaymentFinish;
