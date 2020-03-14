import React from 'react'

import PromoEditForm from '../admincomponent/PromoEditForm'

function PromoEdit(props) {
  return (
    <div>
      <PromoEditForm {...props} promoId={props.match.params.promoId} />
    </div>
  )
}

export default PromoEdit
