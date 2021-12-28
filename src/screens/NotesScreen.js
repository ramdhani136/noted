import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import {FloatingButton, Layout} from '../components/organism';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {API_URL} from '../config';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import {RectButton} from 'react-native-gesture-handler';
import _ from 'lodash';
import {CreateNote} from '.';

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

const renderRightActions = (progress, dragX) => {
  const trans = dragX.interpolate({
    inputRange: [0, 50, 100, 101],
    outputRange: [-20, 0, 0, 1],
  });
  return (
    <RectButton
      style={{
        width: '90%',
        display: 'flex',
        backgroundColor: '#e57474',
        marginTop: 1,
        marginBottom: 17,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%',
      }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}> DELETE</Text>
        <MaterialCommunityIcons
          name="delete-empty"
          style={{
            fontSize: 25,
            marginLeft: 3,
            alignItems: 'center',
            color: 'white',
          }}
        />
      </View>
    </RectButton>
  );
};

const ViewNotes = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [swipeRef, setSwipeRef] = useState([]);
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [selectItem, setSelectItem] = useState({});

  const getNotes = () => {
    axios
      .get(`${API_URL}notes`)
      .then(res => {
        setNotes(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(json.stringify(err));
        setLoading(false);
      });
  };

  const getDelete = id => {
    axios
      .delete(`${API_URL}notes/${id}`)
      .then(res => {
        Alert.alert('Deleted', 'Note Success To Delete');
        //   getDeleteFiles(id);
        getNotes();
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  const handleDelete = id => {
    Alert.alert('Delete', 'Are you sure?', [
      {text: 'NO', style: 'cancel'},
      {text: 'YES', onPress: () => getDelete(id)},
    ]);
  };

  const handleCreate = () => {
    setIsActive(true);
  };

  const filter = data => {
    return _.filter(data, function (query) {
      var name = value
          ? query.name.toLowerCase().includes(value.toLowerCase())
          : true,
        note = query.note
          ? query.note.toLowerCase().includes(value.toLowerCase())
          : true;

      return name || note;
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <CreateNote
        isActive={isActive}
        setIsActive={setIsActive}
        selectItem={selectItem}
        setSelectItem={setSelectItem}
      />
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
                style={{fontSize: 17, marginHorizontal: 12, color: '#666'}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{display: 'flex', alignItems: 'center'}}>
              <Text style={{fontSize: 14, color: '#aaa'}}>
                {filter(notes).length}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                  marginTop: -3,
                }}>
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
              position: 'relative',
            }}>
            <TextInput
              onChangeText={text => setValue(text)}
              value={value}
              placeholder="Search your notes"
              style={{
                borderWidth: 1,
                borderColor: '#eee',
                padding: 0,
                width: 210,
                padding: 6,
                paddingHorizontal: 10,
                borderRadius: 2,
              }}
            />
            {value ? (
              <TouchableOpacity
                onPress={() => setValue('')}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  right: 55,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Entypo
                  name="cross"
                  style={{fontSize: 23, color: '#bbb', marginTop: -1}}
                />
              </TouchableOpacity>
            ) : null}
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
          data={filter(notes)}
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
              <Swipeable
                ref={ref => {
                  swipeRef[item.id] = ref;
                }}
                renderRightActions={renderRightActions}
                onSwipeableRightOpen={() => {
                  handleDelete(item.id);
                  swipeRef[item.id].close();
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectItem(item);
                    setIsActive(true);
                  }}>
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
              </Swipeable>
            );
          }}
        />
        {filter(notes).length < 1 && !isLoading ? (
          <View
            style={{
              width: '100%',
              height: 200,
              height: '68%',
              marginTop: -50,
              marginTop: 120,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: 150,
                  height: 180,
                  resizeMode: 'contain',
                }}
                source={require('../assets/nodata.png')}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                No records found
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 5,
                  textAlign: 'center',
                  color: '#ccc',
                }}>
                Set your note in this app
              </Text>
            </View>
          </View>
        ) : // <Text
        //   style={{
        //     textAlign: 'center',
        //     position: 'absolute',
        //     left: 0,
        //     right: 0,
        //     top: Dimensions.get('window').width / 1.1,
        //     color: '#ddd',
        //     fontSize: 15,
        //   }}>
        //   No schedule Data
        // </Text>
        null}
        <FloatingButton action={handleCreate} />
      </View>
    </>
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
