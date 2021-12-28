import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {API_URL, BASE_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {inUser, selectUser} from '../../config/redux/slices/UserSlice';
import {selectCount} from '../../config/redux/slices/CountSlice';
import {CommonActions} from '@react-navigation/native';
const profileImg = require('../../assets/profile.jpg');

const DrawerContent = props => {
  const [valueLocal, setValueLocal] = useState({});
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const countSchedule = useSelector(selectCount);
  const dispatch = useDispatch();
  const logOut = () => {
    axios.post(`${API_URL}logout`).then(res => {
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('isLogin');
      dispatch(inUser({}));

      const ToDrawer = () => {
        navigation.navigate('login');
      };

      const ToLogin = () => {
        navigation.navigate('LoginScreen');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'login'}],
          }),
        );
      };

      const AfterLogout = async () => {
        const drawer = await ToDrawer();
        ToLogin(drawer);
      };

      AfterLogout();
    });
  };

  useEffect(() => {
    if (!user.user) {
      AsyncStorage.getItem('user').then(value => {
        const data = JSON.parse(value);
        setValueLocal({name: data.name, username: data.username});
      });
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                style={{borderWidth: 0}}
                // source={{
                //   uri: user.uri
                //     ? `${BASE_URL}/storage/${user.user.uri}`
                //     : `${BASE_URL}/storage/profile.jpg`,
                // }}
                source={
                  user.user
                    ? {uri: `${BASE_URL}/storage/${user.user.image}`}
                    : profileImg
                }
                size={50}
              />

              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={[styles.title, {marginTop: -1}]}>
                  {user.user ? user.user.name : valueLocal.name}
                </Title>
                <Caption style={styles.caption}>
                  {user.user
                    ? `@${user.user.username}`
                    : `@${valueLocal.username}`}
                </Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {countSchedule.count.schedule && countSchedule.count.schedule}
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
                // <Icon name="note-outline" size={size} color={color} />
                <MaterialIcons name="date-range" size={size} color={color} />
              )}
              label="Schedules"
              onPress={() => navigation.navigate('HomeScreen')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="note-outline" size={size} color={color} />
              )}
              label="Notes"
              onPress={() => navigation.navigate('NotesScreen')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              )}
              label="Settings"
              onPress={() => navigation.navigate('ProfileScreen')}
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
