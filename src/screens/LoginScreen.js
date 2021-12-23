import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {API_URL} from '../config';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {inUser} from '../config/redux/slices/UserSlice';
import {useDispatch} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';

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

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(true);
  const [value, setValue] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);

  const validate = () => {
    if (
      value.username === undefined ||
      value.username === '' ||
      value.password === undefined ||
      value.password === ''
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const onSubmit = async () => {
    if (!isValid) {
      const ambil = await fetch(`${API_URL}login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        }),
      })
        .then(res => {
          if (res.status == 401) {
            Alert.alert('Failed', 'Please check your data!');
          } else {
            Alert.alert('Success', 'Login Successfuly');
          }
        })
        .catch(err => {
          Alert.alert('Failed', 'Please check your data!');
        });
      const jalankan = await getUser();

      return jalankan;
    } else {
      Alert.alert('Error', 'Plese check your data!');
    }
  };

  const getUser = async () => {
    await fetch(`${API_URL}user`).then(res => {
      res
        .json()
        .then(json => {
          setLogin(true);
          AsyncStorage.setItem('user', JSON.stringify(json));
          AsyncStorage.setItem('isLogin', JSON.stringify(true));
          dispatch(inUser(json));
          setLoading(false);
          getNotification(json.id);
        })
        .catch(err => {
          setLogin(false);
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    validate();
  }, [value]);

  useEffect(() => {
    getUser();

    AsyncStorage.getItem('isLogin').then(value => {
      if (value) {
        navigation.replace('HomeScreen');
      }
    });
  });

  const getNotification = id => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        axios
          .put(
            `${API_URL}devicetoken/${token.token}`,
            {id_user: id},
            {
              headers: {
                Accept: 'application/json',
              },
            },
          )
          .then(res => {
            console.log(res.data);
          });
        // console.log('TOKEN:', token.token);
        // console.log(id);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification);
        // Alert.alert('Notification', 'You have a schedule!');
        // navigation.navigate('CreateSchedule');
        console.log(notification);
        if (notification.foreground) {
          console.log('dari depan');
          Alert.alert('Notification', 'you have a new schedule!');
        } else {
          console.log('dari belakang');
        }
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar hidden={true} />
      {loading ? (
        <Loading />
      ) : (
        <View
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: '#fff',
            position: 'relative',
          }}>
          <Image
            style={{
              width: '100%',
              height: 200,
              marginTop: 60,
              resizeMode: 'contain',
              marginBottom: 15,
            }}
            source={require('../assets/icon_login.png')}
          />
          <Text
            style={{
              marginTop: 10,
              marginLeft: 27,
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            Sign in/Sign up
          </Text>
          <View
            style={{
              width: '85%',
              marginHorizontal: '7.5%',
              marginTop: 10,
            }}>
            <TextInput
              onChangeText={text =>
                setValue({...value, username: text.toLocaleLowerCase()})
              }
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                padding: 10,
                marginVertical: 10,
                backgroundColor: '#eee',
                fontSize: 17,
                color: '#666',
                borderRadius: 2,
                height: 45,
              }}
              placeholderTextColor="#ddd"
              placeholder="Username"
            />
            <View style={{position: 'relative'}}>
              <TextInput
                onChangeText={text => setValue({...value, password: text})}
                style={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  padding: 10,
                  marginVertical: 10,
                  backgroundColor: '#eee',
                  fontSize: 17,
                  color: '#666',
                  borderRadius: 2,
                  height: 45,
                }}
                placeholderTextColor="#ddd"
                placeholder="Password"
                secureTextEntry={isShow}
                // autoFocus={true}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsShow(!isShow);
                }}
                style={{
                  width: 22,
                  height: 22,
                  position: 'absolute',
                  right: 10,
                  marginTop: 22,
                }}>
                {isShow && <Entypo name="eye" style={{fontSize: 20}} />}
                {!isShow && (
                  <Entypo name="eye-with-line" style={{fontSize: 20}} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={onSubmit}
              style={{
                alignItems: 'center',
                padding: 13,
                borderRadius: 4,
                marginTop: 20,
                backgroundColor: !isValid ? '#ff5e5e' : '#ff9e9e',
                // backgroundColor: '#ff5e5e',
                // backgroundColor: '#ff9e9e',
              }}>
              <Text style={{fontSize: 15, color: 'white'}}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              position: 'absolute',
              bottom: 40,
              left: 40,
              fontSize: 15,
              color: '#ddd',
            }}>
            © (IT) PT. Ekatunggal Tunas Mandiri - 2021
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
