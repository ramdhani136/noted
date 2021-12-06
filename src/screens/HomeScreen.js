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
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [markedDate, setMarkedDate] = useState([]);
  // const [markedDate, setMarkedDate] = useState([
  //   {
  //     date: '12/04/2021',
  //     dots: [
  //       {
  //         key: 1,
  //         color: '#ff9898',
  //         selectedDotColor: '#ff6d6d',
  //       },
  //     ],
  //   },
  //   {
  //     date: '12/05/2021',
  //     dots: [
  //       {
  //         key: 1,
  //         color: '#ff9898',
  //         selectedDotColor: '#ff6d6d',
  //       },
  //     ],
  //   },
  // ]);
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

  const handleCreate = () => {
    navigation.navigate('CreateSchedule');
  };

  const ViewHome = () => {
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#fffafa',
          position: 'relative',
          // borderWidth: 1,
          height: '100%',
        }}>
        <CalendarStrip
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            // borderWidth: 1,
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
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
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
                {/* <Entypo
                  name="controller-record"
                  style={{
                    marginRight: 4,
                    fontSize: 12,
                    marginLeft: 10,
                    color: '#ffcc98',
                  }}
                /> */}
                <Text
                  style={{
                    width: '80%',
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#555',
                  }}>
                  Dinner
                </Text>
                <MaterialIcons
                  name="alarm-on"
                  style={{
                    fontSize: 19,
                    marginLeft: -20,
                    color: '#ccc',
                  }}
                />
              </View>
              <Text style={{width: '80%', color: '#999', fontSize: 13.6}}>
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
                {/* <Entypo
                  name="controller-record"
                  style={{
                    marginRight: 4,
                    fontSize: 12,
                    marginLeft: 10,
                    color: '#ffcc98',
                  }}
                /> */}
                <Text
                  style={{
                    width: '80%',
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#555',
                  }}>
                  Zoom Meeting
                </Text>
              </View>
              <Text style={{width: '80%', color: '#999', fontSize: 13.6}}>
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
                borderRightColor: '#bfbfbf',
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
                {/* <Entypo
                  name="controller-record"
                  style={{
                    marginRight: 4,
                    fontSize: 12,
                    marginLeft: 10,
                    color: '#bfbfbf',
                  }}
                /> */}
                <Text
                  style={{
                    width: '80%',
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#555',
                  }}>
                  Meeting
                </Text>
              </View>
              <Text style={{width: '80%', color: '#999', fontSize: 13.6}}>
                2021/11/30 - 07.00am | Having meeting with clients
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <FloatingButton action={handleCreate} />
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
