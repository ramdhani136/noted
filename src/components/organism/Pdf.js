import React from 'react';

import {View, Text, Modal, StyleSheet, Dimensions} from 'react-native';

const Pdf = ({isActive, setActive, source}) => {
  return (
    <Modal
      animationType="slide"
      visible={false}
      //   onRequestClose={() => {
      //     setActive(!isActive);
      //     setBtnStatus({
      //       ...btnStatus,
      //       recPlay: true,
      //       recPause: false,
      //       recStop: false,
      //     });
      //   }}
    >
      <View
        style={styles.container}
        // style={{
        //   backgroundColor: 'white',
        //   width: '100%',
        //   height: '100%',
        //   display: 'flex',
        // }}
      ></View>
    </Modal>
  );
};

export default Pdf;

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
