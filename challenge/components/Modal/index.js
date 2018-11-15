import React from 'react';
import Modal from 'react-native-modal';
import { View, Text } from 'react-native'

class AddModal extends React.Component {
  render() {
    return (
      <Modal isVisible={this.props.isVisible}>
        <View>Modal Shows</View>
      </Modal>
    )
  }
}

export default Modal;
