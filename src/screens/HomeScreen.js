import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../components/organism/Layout';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FloatingButton} from '../components/organism';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '../config';
import _ from 'lodash';

const HomeScreen = () => {
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
    axios
      .get(`${API_URL}schedule`)
      .then(res => {
        setSchedules(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        throw err;
      });
  };

  useEffect(() => {
    getSchedules();
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
                          fontSize: 17,
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
                    <Text style={{width: '80%', color: '#999', fontSize: 13.6}}>
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
              );
            }}
          />
          {filterdata(schedules).length < 1 && !isLoading ? (
            <Text
              style={{
                textAlign: 'center',
                position: 'absolute',
                left: 0,
                right: 0,
                top: Dimensions.get('window').width / 1.1,
                color: '#ddd',
                fontSize: 15,
              }}>
              No schedule Data
            </Text>
          ) : null}
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
