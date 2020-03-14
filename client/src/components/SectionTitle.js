import React from 'react'

function SectionTitle(props) {
  return (
    <div className="row justify-content-center mx-3 mb-4 ">
      <div className="col-md">
        <h2 className="font-weight-bold mb-3">{props.secTitle}</h2>
        <h5 className="text-right">{props.secTagline}</h5> 
      </div>
    </div>
  )
}

export default SectionTitle
