import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {Layout} from '../components/organism';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const ViewCreateSchedule = () => {
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState({
    [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD',
    )}`]: {
      selected: true,
      selectedColor: '#2E66E7',
    },
  });
  const [currentDay, setCurrentDay] = useState(moment().format());
  return (
    <View style={{backgroundColor: '#fffafa', flex: 1}}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'flex-start',

          height: 40,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <AntDesign
            name="arrowleft"
            style={{marginLeft: 20, fontSize: 25, color: '#ff6d6d'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 17,
            color: '#555',
            marginLeft: 100,
          }}>
          New Task
        </Text>
      </View>
      <ScrollView>
        <CalendarList
          style={{
            width: 360,
            height: 350,
            backgroundColor: '#fffafa',
          }}
          // monthFormat="yyyy MMMM"
          // markingType="custom"
          theme={{
            selectedDayBackgroundColor: 'blue',
            selectedDayTextColor: 'red',
            todayTextColor: 'red',
            backgroundColor: '#fffafa',
            calendarBackground: '#fffafa',
            textDisabledColor: '#d9dbe0',
          }}
          minDate={moment().format()}
          current={currentDay}
          onDayPress={day => {
            setSelectedDay({
              [day.dateString]: {
                selected: true,
                selectedColor: '#2E66E7',
              },
            });
            setCurrentDay(day.dateString);
          }}
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          verticalScroll={false}
          calendarWidth={360}

          // Set custom calendarWidth.
        />
        <View
          style={{
            width: '90%',
            height: 'auto',
            marginHorizontal: '5%',
            borderWidth: 1,
            borderColor: '#ddd',
            backgroundColor: 'white',
            borderRadius: 20,
            marginBottom: 20,
            paddingBottom: 20,
          }}>
          <View style={{width: '90%', marginHorizontal: '5%', marginTop: 20}}>
            <TextInput
              style={{
                borderLeftWidth: 2,
                borderColor: '#eee',
                fontWeight: 'bold',
                paddingTop: 0,
                paddingBottom: 0,
                fontSize: 18,
                paddingLeft: 10,
                color: '#222D31',
              }}
            />
            <Text style={{color: '#bbb', marginTop: 5}}>Suggestion</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 5,
                borderBottomWidth: 2,
                paddingBottom: 10,
                borderColor: '#eee',
              }}>
              <Text
                style={{
                  marginRight: 5,
                  backgroundColor: '#FAD04C',
                  borderRadius: 3,
                  padding: 2,
                  paddingLeft: 5,
                  paddingRight: 5,
                }}>
                Meeting
              </Text>
              <Text
                style={{
                  marginRight: 5,
                  backgroundColor: '#58C4FB',
                  borderRadius: 3,
                  padding: 2,
                  paddingLeft: 5,
                  paddingRight: 5,
                }}>
                Dinner
              </Text>
              <Text
                style={{
                  marginRight: 5,
                  backgroundColor: '#49CB62',
                  borderRadius: 3,
                  padding: 2,
                  paddingLeft: 5,
                  paddingRight: 5,
                }}>
                Read Book
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              marginHorizontal: '5%',
              marginTop: 10,
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderColor: '#eee',
            }}>
            <Text style={{color: '#888', fontSize: 15, marginBottom: 5}}>
              Notes
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={5}
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                fontSize: 19,
                color: '#222D31',
                height: 60,
                textAlignVertical: 'top',
                fontSize: 16,
              }}
            />
          </View>
          <View
            style={{
              width: '90%',
              marginHorizontal: '5%',
              marginTop: 10,
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderColor: '#eee',
            }}>
            <Text style={{color: '#888', fontSize: 15, marginBottom: 5}}>
              Times
            </Text>
            <Text style={{fontSize: 18, paddingTop: 5, paddingBottom: 5}}>
              12:00 AM
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              marginHorizontal: '5%',
              marginTop: 10,
              paddingBottom: 10,
            }}>
            <Text style={{color: '#888', fontSize: 15, marginBottom: 5}}>
              Alarm
            </Text>
            <Text style={{fontSize: 18, paddingTop: 5, paddingBottom: 5}}>
              12:00 AM
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const CreateSchedule = () => {
  return (
    <>
      <Layout Child={ViewCreateSchedule} />
    </>
  );
};

export default CreateSchedule;
