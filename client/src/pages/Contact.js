import React from "react";

import PageBanner from "../components/PageBanner";
import ContactContainer from "../components/ContactContainer";

import contactImage from '../assets/contact.png'

function Contact() {
  return (
    <div className="contact-page">
    <PageBanner
        img={contactImage}
        title={"Kontak"}
        subtitle={
          "Bagi yang ingin menanyakan seputar open trip, pemesanan, dan lainnya bisa langsung hubungi kami ya."
        }
      />
      <ContactContainer />
    </div>
  );
}

export default Contact;
