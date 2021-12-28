import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {Layout} from '../components/organism';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {API_URL} from '../config';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';

const Loading = () => {
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const ViewNotes = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    axios
      .get(`${API_URL}notes`)
      .then(res => {
        setNotes(res.data.data);
      })
      .catch(err => {
        console.log(json.stringify(err));
      });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fffafa',
        display: 'flex',
      }}>
      {isLoading && <Loading />}
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
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome
              name="navicon"
              style={{fontSize: 18, marginHorizontal: 12, color: '#666'}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
              Notes
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Search your notes"
            style={{
              borderWidth: 1,
              borderColor: '#eee',
              padding: 0,
              width: 210,
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 2,
            }}
          />
          <TouchableOpacity>
            <MaterialIcons
              name="more-vert"
              style={{fontSize: 23, marginHorizontal: 12, color: '#666'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Content */}
      <FlatList
        keyExtractor={item => item.id}
        data={notes}
        refreshing={isLoading}
        onRefresh={getNotes}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          marginVertical: 20,
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
            //   onPress={() => {
            //     navigation.navigate('CreateSchedule', item);
            //   }}
            >
              <View
                style={{
                  display: 'flex',
                  width: '93%',
                  height: 110,
                  borderWidth: 1,
                  marginHorizontal: 12,
                  borderRadius: 5,
                  marginBottom: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRightWidth: 4,
                  borderTopColor: '#eee',
                  borderLeftColor: '#eee',
                  borderBottomColor: '#eee',
                  borderRightColor: '#E2DC00',
                  shadowColor: '#666',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  elevation: 1,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      width: '80%',
                      fontWeight: 'bold',
                      fontSize: 16.5,
                      color: '#555',
                    }}>
                    {item.name}
                  </Text>
                  {/* {item.is_alarm === '1' && (
                    <MaterialIcons
                      name="alarm-on"
                      style={{
                        fontSize: 19,
                        marginLeft: -20,
                        color: '#ccc',
                      }}
                    />
                  )} */}
                </View>
                <Text style={{width: '80%', color: '#999', fontSize: 13.6}}>
                  {moment(item.date).format('LL')} -{' '}
                  {moment(item.date).format('LT')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const NotesScreen = () => {
  return (
    <>
      <Layout Child={ViewNotes} />
    </>
  );
};

export default NotesScreen;
