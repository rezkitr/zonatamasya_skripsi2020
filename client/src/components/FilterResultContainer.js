import React from 'react'

import FilterResult from './FilterResult'

function FilterResultContainer(props) {
  return (
    <div className="filter-res-cont">
      <FilterResult {...props} />
    </div>
  )
}

export default FilterResultContainer
