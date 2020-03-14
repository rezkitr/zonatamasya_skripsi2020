import React from 'react'

import carouselData from '../carouselData'

function Carousel() {

  const carouselItem = carouselData.map(item => {

    if (item.active) {
      return (
        <div key={item.id} className="carousel-item active">
          <div className="view">
            <img className="d-block w-100" src={item.image.url} alt="First slide" />
            <div className="mask rgba-black-slight"></div>
          </div>
        </div>
      )
    }
    return (
      <div key={item.id} className="carousel-item">
        <div className="view">
          <img className="d-block w-100" src={item.image.url} alt="First slide" />
          <div className="mask rgba-black-slight"></div>
        </div>
      </div>
    )
  })

  return (
    <div>
      <div id="myCarousel" className="carousel slide carousel-fade" data-ride="carousel">

        <div className="carousel-inner" role="listbox">
          {carouselItem}
        </div>

        <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>

      </div>
    </div>
  )
}

export default Carousel
