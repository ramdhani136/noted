import React from 'react';
import {View, Modal, StyleSheet, Dimensions} from 'react-native';

const FileViewerComponent = ({isActive, setActive, source}) => {
  return (
    <Modal
      animationType="slide"
      visible={isActive}
      onRequestClose={() => {
        setActive(!isActive);
      }}>
      <View style={styles.container}>FileViewer.open(res.uri);</View>
    </Modal>
  );
};

export default FileViewerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
