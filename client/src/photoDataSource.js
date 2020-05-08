import React, { Component } from "react";
import axios from "axios";

const PhotoDataSource = (WrappedComponent) => {
  return class extends Component {
    state = {
      photoData: [],
      photoHighlight: [],
    };

    componentDidMount() {
      let photoDataTemp = [];
      let photoHighlightTemp = [];

      axios
        .get("/photo/")
        .then((res) => {
          res.data.items.map((item) => {
            let photoItem = {
              src: item.fields.src.fields.file.url,
              thumbnail: item.fields.src.fields.file.url,
              thumbnailWidth: Math.floor(Math.random() * 500) + 480,
              thumbnailHeight: Math.floor(Math.random() * 320) + 290,
              caption: item.fields.caption,
            };
            photoDataTemp.push(photoItem);
          });
          this.setState({
            photoData: photoDataTemp,
          });
        })
        .catch((err) => console.log(err));

      axios
        .get("/photo/highlight")
        .then((res) => {
          res.data.items.map((item) => {
            let photoHighlightItem = {
              src: item.fields.src.fields.file.url,
              thumbnail: item.fields.src.fields.file.url,
              thumbnailWidth: item.fields.thumbnailWidth,
              thumbnailHeight: item.fields.thumbnailHeight,
            };
            photoHighlightTemp.push(photoHighlightItem);
          });
          this.setState({
            photoHighlight: photoHighlightTemp,
          });
        })
        .catch((err) => console.log(err));
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};
export default PhotoDataSource;
