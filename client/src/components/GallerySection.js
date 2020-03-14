import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Gallery from 'react-grid-gallery'
import photos from '../photoSection'

import SectionTitle from './SectionTitle'

class GallerySection extends Component {

  state = {
    photos : []
  }

  componentDidMount () {
    this.setState({
      photos : photos
    })
  }

  render() {
    return (
      <div className="container-fluid gal-section">
        <SectionTitle secTitle="Galeri" />
        <div className="row mx-3">
          <div className="col-md">
            <Gallery enableLightbox={false} images={this.state.photos} enableImageSelection={false} rowHeight={240} maxRows={2} margin={2} backdropClosesModal={true} />
          </div>
        </div>
        <div className="row justify-content-center mt-5">
        <Link to="/galeri"><button className="btn btn-light-green font-weight-bold">LAINNYA</button></Link>
      </div>
      </div>
    )
  }
}
export default GallerySection
