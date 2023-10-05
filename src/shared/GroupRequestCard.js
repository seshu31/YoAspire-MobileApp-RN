import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import normalize from 'react-native-normalize';
import theme from '../../theme';
import ProfilePicture from '../reusables/profilePic';
import getRandomColor from '../reusables/randomColor';

const GroupRequestCard = ({item, navigation, fetchHandler}) => {
  const [connectionLevel, setConnectionLevel] = useState(() => 1);

  useEffect(() => fetchConnectionLevel(), []);

  const fetchConnectionLevel = () => {
    console.log(
      'method: GET, ${backend_url}/follow/networklevel/${item.userid}',
    );
  };

  const profileHandler = () => {
    navigation.navigate('profile', {
      userID: item.userid,
      user: item,
    });
  };

  const connectionHandler = request => {
    console.log(
      'method: POST : DELETE, ${backend_url}/group/${request ? "accept" : "reject"}/${item.userid }/${item.groupid}',
    );
  };

  return (
    <TouchableOpacity
      style={styles.connectionCard}
      onPress={profileHandler}
      activeOpacity={0.5}>
      <View style={styles.detailsSection}>
        {/* <Image
          style={styles.connectionImage}
          source={
            item.profile.img_file_name
              ? {uri: item.profile.img_file_name}
              : require('../../assets/male.png')
          }
        /> */}
        <ProfilePicture
          firstName={item?.profile.First_Name}
          lastName={item?.profile.Last_Name}
          style={{
            backgroundColor: getRandomColor(),
            height: normalize(50),
            width: normalize(50),
          }}
        />
        <View style={styles.connectionDetails}>
          <View style={styles.userNameDetails}>
            <Text style={styles.connectionName} numberOfLines={1}>
              {item.profile.First_Name} {item.profile.Last_Name}
            </Text>
            {connectionLevel ? (
              <>
                <Text style={styles.connectionLevel}>
                  {'   '}
                  {'\u2B24'}
                </Text>
                <Text style={styles.connections}> {connectionLevel}</Text>
              </>
            ) : null}
          </View>
          {item.profile.heading ? (
            <Text style={styles.connectionTitle} numberOfLines={2}>
              {item.profile.heading}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.connectSection}>
        <TouchableOpacity
          style={styles.connectIcons}
          onPress={() => connectionHandler(true)}
          activeOpacity={0.5}>
          <Ionicons
            name="checkmark-circle-outline"
            size={normalize(theme.iconSizes.large)}
            color={theme.colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.connectIcons}
          onPress={() => connectionHandler(false)}
          activeOpacity={0.5}>
          <Ionicons
            name="close-circle-outline"
            size={normalize(theme.iconSizes.large)}
            color={theme.colors.black}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  connectionCard: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(theme.spacing.medium),
    paddingVertical: normalize(theme.spacing.small),
  },
  detailsSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '65%',
  },
  connectionImage: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(100),
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  connectionDetails: {
    paddingLeft: normalize(theme.spacing.medium),
  },
  userNameDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionName: {
    fontSize: normalize(theme.spacing.medium),
    color: theme.colors.black,
  },
  connectionTitle: {
    paddingTop: normalize(theme.spacing.extraSmall),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.darkgrey,
  },
  connectSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectIcons: {
    marginLeft: normalize(theme.spacing.small),
  },
  connectionLevel: {
    fontSize: normalize(theme.fontSizes.extraSmall),
    color: theme.colors.black,
    paddingTop: normalize(theme.spacing.extraSmall),
  },
  connections: {
    color: theme.colors.black,
    paddingTop: normalize(2),
  },
});

export default GroupRequestCard;
