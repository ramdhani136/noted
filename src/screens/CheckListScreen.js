import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  CheckBox,
} from 'react-native';
import {Layout} from '../components/organism';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LayoutCheckList = () => {
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fffafa',
      }}>
      {/* Header */}
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <View
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <FontAwesome
              name="navicon"
              style={{fontSize: 18, marginHorizontal: 12, color: '#666'}}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Today
          </Text>
        </View>
        <View
          style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
          <TouchableOpacity>
            <MaterialIcons
              name="more-vert"
              style={{fontSize: 23, marginHorizontal: 12, color: '#666'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          width: Dimensions.get('window').width,
          marginTop: 20,
        }}>
        {/* Task Active */}
        <View
          style={{
            width: '95%',
            marginHorizontal: '2.5%',
            backgroundColor: 'white',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#eee',
            height: 'auto',
          }}>
          <View
            style={{
              width: '90%',
              height: 70,
              borderWidth: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: '5%',
            }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const CheckListScreen = () => {
  return (
    <>
      <Layout Child={LayoutCheckList} />
    </>
  );
};

export default CheckListScreen;
