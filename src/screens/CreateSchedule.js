import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  Image,
  Modal,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import {Layout, PdfComponent} from '../components/organism';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {API_URL, BASE_URL, STORAGE_URL} from '../config';

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

const ViewCreateSchedule = ({doc}) => {
  const navigation = useNavigation();
  const [isAlarmSet, setAlarmSet] = useState(false);
  const [alarmTime, setAlarmTime] = useState(moment().format());
  const [taskTime, setTaskTime] = useState(moment().format());
  const [imageUri, setImageUri] = useState([]);
  const [viewImgUri, setViewImgUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPdf, setModalPdf] = useState(false);
  // const [modalRecord, setModalRecord] = useState(false);
  const [files, setFiles] = useState([]);
  const [upFiles, setUpFiles] = useState([]);
  const [typeImage, setTypeImage] = useState('');
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [whatTime, setWhatTime] = useState('');
  const [sourcePdf, setSourcePdf] = useState('');
  const [btnSubmitActive, setBtnSubmitActive] = useState(false);
  const [btnUpdate, setBtnUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [dbFiles, setDBFiles] = useState([]);
  const [idDbImage, setIdDbImage] = useState('');

  const [value, setValue] = useState({
    date: `${moment().format('YYYY')}-${moment().format(
      'MM',
    )}-${moment().format('DD')}`,
    name: '',
    note: '',
    time: moment(taskTime).format('HH:mm:ss'),
    time_alarm: moment(taskTime).format('HH:mm:ss'),
    id_user: 1,
    is_alarm: '0',
    status: '1',
  });

  const handleAlarmSet = () => {
    setAlarmSet(!isAlarmSet);
    setValue({...value, is_alarm: `${isAlarmSet ? '0' : '1'}`});
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

  const handleDatePicked = date => {
    const selectedDatePicked = currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute);
    hideDateTimePicker();
    if (whatTime === 'taskTime') {
      setTaskTime(newModifiedDay);
      setAlarmTime(newModifiedDay);
      setValue({
        ...value,
        time: moment(newModifiedDay).format('HH:mm:ss'),
        time_alarm: moment(newModifiedDay).format('HH:mm:ss'),
      });
    } else {
      setAlarmTime(newModifiedDay);
      setValue({
        ...value,
        time_alarm: moment(newModifiedDay).format('HH:mm:ss'),
      });
    }
  };

  const openCamera = () => {
    let options = {
      stotageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      // console.log('response =', response);
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.error) {
        console.log(response.error);
      } else if (response.customButton) {
        console.log(response.customButton);
      } else {
        // const source = 'data:image/jpeg;base64,' + response.assets[0].base64;
        setImageUri([
          ...imageUri,
          {
            name: `${moment()}.jpg`,
            uri: response.assets[0].uri,
            type: 'image/jpeg',
          },
        ]);
      }
    });
  };

  // const [modalRecord, setModalRecord] = useState(false);

  const pickFIle = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.audio,
          DocumentPicker.types.zip,
          DocumentPicker.types.csv,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
        ],
      });
      if (res[0].name === undefined) {
        res[0] = {
          fileCopyUri: null,
          name: `${moment()}.pdf`,
          type: 'application/pdf',
          uri: res[0].uri,
        };
      }
      for (let i = 0; i < res.length; i++) {
        setFiles([
          ...files,
          {name: res[i].name, type: res[i].type, uri: res[i].uri},
        ]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(JSON.stringify(err))) {
      } else {
        throw err;
      }
    }
  };

  const getFiles = () => {
    axios.get(`${API_URL}files/${doc.id}`).then(res => {
      setDBFiles(res.data.data);
    });
  };

  useEffect(() => {
    if (doc) {
      setIsUpdate(true);
      setValue(doc);
      if (doc.is_alarm === '1') {
        setAlarmSet(true);
      } else {
        setAlarmSet(false);
      }
      let tanggal = `${doc.date} ${doc.time}`;
      let tanggal_alarm = `${doc.date} ${doc.time_alarm}`;
      setTaskTime(moment(tanggal));
      setAlarmTime(moment(tanggal_alarm));
      setSelectedDay({
        [doc.date]: {
          selected: true,
          selectedColor: '#ff6d6d',
        },
      });
      setCurrentDay(doc.date);
      getFiles();
    }
  }, []);

  useEffect(() => {
    const uniqueValuesSet = new Set();
    const filteredArr = files.filter(obj => {
      // check if name property value is already in the set
      const isPresentInSet = uniqueValuesSet.has(obj.uri);

      // add name property value to Set
      uniqueValuesSet.add(obj.uri);

      // return the negated value of
      // isPresentInSet variable
      return !isPresentInSet;
    });

    setUpFiles(filteredArr);
  }, [files]);

  const validate = () => {
    if (
      value.name === '' ||
      value.name === undefined ||
      value.note === '' ||
      value.note === undefined
    ) {
      setBtnSubmitActive(false);
    } else {
      setBtnSubmitActive(true);
    }
  };

  useEffect(() => {
    validate();
    if (isUpdate) {
      if (JSON.stringify(doc) !== JSON.stringify(value)) {
        setBtnUpdate(true);
      } else {
        setBtnUpdate(false);
      }
    }
  }, [value]);

  const onSubmit = async () => {
    setIsLoading(true);
    setBtnSubmitActive(false);
    await axios
      .post(`${API_URL}schedule`, value)
      .then(res => {
        function setUploadFile() {
          if (upFiles.length > 0) {
            for (let i = 0; i < upFiles.length; i++) {
              const upload = new FormData();
              upload.append('id_schedule', res.data.id);
              upload.append('status', '1');
              upFiles[i].type !== null
                ? upload.append('type', upFiles[i].type)
                : null;
              upload.append('file', upFiles[i]);
              axios
                .post(`${API_URL}files`, upload, {
                  headers: {
                    'content-type': 'multipart/form-data',
                  },
                })
                .then(res => {
                  // console.log(res.data);
                })
                .catch(err => console.log(err));
            }
            return console.log('ok');
          }
        }
        function uploadPickCamera() {
          if (imageUri.length > 0) {
            for (let i = 0; i < imageUri.length; i++) {
              const uploadPick = new FormData();
              uploadPick.append('id_schedule', res.data.id);
              uploadPick.append('status', '1');
              imageUri[i].type !== null
                ? uploadPick.append('type', imageUri[i].type)
                : null;
              uploadPick.append('file', imageUri[i]);
              axios
                .post(`${API_URL}files`, uploadPick, {
                  headers: {
                    'content-type': 'multipart/form-data',
                  },
                })
                .then(res => {
                  // console.log(res.data);
                })
                .catch(err => console.log(JSON.stringify(err)));
            }
            return console.log('ok');
          }
        }

        function onSuccess() {
          navigation.replace('HomeScreen');
          setIsLoading(false);
        }

        async function getSetFilesData() {
          const inPick = await uploadPickCamera();
          const inFile = await setUploadFile(inFile);
          await onSuccess(inFile);
        }

        getSetFilesData();
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const onUpdate = async () => {
    setIsLoading(true);
    setBtnUpdate(false);
    await axios
      .put(`${API_URL}schedule/${doc.id}`, value)
      .then(res => {
        function setUploadFile() {
          if (upFiles.length > 0) {
            for (let i = 0; i < upFiles.length; i++) {
              const upload = new FormData();
              upload.append('id_schedule', doc.id);
              upload.append('status', '1');
              upFiles[i].type !== null
                ? upload.append('type', upFiles[i].type)
                : null;
              upload.append('file', upFiles[i]);
              axios
                .post(`${API_URL}files`, upload, {
                  headers: {
                    'content-type': 'multipart/form-data',
                  },
                })
                .then(res => {
                  // console.log(res.data);
                })
                .catch(err => console.log(err));
            }
            return console.log('ok');
          }
        }
        function uploadPickCamera() {
          if (imageUri.length > 0) {
            for (let i = 0; i < imageUri.length; i++) {
              const uploadPick = new FormData();
              uploadPick.append('id_schedule', doc.id);
              uploadPick.append('status', '1');
              imageUri[i].type !== null
                ? uploadPick.append('type', imageUri[i].type)
                : null;
              uploadPick.append('file', imageUri[i]);
              axios
                .post(`${API_URL}files`, uploadPick, {
                  headers: {
                    'content-type': 'multipart/form-data',
                  },
                })
                .then(res => {
                  // console.log(res.data);
                })
                .catch(err => console.log(JSON.stringify(err)));
            }
            return console.log('ok');
          }
        }

        function onSuccess() {
          navigation.replace('HomeScreen');
          setIsLoading(false);
        }

        async function getSetFilesData() {
          const inPick = await uploadPickCamera();
          const inFile = await setUploadFile(inFile);
          await onSuccess(inFile);
        }

        getSetFilesData();
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const showConfirmDialog = id => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this file?',
      [
        {
          text: 'No',
          onPress: () => {
            setModalVisible(false);
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            axios.delete(`${API_URL}files/${id}`).then(res => {
              getFiles();
            });
            setModalVisible(false);
          },
        },
      ],
    );
  };

  return (
    <View style={{backgroundColor: '#fffafa', flex: 1}}>
      {isLoading && <Loading />}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: 'black',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Image
              resizeMode={'contain'}
              source={{
                uri: viewImgUri,
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              width: '100%',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <TouchableOpacity>
              <MaterialIcons
                name="file-download"
                style={{color: '#ddd', fontSize: 22, marginLeft: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{display: 'flex', flexDirection: 'row'}}
              onPress={() => {
                if (typeImage === 'capture') {
                  setImageUri(imageUri.filter(item => item.uri !== viewImgUri));
                  setModalVisible(false);
                } else if (typeImage === 'picker') {
                  setUpFiles(upFiles.filter(item => item.uri !== viewImgUri));
                  setFiles(files.filter(item => item.uri !== viewImgUri));
                  setModalVisible(false);
                } else {
                  showConfirmDialog(idDbImage);
                }
              }}>
              <Text style={{color: '#ddd', marginRight: 3, fontSize: 15}}>
                Remove
              </Text>
              <MaterialIcons
                name="delete"
                style={{color: '#ddd', fontSize: 20, marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <PdfComponent
        isActive={modalPdf}
        setActive={setModalPdf}
        source={sourcePdf}
      />

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
            setValue({...value, date: day.dateString});
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
              onChangeText={text => setValue({...value, name: text})}
              value={value.name}
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
              onChangeText={text => setValue({...value, note: text})}
              value={value.note}
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
                width: 50,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={openCamera}>
                <MaterialIcons
                  name="photo-camera"
                  style={{fontSize: 22, marginTop: 2, color: '#bbb'}}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => setModalRecord(true)}>
                <MaterialIcons
                  name="record-voice-over"
                  style={{fontSize: 20, color: '#bbb'}}
                />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={pickFIle}>
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
            {/* DB Files */}
            {dbFiles.length > 0 &&
              dbFiles.map((list, key) =>
                list.type === 'image/jpeg' || list.type === 'image/png' ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setViewImgUri(`${STORAGE_URL}${list.name}`);
                      setTypeImage('db');
                      setIdDbImage(list.id);
                    }}
                    key={key}>
                    <Image
                      style={{width: '100%', height: 210, marginTop: 12}}
                      source={{
                        uri: `${STORAGE_URL}${list.name}`,
                      }}
                    />
                  </TouchableOpacity>
                ) : list.type === 'application/pdf' ? (
                  <View
                    key={key}
                    style={{
                      marginTop: 12,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: '#ddd',
                      backgroundColor: 'whitesmoke',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() => {
                        setModalPdf(!modalPdf);
                        setSourcePdf(`${STORAGE_URL}${list.name}`);
                      }}>
                      <Text numberOfLines={1}>{list.name}</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity style={{marginHorizontal: 10}}>
                        <MaterialIcons
                          name="file-download"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          showConfirmDialog(list.id);
                        }}>
                        <MaterialIcons
                          name="close"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : list.type ===
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                  list.type ===
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                  list.type === 'application/vnd.ms-excel' ||
                  list.type === 'application/msword' ? (
                  <View
                    key={key}
                    style={{
                      marginTop: 12,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: '#ddd',
                      backgroundColor: 'whitesmoke',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity style={{flex: 1}}>
                      <Text
                        numberOfLines={1}>{`${STORAGE_URL}${list.name}`}</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity style={{marginHorizontal: 10}}>
                        <MaterialIcons
                          name="file-download"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          showConfirmDialog(list.id);
                        }}>
                        <MaterialIcons
                          name="close"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View
                    key={key}
                    style={{
                      marginTop: 12,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: '#ddd',
                      backgroundColor: 'whitesmoke',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity style={{flex: 1}}>
                      <Text
                        numberOfLines={1}>{`${STORAGE_URL}${list.name}`}</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity style={{marginHorizontal: 10}}>
                        <MaterialIcons
                          name="file-download"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          showConfirmDialog(list.id);
                        }}>
                        <MaterialIcons
                          name="close"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ),
              )}
            {/* END */}

            {imageUri.length > 0 &&
              imageUri.map((list, key) => (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setViewImgUri(list.uri);
                    setTypeImage('capture');
                  }}
                  key={key}>
                  <Image
                    style={{width: '100%', height: 210, marginTop: 12}}
                    source={{
                      uri: list.uri,
                    }}
                  />
                </TouchableOpacity>
              ))}
            {upFiles.length > 0 &&
              upFiles.map((list, key) =>
                list.type === 'image/jpeg' || list.type === 'image/png' ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setViewImgUri(list.uri);
                      setTypeImage('picker');
                    }}
                    key={key}>
                    <Image
                      style={{width: '100%', height: 210, marginTop: 12}}
                      source={{
                        uri: list.uri,
                      }}
                    />
                  </TouchableOpacity>
                ) : list.type === 'application/pdf' ? (
                  <View
                    key={key}
                    style={{
                      marginTop: 12,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: '#ddd',
                      backgroundColor: 'whitesmoke',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() => {
                        setModalPdf(!modalPdf);
                        setSourcePdf(list.uri);
                      }}>
                      <Text numberOfLines={1}>{list.name}</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity style={{marginHorizontal: 10}}>
                        <MaterialIcons
                          name="file-download"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setUpFiles(
                            upFiles.filter(item => item.uri !== list.uri),
                          );
                          setFiles(files.filter(item => item.uri !== list.uri));
                        }}>
                        <MaterialIcons
                          name="close"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : list.type ===
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                  list.type ===
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                  list.type === 'application/vnd.ms-excel' ||
                  list.type === 'application/msword' ? (
                  <View
                    key={key}
                    style={{
                      marginTop: 12,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: '#ddd',
                      backgroundColor: 'whitesmoke',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity style={{flex: 1}}>
                      <Text numberOfLines={1}>{list.name}</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity style={{marginHorizontal: 10}}>
                        <MaterialIcons
                          name="file-download"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setUpFiles(
                            upFiles.filter(item => item.uri !== list.uri),
                          );
                          setFiles(files.filter(item => item.uri !== list.uri));
                        }}>
                        <MaterialIcons
                          name="close"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View
                    key={key}
                    style={{
                      marginTop: 12,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: '#ddd',
                      backgroundColor: 'whitesmoke',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity style={{flex: 1}}>
                      <Text numberOfLines={1}>{list.name}</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity style={{marginHorizontal: 10}}>
                        <MaterialIcons
                          name="file-download"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setUpFiles(
                            upFiles.filter(item => item.uri !== list.uri),
                          );
                          setFiles(files.filter(item => item.uri !== list.uri));
                        }}>
                        <MaterialIcons
                          name="close"
                          style={{fontSize: 20, color: 'gray'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ),
              )}
          </View>
        </View>
        {btnSubmitActive && !isUpdate && (
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
            <Text onPress={onSubmit} style={{color: 'white'}}>
              ADD YOUR TASK
            </Text>
          </TouchableOpacity>
        )}
        {btnUpdate && isUpdate ? (
          <TouchableOpacity
            onPress={onUpdate}
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
            <Text style={{color: 'white'}}>UPDATE</Text>
          </TouchableOpacity>
        ) : (btnUpdate && upFiles.length > 0) || imageUri.length > 0 ? (
          <TouchableOpacity
            onPress={onUpdate}
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
            <Text style={{color: 'white'}}>UPDATE</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  );
};

const CreateSchedule = ({route}) => {
  const doc = route.params;
  return (
    <>
      <Layout Child={ViewCreateSchedule} doc={doc} />
    </>
  );
};

export default CreateSchedule;
