import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import {Layout} from '../components/organism';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ViewCreateSchedule = () => {
  const navigation = useNavigation();
  const [isAlarmSet, setAlarmSet] = useState(false);
  const [alarmTime, setAlarmTime] = useState(moment().format());
  const [taskTime, setTaskTime] = useState(moment().format());
  const [taskText, setTaskText] = useState('');
  const [notesText, setNotesText] = useState('');
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const handleAlarmSet = () => {
    setAlarmSet(!isAlarmSet);
  };
  const [selectedDay, setSelectedDay] = useState({
    [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD',
    )}`]: {
      selected: true,
      selectedColor: '#ff6d6d',
    },
  });
  const [currentDay, setCurrentDay] = useState(moment().format());
  const showDateTimePicker = modeTime => {
    setDateTimePickerVisible(true);
    setWhatTime(modeTime);
  };
  const hideDateTimePicker = () => setDateTimePickerVisible(false);
  const [whatTime, setWhatTime] = useState('');

  const handleDatePicked = date => {
    const selectedDatePicked = currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute);
    hideDateTimePicker();
    if (whatTime === 'taskTime') {
      setTaskTime(newModifiedDay);
      setAlarmTime(newModifiedDay);
    } else {
      setAlarmTime(newModifiedDay);
    }
  };

  return (
    <View style={{backgroundColor: '#fffafa', flex: 1}}>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode="time"
        date={new Date()}
        isDarkModeEnabled
      />
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
            selectedDayTextColor: 'white',
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
                selectedColor: '#ff6d6d',
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
          markedDates={selectedDay}

          // Set custom calendarWidth.
        />
        <View
          style={{
            width: '90%',
            height: 'auto',
            marginHorizontal: '5%',
            borderWidth: 1,
            borderColor: '#eee',
            backgroundColor: 'white',
            borderRadius: 20,
            marginBottom: 20,
            paddingBottom: 20,
            // shadowColor: '#666',
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: 0.6,
            // shadowRadius: 2,
            // elevation: 2,
          }}>
          <View style={{width: '90%', marginHorizontal: '5%', marginTop: 20}}>
            <TextInput
              style={{
                borderLeftWidth: 2,
                borderColor: '#eee',
                paddingTop: 0,
                paddingBottom: 0,
                fontSize: 17,
                paddingLeft: 10,
                color: '#222D31',
                fontWeight: 'bold',
              }}
              onChangeText={setTaskText}
              value={taskText}
              placeholderTextColor="#ddd"
              placeholder="What do you need to do?"
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
            <Text style={{color: '#9CAAC4', fontSize: 15, marginBottom: 5}}>
              Notes
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={5}
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                color: '#222D31',
                height: 60,
                textAlignVertical: 'top',
                fontSize: 17,
              }}
              onChangeText={setNotesText}
              value={notesText}
              placeholderTextColor="#ddd"
              placeholder="Enter notes about the task."
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
            <Text style={{color: '#9CAAC4', fontSize: 15, marginBottom: 5}}>
              Times
            </Text>
            <TouchableOpacity onPress={() => showDateTimePicker('taskTime')}>
              <Text style={{fontSize: 17, paddingTop: 5, paddingBottom: 5}}>
                {moment(taskTime).format('h:mm A')}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '90%',
              marginHorizontal: '5%',
              marginTop: 10,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: '#eee',
            }}>
            <Text style={{color: '#9CAAC4', fontSize: 15, marginBottom: 5}}>
              Alarm
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => showDateTimePicker('alarm')}>
                <Text style={{fontSize: 17}}>
                  {moment(alarmTime).format('h:mm A')}
                </Text>
              </TouchableOpacity>
              <Switch
                value={isAlarmSet}
                onValueChange={handleAlarmSet}
                trackColor={{false: '#767577', true: '#ffcbcc'}}
                thumbColor={isAlarmSet ? '#ff7f7f' : '#f4f3f4'}
              />
            </View>
          </View>
          <View
            style={{
              width: '90%',
              marginHorizontal: '5%',
              marginTop: 10,
              paddingBottom: 10,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#9CAAC4', fontSize: 16, marginBottom: 5}}>
              Lampiran
            </Text>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity>
                <MaterialIcons
                  name="photo-camera"
                  style={{fontSize: 22, marginTop: 2, color: '#bbb'}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons
                  name="record-voice-over"
                  style={{fontSize: 20, color: '#bbb'}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons
                  name="attach-file"
                  style={{fontSize: 20, color: '#bbb'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              width: '90%',
              height: 'auto',
              marginHorizontal: '5%',
              marginBottom: 10,
            }}>
            <TouchableOpacity>
              <Image
                style={{width: '100%', height: 210, marginTop: 12}}
                source={{
                  uri: 'https://awsimages.detik.net.id/community/media/visual/2016/12/14/e034adf1-4f4f-49b1-9aa0-a97df560a32e.jpg?w=700&q=90',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{width: '100%', height: 210, marginTop: 12}}
                source={{
                  uri: 'https://images.pexels.com/photos/2116715/pexels-photo-2116715.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            width: '72%',
            marginHorizontal: '14%',
            height: 46,
            marginBottom: 30,
            marginTop: 10,
            borderRadius: 7,
            backgroundColor: 'red',
            borderColor: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>ADD YOUR TASK</Text>
        </TouchableOpacity>
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
