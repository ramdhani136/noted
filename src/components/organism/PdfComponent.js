import React from 'react';

import {View, Modal, StyleSheet, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';

const PdfComponent = ({isActive, setActive, source}) => {
  return (
    <Modal
      animationType="slide"
      visible={isActive}
      onRequestClose={() => {
        setActive(!isActive);
      }}>
      <View style={styles.container}>
        <Pdf
          source={{uri: source}}
          onLoadComplete={(numberOfPages, filePath) => {
            // console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            // console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            // console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </Modal>
  );
};

export default PdfComponent;

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
