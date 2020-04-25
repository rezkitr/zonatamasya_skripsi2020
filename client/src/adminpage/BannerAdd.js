import React from "react";

import BannerAddForm from "../admincomponent/BannerAddForm";

function BannerAdd(props) {
  return (
    <div>
      <BannerAddForm {...props} />
    </div>
  );
}

export default BannerAdd;
