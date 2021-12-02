import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../components/organism/Layout';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FloatingButton} from '../components/organism';

const HomeScreen = () => {
  const [markedDate, setMarkedDate] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD',
    )}`,
  );

  const datesWhitelist = [
    {
      start: moment(),
      end: moment().add(365, 'days'), // total 4 days enabled
    },
  ];

  const ViewHome = () => {
    return (
      <SafeAreaView style={{backgroundColor: 'white', position: 'relative'}}>
        <CalendarStrip
          calendarAnimation={{type: 'sequence', duration: 40}}
          daySelectionAnimation={{
            type: 'background',
            duration: 80,
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
          // innerStyle={{
          //   borderWidth: 1,
          //   borderColor: 'red',
          // }}
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
          // If you get this error => undefined is not an object (evaluating 'datesList[_this.state.numVisibleDays - 1].date')
          // temp: https://github.com/BugiDev/react-native-calendar-strip/issues/303#issuecomment-864510769
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
        <ScrollView
          style={{
            width: '100%',
            height: 470,

            // borderWidth: 1,
            // borderColor: 'blue',
          }}>
          <TouchableOpacity>
            <View
              style={{
                display: 'flex',
                width: '93%',
                height: 110,
                borderWidth: 1,
                marginHorizontal: 12,
                borderRadius: 5,
                marginBottom: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRightWidth: 4,
                borderTopColor: '#eee',
                borderLeftColor: '#eee',
                borderBottomColor: '#eee',
                borderRightColor: '#E2DC00',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Entypo
                  name="controller-record"
                  style={{
                    marginRight: 4,
                    fontSize: 12,
                    marginLeft: 10,
                    color: 'whitesmoke',
                  }}
                />
                <Text
                  style={{
                    width: '80%',
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#666',
                  }}>
                  Dinner
                </Text>
                <MaterialIcons
                  name="alarm-on"
                  style={{
                    fontSize: 20,
                    marginLeft: -20,
                    color: '#ccc',
                  }}
                />
              </View>
              <Text style={{width: '80%', color: '#999'}}>
                2021/11/30 - 07.00am | Dinner with mr.Ujo
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: 'flex',
                width: '93%',
                height: 110,
                borderWidth: 1,
                marginHorizontal: 12,
                borderRadius: 5,
                marginBottom: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRightWidth: 4,
                borderTopColor: '#eee',
                borderLeftColor: '#eee',
                borderBottomColor: '#eee',
                borderRightColor: '#E2DC00',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Entypo
                  name="controller-record"
                  style={{
                    marginRight: 4,
                    fontSize: 12,
                    marginLeft: 10,
                    color: 'whitesmoke',
                  }}
                />
                <Text
                  style={{
                    width: '80%',
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#666',
                  }}>
                  Zoom Meeting
                </Text>
              </View>
              <Text style={{width: '80%', color: '#999'}}>
                2021/11/30 - 07.00am | With PT. Ekatunggal Tunas Mandiri
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: 'flex',
                width: '93%',
                height: 110,
                borderWidth: 1,
                marginHorizontal: 12,
                borderRadius: 5,
                marginBottom: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRightWidth: 4,
                borderTopColor: '#eee',
                borderLeftColor: '#eee',
                borderBottomColor: '#eee',
                borderRightColor: '#E2DC00',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Entypo
                  name="controller-record"
                  style={{
                    marginRight: 4,
                    fontSize: 12,
                    marginLeft: 10,
                    color: 'whitesmoke',
                  }}
                />
                <Text
                  style={{
                    width: '80%',
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#666',
                  }}>
                  Meeting
                </Text>
              </View>
              <Text style={{width: '80%', color: '#999'}}>
                2021/11/30 - 07.00am | Having meeting with clients
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <FloatingButton />
      </SafeAreaView>
    );
  };

  return (
    <>
      <Layout Child={ViewHome} />
    </>
  );
};

export default HomeScreen;
