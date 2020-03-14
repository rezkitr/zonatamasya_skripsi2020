import React, { Component } from 'react'
import Gallery from 'react-grid-gallery'
import photos from '../galleryPhotos'

class MyGallery extends Component {

  state = {
    galleryData: []
  }

  componentDidMount() {
    this.setState({
      galleryData: photos
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row gallery-row">
          <div className="col-md">
            <Gallery images={this.state.galleryData} rowHeight={240} margin={3} backdropClosesModal={true} />
          </div>
        </div>
      </div>
    )
  }
}
export default MyGallery
