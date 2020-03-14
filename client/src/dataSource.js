import React, {Component} from 'react'

import openTripData from './openTripSourceData'

const DataSource = (WrappedComponent) => {
  return class extends Component {

    state = {
      tripData : []
    }

    componentDidMount() {
      this.setState({
        tripData : openTripData
      })
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }
}

export default DataSource