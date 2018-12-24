import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

class ImageItem extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    var { width } = Dimensions.get('window');
    var { imageMargin, imagesPerRow, containerWidth } = this.props;

    if (typeof containerWidth != "undefined") {
      width = containerWidth;
    }
    this._imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }

  render() {
    var { item, selected, selectedMarker, imageMargin } = this.props;

    var marker = selectedMarker ? selectedMarker :
      <Image
        style={[styles.marker, { width: 25, height: 25 }]}
        source={require('./circle-check.png')}
      />;

    var unMarker =
      <Image
        style={[styles.marker, { width: 25, height: 25 }]}
        source={require('./circle-un-check.png')}
      />;
    var isCamera = item.type == 'camera'
    var image = isCamera ? item : item.node.image;

    return (
      <TouchableOpacity
        style={{ marginBottom: imageMargin, marginRight: imageMargin }}
        onPress={() => isCamera ? this.props.onCameraClick() : this._handleClick(image)}>
        <Image
          source={isCamera ? require('./tileCamera.png') : { uri: image.uri }}
          style={{ height: this._imageSize, width: this._imageSize, borderRadius: 3, borderWidth: 0.5, borderColor: '#eee' }} />
        {isCamera ? null : (selected) ? marker : unMarker}
      </TouchableOpacity>
    );
  }

  _handleClick(item) {
    this.props.onClick(item);
  }
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
})

ImageItem.defaultProps = {
  item: {},
  selected: false,
}

ImageItem.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool,
  selectedMarker: PropTypes.element,
  imageMargin: PropTypes.number,
  imagesPerRow: PropTypes.number,
  onClick: PropTypes.func,
  onCameraClick: PropTypes.func,
}

export default ImageItem;
