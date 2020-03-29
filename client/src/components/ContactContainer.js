import React from "react";

function ContactContainer() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md text-center p-5">
          <iframe
            title="zonatamasyaoffice"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.801639185172!2d112.76527961532733!3d-7.263401873381271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f980de75e2a1%3A0xf0e8b6948b5a70ee!2sZona%20Tamasya%20Tour%20Organizer!5e0!3m2!1sen!2sid!4v1583797917007!5m2!1sen!2sid"
            width="100%"
            height="480"
            frameborder="0"
            style={{ border: "0" }}
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>
        <div className="col-md my-auto">
          <div className="row mt-3 text-center">
            <div className="col-md">
              <i className="far fa-building fa-3x amber-text"></i>
              <p className="font-weight-bold mt-2 mb-3">Kantor</p>
              <p className="text-muted">
                Jl. Kaliwaron No.58, Surabaya, Jawa Timur 60285
              </p>
            </div>
            <div className="col-md">
              <i className="fas fa-phone fa-3x amber-text"></i>
              <p className="font-weight-bold mt-2 mb-3">Telepon</p>
              <p className="text-muted">+62 812-3093-3306</p>
            </div>
            <div className="col-md">
              <i className="far fa-envelope fa-3x amber-text"></i>
              <p className="font-weight-bold mt-2 mb-3">Email</p>
              <p className="text-muted">zonatamasya@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactContainer;
