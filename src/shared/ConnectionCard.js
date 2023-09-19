import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const ConnectionCard = ({item, navigation}) => {
  const [connected, setConnected] = useState(
    () => item.FolloweeId || item.mutual,
  );
  const [connectionLevel, setConnectionLevel] = useState(() => 0);
  useEffect(() => fetchConnectionLevel(), []);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (err) {
      Alert.alert('Something went wrong');
    }
  };

  const profileHandler = () => {
    navigation.navigate('profile', {
      userID: item.FolloweeId || item.FollowerId,
      user: item,
    });
  };

  const connectionHandler = () => {
    console.log(
      'connectionHandler function, method:DELETE : POST, url:${backend_url}/follow/${item.FolloweeId || item.FollowerId}',
    );
  };

  const fetchConnectionLevel = () => {
    console.log(
      'fetchConnectionLevel function, method:get, url:${backend_url}/follow/networklevel/${item.FollowerId || item.FolloweeId',
    );
  };

  return (
    <TouchableOpacity
      style={styles.connectionCard}
      onPress={profileHandler}
      activeOpacity={0.5}>
      <View style={styles.detailsSection}>
        <Image
          style={styles.connectionImage}
          source={
            item.profile.img_file_name
              ? {uri: item.profile.img_file_name}
              : require('../../assets/male.png')
          }
        />
        <View style={styles.connectionDetails}>
          <View style={styles.userNameDetails}>
            <Text style={styles.connectionName}>
              {item.profile.First_Name} {item.profile.Last_Name}
            </Text>
            {connectionLevel ? (
              <>
                <Text style={styles.connectionLevel}>
                  {'   '}
                  {'\u2B24'}
                </Text>
                <Text> {connectionLevel}</Text>
              </>
            ) : null}
          </View>
          {item.profile.heading ? (
            <Text style={styles.connectionTitle}>{item.profile.heading}</Text>
          ) : null}
          {item.FollowerId ? (
            <Text style={styles.followText}>Follows you</Text>
          ) : null}
        </View>
      </View>
      <TouchableOpacity onPress={connectionHandler} activeOpacity={0.5}>
        {connected ? (
          <Text style={[styles.followingButton, styles.buttonStyle]}>
            Following
          </Text>
        ) : (
          <Text style={[styles.followButton, styles.buttonStyle]}>Follow</Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  connectionCard: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: '5%',
    paddingVertical: normalize(theme.spacing.small),
  },
  detailsSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  connectionImage: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(100),
    borderColor: theme.colors.primary,
    borderWidth: 0.5,
  },
  connectionDetails: {
    paddingLeft: normalize(theme.spacing.medium),
  },
  userNameDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionName: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    color: theme.colors.black,
  },
  connectionTitle: {
    paddingTop: normalize(theme.spacing.extraSmall),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.level2,
  },
  connectionLevel: {fontSize: 5},
  followText: {
    color: theme.colors.level2,
    fontWeight: theme.fontWeight.bold,
    fontSize: normalize(theme.fontSizes.small),
    paddingTop: normalize(theme.spacing.extraSmall),
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: normalize(5),
    paddingHorizontal: normalize(theme.spacing.small),
    paddingVertical: normalize(theme.spacing.extraSmall),
    marginVertical: normalize(theme.spacing.small),
  },
  followingButton: {
    backgroundColor: theme.colors.white,
    color: theme.colors.primary,
  },
  followButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
  },
});

export default ConnectionCard;
