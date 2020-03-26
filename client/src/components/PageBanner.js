import React from "react";

function PageBanner(props) {
  return (
    <div
      className="banner-image"
      style={{
        backgroundImage: `url(${props.bannerImg})`
      }}
    >
      <div className="banner-filter"></div>
      <div className="banner-title">
        <h1 style={{ fontSize: "48px", fontWeight: "500" }}>
          {props.bannerTitle}
        </h1>
        <hr className="white" style={{ width: "240px" }} />
        <p style={{ fontSize: "24px" }}>{props.subTitle}</p>
      </div>
    </div>
  );
}

export default PageBanner;
