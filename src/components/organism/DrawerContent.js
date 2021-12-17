import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {API_URL, BASE_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const DrawerContent = props => {
  const [user, setUser] = useState({});
  const [countSchedule, setCountSchedule] = useState('');
  const navigation = useNavigation();
  const logOut = () => {
    axios.post(`${API_URL}logout`).then(res => {
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('isLogin');
      navigation.navigate('LoginScreen');
    });
  };

  const getSchedules = id => {
    axios
      .get(`${API_URL}schedule/${id}`)
      .then(res => {
        setCountSchedule(res.data.data.length);
      })
      .catch(err => {
        throw err;
      });
  };

  useEffect(() => {
    AsyncStorage.getItem('user').then(value => {
      const datauser = JSON.parse(value);
      setUser(datauser);
      getSchedules(datauser.id);
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              {user && (
                <Avatar.Image
                  source={{
                    uri: user.uri
                      ? 'https://www.dailysia.com/wp-content/uploads/2020/04/gong-yoo-1.jpg'
                      : `${BASE_URL}/storage/avatar.png`,
                  }}
                  size={50}
                />
              )}
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={[styles.title, {marginTop: -1}]}>
                  {user && user.name}
                </Title>
                <Caption style={styles.caption}>{user && user.email}</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {user && countSchedule}
                </Paragraph>
                <Caption style={styles.caption}>Schedules</Caption>
              </View>
              {/* <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  10
                </Paragraph>
                <Caption style={styles.caption}>Notes</Caption>
              </View> */}
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" size={size} color={color} />
              )}
              label="Home"
              onPress={() => navigation.navigate('HomeScreen')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="check-box-multiple-outline"
                  size={size}
                  color={color}
                />
              )}
              label="Checklist"
              onPress={() => navigation.navigate('CheckListScreen')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="note-outline" size={size} color={color} />
              )}
              label="Schedules"
              onPress={() => navigation.navigate('HomeScreen')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              )}
              label="Settings"
              onPress={logOut}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" size={size} color={color} />
          )}
          label="Sign Out"
          onPress={logOut}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {fontSize: 16, marginTop: 3, fontWeight: 'bold'},
  caption: {fontSize: 14, lineHeight: 14, color: '#aaa'},
  row: {marginTop: 20, flexDirection: 'row', alignItems: 'center'},
  section: {flexDirection: 'row', alignItems: 'center', marginRight: 15},
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {marginTop: 15},
  bottomDrawerSection: {
    marginTop: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
