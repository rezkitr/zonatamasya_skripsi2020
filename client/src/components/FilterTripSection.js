import React, { Component } from 'react'

import filterImg1 from '../assets/filterImg/jatim.png'
import filterImg2 from '../assets/filterImg/jateng.png'
import filterImg3 from '../assets/filterImg/jabar.png'
import filterImg4 from '../assets/filterImg/jogja.png'
import filterImg5 from '../assets/filterImg/bali.png'


import FilterResultContainer from './FilterResultContainer'

class FilterTripSection extends Component {
  state = {
    filterTag: "",
    reset: true
  }

  handleClick = (event) => {
    const { name } = event.target

    this.setState(prevState => {
      return {
        filterTag: name,
        reset: !prevState.reset
      }
    })
  }

  render() {
    return (
      <>
        <div className="container-fluid filter-section" >
          <div className="row row-cols-md-3 row-cols-lg-5 mx-3 justify-content-center">
            <div className="col-md mb-5 text-center">
              <img className={"rounded-circle " + (this.state.filterTag === "jatim" && !this.state.reset ? 'flip-vertical-fwd active-filter' : 'flip-vertical-bck inactive-filter')} onClick={this.handleClick} src={filterImg1} name="jatim" alt="jatim" width="200" />
            </div>
            <div className="col-md mb-4 text-center">
              <img className={"rounded-circle " + (this.state.filterTag === "jateng" && !this.state.reset ? 'flip-vertical-fwd active-filter' : 'flip-vertical-bck inactive-filter')} onClick={this.handleClick} src={filterImg2} name="jateng" alt="jateng" width="200" />
            </div>
            <div className="col-md mb-4 text-center">
              <img className={"rounded-circle " + (this.state.filterTag === "jabar" && !this.state.reset ? 'flip-vertical-fwd active-filter' : 'flip-vertical-bck inactive-filter')} onClick={this.handleClick} src={filterImg3} name="jabar" alt="jabar" width="200" />
            </div>
            <div className="col-md mb-4 text-center">
              <img className={"rounded-circle " + (this.state.filterTag === "jogja" && !this.state.reset ? 'flip-vertical-fwd active-filter' : 'flip-vertical-bck inactive-filter')} onClick={this.handleClick} src={filterImg4} name="jogja" alt="jogja" width="200" />
            </div>
            <div className="col-md mb-4 text-center">
              <img className={"rounded-circle " + (this.state.filterTag === "bali" && !this.state.reset ? 'flip-vertical-fwd active-filter' : 'flip-vertical-bck inactive-filter')} onClick={this.handleClick} src={filterImg5} name="bali" alt="bali" width="200" />
            </div>
          </div>
          <div className="mx-3 mt-3 mb-4">
            <hr />
          </div>
        </div>
        <>
          <FilterResultContainer tag={this.state.filterTag} reset={this.state.reset} />
        </>
      </>
    )
  }
}

export default FilterTripSection
