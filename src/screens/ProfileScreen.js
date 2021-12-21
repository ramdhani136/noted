import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Layout} from '../components/organism';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {inUser, selectUser} from '../config/redux/slices/UserSlice';
const profileImg = require('../assets/profile.jpg');
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {API_URL, BASE_URL} from '../config';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch} from 'react-redux';

const ProfileView = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const defaultValue = {
    id: user.user ? user.user.id : '',
    name: user.user ? user.user.name : '',
    username: user.user ? user.user.username : '',
    email: user.user ? user.user.email : '',
    image: user.user ? `${BASE_URL}/storage/${user.user.image}` : '',
    password: '',
  };
  const [btnSave, setBtnSave] = useState(false);
  const [image, setImage] = useState({});
  const [value, setValue] = useState(defaultValue);
  const [valueLocal, setValueLocal] = useState({});

  const pickFIle = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setValue({...value, image: res[0].uri});
      setImage({name: 'upload.jpg', uri: res[0].uri, type: res[0].type});
    } catch (err) {
      if (DocumentPicker.isCancel(JSON.stringify(err))) {
      } else {
        throw err;
      }
    }
  };

  const onUpdate = () => {
    const data = new FormData();
    data.append('name', value.name);
    data.append('username', value.username);
    data.append('email', value.email);

    if (image.uri !== undefined) {
      image !== '' && data.append('image', image);
    }

    if (value.password !== '') {
      data.append('password', value.password);
    }

    axios
      .post(`${API_URL}user/${value.id}`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(res => {
        dispatch(inUser(res.data));
        AsyncStorage.setItem('user', JSON.stringify(res.data));
        Alert.alert('Success', 'Data updated successfully!');
        navigation.goBack();
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        Alert.alert('Error', 'Check your connection!');
      });
  };

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
      setBtnSave(true);
    } else {
      setBtnSave(false);
    }
  }, [value]);

  useEffect(() => {
    if (!user.user) {
      AsyncStorage.getItem('user').then(value => {
        const data = JSON.parse(value);

        setValue({
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
        });
        setValueLocal({name: data.name, username: data.username});
      });
    }
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
      }}>
      <View
        style={{
          height: 105,
          backgroundColor: '#ff4747',
          borderBottomWidth: 1,
          borderBottomColor: 'red',
          position: 'relative',
        }}>
        <View
          style={{
            width: '100%',
            height: 35,
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              style={{
                fontSize: 22,
                color: 'white',
              }}
            />
          </TouchableOpacity>
          {btnSave && (
            <TouchableOpacity onPress={onUpdate}>
              <Text style={{color: 'white', fontSize: 15}}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#fffafa',
          paddingVertical: 30,
          paddingHorizontal: 35,
        }}>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 14.5}}>Full Name</Text>
          <TextInput
            onChangeText={text => setValue({...value, name: text})}
            value={value.name}
            style={{
              borderBottomWidth: 1,
              borderColor: '#eee',
              color: '#666',
              marginTop: -5,
              fontSize: 14.5,
            }}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 14.5}}>Username</Text>
          <TextInput
            onChangeText={text => setValue({...value, username: text})}
            value={value.username}
            style={{
              borderBottomWidth: 1,
              borderColor: '#eee',
              color: '#666',
              marginTop: -5,
              fontSize: 14.5,
            }}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 14.5}}>Email</Text>
          <TextInput
            onChangeText={text => setValue({...value, email: text})}
            value={value.email}
            style={{
              borderBottomWidth: 1,
              borderColor: '#eee',
              color: '#666',
              marginTop: -5,
              fontSize: 14.5,
            }}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 14.5}}>Password</Text>
          <TextInput
            onChangeText={text => setValue({...value, password: text})}
            secureTextEntry={true}
            value={value.password}
            style={{
              fontSize: 14.5,
              borderBottomWidth: 1,
              borderColor: '#eee',
              color: '#666',
              marginTop: -5,
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '90%',
          height: 80,
          top: 42,
          left: 20,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={pickFIle}
          style={{
            borderWidth: 4,
            borderRadius: 100,
            height: 78,
            borderColor: 'white',
            backgroundColor: 'white',
          }}>
          <Avatar.Image
            source={
              user.user
                ? user.user.image
                  ? {uri: value.image}
                  : image.uri !== undefined
                  ? {uri: image.uri}
                  : profileImg
                : image.uri !== undefined
                ? {uri: image.uri}
                : profileImg
            }
            size={70}
          />
        </TouchableOpacity>
        <View style={{marginTop: 12, marginLeft: 12}}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
            {user.user ? user.user.name : valueLocal.name}
          </Text>
          <Text style={{color: 'white', fontStyle: 'italic'}}>
            {`@${user.user ? user.user.name : valueLocal.username}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <>
      <Layout btnActive="profile" Child={ProfileView} />
    </>
  );
};

export default ProfileScreen;
