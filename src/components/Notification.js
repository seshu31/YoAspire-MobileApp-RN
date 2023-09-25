import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationCard from '../shared/NotificationCard';
import Loader from '../reusables/Loader';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const Notification = ({navigation}) => {
  const [fetching, setFetching] = useState(() => false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(() => [
    {
      id: 1,
      First_Name: 'Venu',
      Last_Name: 'Makaraju',
      title: 'Notification 1',
    },
    {
      id: 2,
      First_Name: 'Sravani',
      Last_Name: 'V',
      title: 'Notification 2',
    },
    {
      id: 3,
      First_Name: 'Ram Kumar',
      Last_Name: 'P',
      title: 'Notification 1',
    },
  ]);

  const renderItem = ({item}) => (
    <NotificationCard item={item} navigation={navigation} />
  );

  const loadNotifications = () => {
    setFetching(true);
    fetchNotifications();
  };

  const fetchNotifications = () => {
    console.log('${backend_url}/feed/useractivity/${userid}');
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <MaterialIcons
            name="arrow-back-ios"
            size={normalize(26)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.notificationTitle}>Notifications</Text>
      </View>
      {isLoading ? <Loader /> : null}
      {notifications.length ? (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          refreshing={fetching}
          onRefresh={loadNotifications}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  notificationHeader: {
    height: normalize(60),
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingHorizontal: normalize(theme.spacing.large),
  },
  notificationTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
    paddingLeft: '25%',
  },
});

export default Notification;
