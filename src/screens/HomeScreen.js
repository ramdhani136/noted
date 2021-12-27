import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Button,
  Animated,
  Image,
  Alert,
} from 'react-native';
import Layout from '../components/organism/Layout';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FloatingButton} from '../components/organism';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '../config';
import _, {first} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getCount} from '../config/redux/slices/CountSlice';
import PushNotification from 'react-native-push-notification';
import {selectUser} from '../config/redux/slices/UserSlice';

const HomeScreen = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [markedDate, setMarkedDate] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD',
    )}`,
  );
  const [isLoading, setIsLoading] = useState(true);

  const getSchedules = () => {
    AsyncStorage.getItem('user').then(value => {
      const valueJson = JSON.parse(value);
      // setUserId(valueJson.id);
      axios
        .get(`${API_URL}schedule/${valueJson.id}`)
        .then(res => {
          setSchedules(res.data.data);
          dispatch(getCount({schedule: res.data.data.length}));
          setIsLoading(false);
        })
        .catch(err => {
          // throw err;
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    getSchedules();
    // const Check = () => {
    //   AsyncStorage.getItem('isLogin').then(value => {
    //     if (value) {
    //       // navigation.navigate('Home');
    //       // navigation.replace('HomeScreen');
    //       console.log(value);
    //     }
    //   });
    // };
    // const run = async () => {
    //   const First = await getSchedules();
    //   Check(first);
    // };
    // run();
  }, []);

  // useEffect(() => {
  //   window.Echo.channel('location').listen('LocationCreated', event => {
  //     setCustomerList(event.location);
  //   });
  // });

  useEffect(() => {
    const uniqueValuesSet = new Set();
    const filteredArr = schedules.filter(obj => {
      // check if name property value is already in the set
      const isPresentInSet = uniqueValuesSet.has(obj.date);

      // add name property value to Set
      uniqueValuesSet.add(obj.date);

      // return the negated value of
      // isPresentInSet variable
      return !isPresentInSet;
    });

    const dataMark = [];
    filteredArr.map(item => {
      dataMark.push({
        date: moment(item.date, 'YYYY/MM/DD'),
        dots: [
          {
            key: 1,
            color: '#ff9898',
            selectedDotColor: '#ff6d6d',
          },
        ],
      });
    });

    setMarkedDate(dataMark);
  }, [schedules]);

  const datesWhitelist = [
    {
      start: moment('2020-01-01'),
      end: moment().add(365, 'days'), // total 4 days enabled
    },
  ];

  const handleCreate = () => {
    navigation.navigate('CreateSchedule');
  };

  const filterdata = data => {
    return _.filter(data, function (query) {
      var date = currentDate
        ? query.date.toLowerCase().includes(currentDate.toLowerCase())
        : true;

      return date;
    });
  };

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

  const ViewHome = () => {
    const [swipeRef, setSwipeRef] = useState([]);

    const handleDelete = id => {
      Alert.alert('Delete', 'Are you sure?', [
        {text: 'NO', style: 'cancel'},
        {text: 'YES', onPress: () => getDelete(id)},
      ]);
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

    return (
      <>
        {isLoading && <Loading />}
        <SafeAreaView
          style={{
            backgroundColor: '#fffafa',
            position: 'relative',
            height: '100%',
          }}>
          <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={{
              type: 'border',
              duration: 200,
              borderHighlightColor: 'white',
            }}
            style={{
              height: 150,
              paddingTop: 20,
              paddingBottom: 20,
            }}
            calendarHeaderStyle={{
              color: '#000000',
              fontSize: 14,
            }}
            dateNumberStyle={{color: '#444', paddingTop: 10}}
            dateNameStyle={{color: '#BBBBBB'}}
            highlightDateNumberStyle={{
              color: '#fff',
              backgroundColor: 'red',
              marginTop: 10,
              height: 35,
              width: 35,
              textAlign: 'center',
              borderRadius: 17.5,
              overflow: 'hidden',
              paddingTop: 6,
              fontWeight: '400',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.5,
            }}
            highlightDateNameStyle={{
              color: 'red',
              opacity: 0.5,
            }}
            disabledDateNameStyle={{color: 'grey'}}
            disabledDateNumberStyle={{color: 'grey', paddingTop: 10}}
            datesWhitelist={datesWhitelist}
            iconLeft={require('../assets/left-arrow.png')}
            iconRight={require('../assets/right-arrow.png')}
            iconContainer={{flex: 0.1}}
            markedDates={markedDate}
            selectedDate={currentDate}
            // scrollable={true}
            // scrollerPaging={true}
            onDateSelected={date => {
              const selectedDate = `${moment(date.valueOf()).format(
                'YYYY',
              )}-${moment(date.valueOf()).format('MM')}-${moment(
                date.valueOf(),
              ).format('DD')}`;
              // updateCurrentTask(selectedDate);
              setCurrentDate(selectedDate);
            }}
          />

          <FlatList
            keyExtractor={item => item.id}
            data={filterdata(schedules)}
            refreshing={isLoading}
            onRefresh={getSchedules}
            style={{
              width: '100%',
              height: '100%',
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
                      navigation.navigate('CreateSchedule', item);
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
                        // borderRightColor: '#E2DC00',
                        borderRightColor:
                          item.status === '1' ? '#E2DC00' : '#bfbfbf',
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
                        {item.is_alarm === '1' && (
                          <MaterialIcons
                            name="alarm-on"
                            style={{
                              fontSize: 19,
                              marginLeft: -20,
                              color: '#ccc',
                            }}
                          />
                        )}
                      </View>
                      <Text
                        style={{width: '80%', color: '#999', fontSize: 13.6}}>
                        {moment(item.date).format('LL')} -{' '}
                        {moment(item.date + ' ' + item.time).format('LT')}
                      </Text>
                      <Text
                        style={{width: '80%', color: '#999', fontSize: 13.6}}
                        numberOfLines={1}>
                        {item.note}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Swipeable>
              );
            }}
          />
          {filterdata(schedules).length < 1 && !isLoading ? (
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
        </SafeAreaView>
      </>
    );
  };

  return (
    <>
      <Layout btnActive="schedule" Child={ViewHome} />
    </>
  );
};

export default HomeScreen;
