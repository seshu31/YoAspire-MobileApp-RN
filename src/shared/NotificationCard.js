import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import normalize from 'react-native-normalize';
import theme from '../../theme';
import Moment from 'react-moment';
import ProfilePicture from '../reusables/profilePic';
import getRandomColor from '../reusables/randomColor';

const NotificationCard = props => {
  const randomBackgroundColor = getRandomColor();
  const {item} = props;
  const notificationHandler = () => {
    console.log(
      'method: Method, ${backend_url}/feed/useractivity/seen/${item.id}',
    );
  };

  return (
    <TouchableOpacity
      onPress={notificationHandler}
      activeOpacity={0.5}
      style={[
        styles.notificationBody,
        {
          backgroundColor: item.seen === 0 ? '#f5f5f5' : '#fff',
        },
      ]}>
      <View style={styles.notification}>
        {/* <Image
          style={styles.notificationImage}
          source={
            item.img_file_name
              ? {uri: item.img_file_name}
              : require('../../assets/male.png')
          }
        /> */}
        <ProfilePicture
          firstName={item?.First_Name}
          lastName={item?.Last_Name}
          style={{
            backgroundColor: randomBackgroundColor,
            height: normalize(50),
            width: normalize(50),
          }}
        />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationText}>
            {item.First_Name} {item.Last_Name} {item.title}
          </Text>
          <Moment element={Text} fromNow style={styles.notificationTime}>
            {item.Timestamp}
          </Moment>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationBody: {
    borderBottomWidth: normalize(3),
    borderColor: theme.colors.grey,
  },
  notification: {
    paddingHorizontal: '5%',
    paddingVertical: normalize(theme.spacing.large),
    width: '85%',
    flexDirection: 'row',
  },
  notificationImage: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(100),
  },
  notificationContent: {
    paddingLeft: '5%',
  },
  notificationText: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    color: theme.colors.black,
  },
  notificationTime: {
    paddingTop: normalize(theme.spacing.extraSmall),
    color: theme.colors.darkgrey,
  },
});

export default NotificationCard;
