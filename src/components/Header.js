import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import normalize from 'react-native-normalize';
import theme from '../../theme';
import {DummyUser} from '../staticData';

const Header = ({navigation, createPost}) => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const mount = navigation.addListener('focus', () => {
      fetchNotifications();
    });
    return mount;
  }, []);

  const getToken = async () => {
    console.log('getToken function @returns: userId, token');
    try {
      return {
        userid: await AsyncStorage.getItem('userId'),
        token: await AsyncStorage.getItem('userToken'),
      };
    } catch (error) {
      Alert.alert('Something went wrong', 'userId, token are undefined');
    }
  };

  const fetchNotifications = () => {
    getToken();
    console.log(
      ' fetchNotifications function url : ${backend_url}/feed/useractivity/${userid}',
      'get call',
    );
  };

  return (
    <View>
      {createPost ? null : (
        <View style={[styles.headerBar, styles.centerContainer]}>
          <View style={[styles.iconHolder, styles.centerContainer]}>
            <TouchableOpacity
              style={styles.userLogo}
              onPress={() =>
                navigation.navigate('profile', {
                  user: DummyUser,
                })
              }
              activeOpacity={0.5}>
              <Ionicons
                name="person-outline"
                size={normalize(theme.iconSizes.large)}
                color={theme.colors.level2}
              />
            </TouchableOpacity>
          </View>
          <Ionicons
            name="search-outline"
            style={styles.searchIcon}
            size={normalize(theme.iconSizes.large)}
            color={theme.colors.level2}
          />
          {/* <View style={styles.inputHolder}>
            <TextInput
              style={styles.searchInput}
              onFocus={() => navigation.navigate('search')}
            />
            <Ionicons
              name="search-outline"
              style={styles.searchIcon}
              size={normalize(30)}
              color={theme.colors.black}
            />
          </View> */}
          <View style={[styles.iconHolder, styles.centerContainer]}>
            {notificationCount ? (
              <Text style={styles.notificationCount}>{notificationCount}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.notificationIcon}
              onPress={() => navigation.navigate('notifications')}
              activeOpacity={0.5}>
              <Ionicons
                name="notifications-outline"
                size={normalize(theme.iconSizes.large)}
                color={theme.colors.level2}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBar: {
    backgroundColor: theme.colors.white,
    height: normalize(50),
    color: theme.colors.white,
    paddingHorizontal: normalize(theme.spacing.small),
    borderBottomColor: theme.colors.grey,
    borderWidth: 1,
  },
  iconHolder: {
    width: '10%',
  },
  userLogo: {
    width: normalize(40),
    height: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.white,
  },
  inputHolder: {
    width: '80%',
    flexDirection: 'row',
    paddingHorizontal: normalize(theme.spacing.small),
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    backgroundColor: theme.colors.white,
    height: normalize(40),
    paddingLeft: normalize(theme.spacing.small),
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: 16,
    // doubt
    paddingRight: normalize(40),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  searchIcon: {
    position: 'absolute',
    right: '15%',
    top: normalize(10),
  },
  notificationCount: {
    position: 'absolute',
    top: normalize(1),
    right: normalize(1),
    color: theme.colors.white,
    backgroundColor: theme.colors.red,
    fontSize: normalize(theme.fontSizes.small),
    fontWeight: theme.fontWeight.bold,
    paddingHorizontal: normalize(7),
    paddingVertical: normalize(1),
    borderRadius: normalize(100),
    zIndex: 1,
  },
  notificationIcon: {
    width: normalize(40),
    height: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default Header;
