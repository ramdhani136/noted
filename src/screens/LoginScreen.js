import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {API_URL} from '../config';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(true);
  const [value, setValue] = useState({});
  const [isValid, setIsValid] = useState(false);

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

  const getUser = async () => {
    await fetch(`${API_URL}user`).then(res => {
      res
        .json()
        .then(json => {
          console.log(json.name);
          if (json.name !== undefined || json.name !== '') {
            Alert.alert('Success', 'Login');
          } else {
            Alert.alert('Plese check your data!');
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
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
      });
      const jalankan = await getUser();

      return jalankan;
    } else {
      Alert.alert('Error', 'Plese check your data!');
    }
  };

  useEffect(() => {
    validate();
  }, [value]);

  useEffect(() => {
    // _retrieveData();
  });

  return (
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
          height: 190,

          marginTop: 50,
          resizeMode: 'contain',
          marginBottom: 15,
        }}
        source={require('../assets/icon_login.png')}
      />
      <Text
        style={{
          marginTop: 10,
          marginLeft: 20,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        Sign in/Sign up
      </Text>
      <View
        style={{
          width: '88%',
          marginHorizontal: '6%',
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
            {!isShow && <Entypo name="eye-with-line" style={{fontSize: 20}} />}
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
  );
};

export default LoginScreen;
