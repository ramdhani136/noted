import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Layout} from '../components/organism';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import {API_URL} from '../config';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

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

const LayoutCheckList = () => {
  const navigation = useNavigation();
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [today, isToday] = useState(
    `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD',
    )}`,
  );

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

  const updateStatus = (id, newStatus) => {
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
      var date = today
          ? query.date.toLowerCase().includes(today.toLowerCase())
          : true,
        status = query.status ? query.status.toLowerCase().includes('1') : true;

      return date && status;
    });
  };

  const filterCompleted = data => {
    return _.filter(data, function (query) {
      var date = today
          ? query.date.toLowerCase().includes(today.toLowerCase())
          : true,
        status = query.status ? query.status.toLowerCase().includes('0') : true;

      return date && status;
    });
  };

  return (
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
          <TouchableOpacity>
            <FontAwesome
              name="navicon"
              style={{fontSize: 18, marginHorizontal: 12, color: '#666'}}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Today
          </Text>
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
            borderWidth: 1,
            borderColor: '#eee',
            height: 'auto',
            marginBottom: 90,
          }}>
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
      </ScrollView>
    </View>
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