import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  Keyboard,
  KeyboardEvent,
} from 'react-native';
import {FloatingButton, Layout, ModalCreateTask} from '../components/organism';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import {API_URL} from '../config';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {getCount} from '../config/redux/slices/CountSlice';

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
        width: '95%',
        display: 'flex',
        backgroundColor: '#e57474',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        marginHorizontal: '2.5%',
        marginVertical: 10,
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

const LayoutCheckList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [today, isToday] = useState(
    `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD',
    )}`,
  );
  const [isDate, setIsDate] = useState(
    `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD',
    )}`,
  );
  const [swipeRef, setSwipeRef] = useState([]);

  const [modalActive, setModalActive] = useState(false);

  const hideDateTimePicker = () => setDateTimePickerVisible(false);

  const getSchedules = () => {
    AsyncStorage.getItem('user').then(value => {
      const valueJson = JSON.parse(value);
      setUserId(valueJson.id);
      axios
        .get(`${API_URL}schedule/${valueJson.id}`)
        .then(res => {
          setSchedules(res.data.data);
          dispatch(getCount({schedule: res.data.data.length}));
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
        });
    });
  };

  const onKeyboardDidShow = KeyboardEvent => {
    // setKeyboardHeight(KeyboardEvent.endCoordinates.height);
    // console.log('open');
  };

  const onKeyboardDidHide = () => {
    // setKeyboardHeight(0);
    setModalActive(false);
  };

  useEffect(() => {
    getSchedules();
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
  }, []);

  const updateStatus = (id, newStatus) => {
    var isStatus;
    if (newStatus === '0') {
      isStatus = '1';
    } else {
      isStatus = '0';
    }
    axios
      .put(`${API_URL}schedule/${id}`, {status: isStatus})
      .then(res => {
        getSchedules();
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const filterActive = data => {
    return _.filter(data, function (query) {
      var date = isDate
          ? query.date.toLowerCase().includes(isDate.toLowerCase())
          : true,
        status = query.status ? query.status.toLowerCase().includes('1') : true;

      return date && status;
    });
  };

  const filterCompleted = data => {
    return _.filter(data, function (query) {
      var date = isDate
          ? query.date.toLowerCase().includes(isDate.toLowerCase())
          : true,
        status = query.status ? query.status.toLowerCase().includes('0') : true;

      return date && status;
    });
  };

  const handleDatePicked = date => {
    setIsDate(
      `${moment(date).format('YYYY')}-${moment(date).format('MM')}-${moment(
        date,
      ).format('DD')}`,
    );

    setDateTimePickerVisible(false);
  };

  const handleDelete = id => {
    Alert.alert('Delete', 'Are you sure?', [
      {text: 'NO', style: 'cancel'},
      {text: 'YES', onPress: () => getDelete(id)},
    ]);
  };

  const getDelete = id => {
    axios
      .delete(`${API_URL}schedule/${id}`)
      .then(res => {
        Alert.alert('Deleted', 'Data Success To Delete');
        getDeleteFiles(id);
        getSchedules();
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  const getDeleteFiles = id => {
    axios.get(`${API_URL}files/${id}`).then(res => {
      if (res.data.data.length > 0) {
        const file = res.data.data;
        for (let i = 0; i < file.length; i++) {
          axios
            .delete(`${API_URL}files/${file[i].id}`)
            .then(res => {
              console.log(`${id} berhasil di hapus`);
            })
            .catch(err => {
              console.log(JSON.stringify(err));
            });
        }
      }
    });
  };

  return (
    <>
      <ModalCreateTask
        isActive={modalActive}
        setActive={setModalActive}
        setDate={setDateTimePickerVisible}
        getSchedules={getSchedules}
        date={isDate}
      />
      <DateTimePicker
        isVisible={dateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode="date"
        date={new Date()}
        isDarkModeEnabled
      />
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: '#fffafa',
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
            <TouchableOpacity
              onPress={() => {
                setDateTimePickerVisible(true);
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                {today === isDate
                  ? 'Today'
                  : moment(isDate).format('DD MMMM YYYY')}
              </Text>
            </TouchableOpacity>
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
          {filterActive(schedules).length > 0 && (
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
              {filterActive(schedules).map((item, id) => (
                <Swipeable
                  key={id}
                  ref={ref => {
                    swipeRef[item.id] = ref;
                  }}
                  renderRightActions={renderRightActions}
                  onSwipeableRightOpen={() => {
                    handleDelete(item.id);
                    swipeRef[item.id].close();
                  }}>
                  <View
                    key={id}
                    style={{
                      width: '95%',
                      height: 50,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                      marginHorizontal: '2.5%',
                      backgroundColor: 'white',
                    }}>
                    <CheckBox
                      value={false}
                      tintColors={{true: '#ff0000'}}
                      onCheckColor={'#6F763F'}
                      onFillColor={'#4DABEC'}
                      onTintColor={'#F4DCF8'}
                      animationDuration={0.5}
                      disabled={false}
                      onAnimationType={'bounce'}
                      offAnimationType={'stroke'}
                      onValueChange={() => updateStatus(item.id, '1')}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('CreateSchedule', item);
                      }}
                      style={{
                        display: 'flex',
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          marginLeft: 10,
                          marginTop: 5,
                          color: '#333',
                          fontSize: 15,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          marginLeft: 10,
                          marginTop: -5,
                          color: '#999',
                        }}>
                        {moment(`${item.date} ${item.time}`).format('h:mm A')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Swipeable>
              ))}
            </View>
          )}

          {/* Task Complete */}

          <View
            style={{
              marginVertical: 15,
              width: '95%',
              marginHorizontal: '2.5%',
              backgroundColor: 'white',
              borderRadius: 5,
              borderWidth: filterCompleted(schedules).length > 0 ? 1 : 0,
              borderColor: '#eee',
              height: 'auto',
              marginBottom: 90,
            }}>
            {filterCompleted(schedules).length > 0 && (
              <Text
                style={{
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 15,
                  color: '#333',
                  paddingBottom: 10,
                }}>
                COMPLETED
              </Text>
            )}
            {filterCompleted(schedules).map((item, id) => (
              <View
                key={id}
                style={{
                  width: '95%',
                  height: 50,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  marginHorizontal: '2.5%',
                }}>
                <CheckBox
                  value={true}
                  tintColors={{true: '#ff0000'}}
                  onCheckColor={'#6F763F'}
                  onFillColor={'#4DABEC'}
                  onTintColor={'#F4DCF8'}
                  animationDuration={0.5}
                  disabled={false}
                  onAnimationType={'bounce'}
                  offAnimationType={'stroke'}
                  onValueChange={() => updateStatus(item.id, '0')}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CreateSchedule', item);
                  }}
                  style={{
                    display: 'flex',
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      marginTop: 5,
                      color: '#333',
                      fontSize: 15,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      marginTop: -5,
                      color: '#999',
                    }}>
                    {moment(`${item.date} ${item.time}`).format('h:mm A')}{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {filterActive(schedules).length < 1 &&
            filterCompleted(schedules).length < 1 && (
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
                  You have a free day
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 5,
                    textAlign: 'center',
                    color: '#ccc',
                  }}>
                  it's all clear, Relax and recharge
                </Text>
              </View>
              // <Text
              //   style={{
              //     textAlign: 'center',
              //     marginTop: 40,
              //     color: '#ccc',
              //     fontSize: 14.5,
              //   }}>
              //   No Task Data
              // </Text>
            )}
        </ScrollView>
      </View>
      <FloatingButton action={() => setModalActive(true)} />
    </>
  );
};

const CheckListScreen = () => {
  return (
    <>
      <Layout btnActive="task" Child={LayoutCheckList} />
    </>
  );
};

export default CheckListScreen;
