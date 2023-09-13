import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const ProfileCard = ({item, navigation}) => {
  const [connected, setConnected] = useState(false);
  const [connectionLevel, setConnectionLevel] = useState(0);

  useEffect(() => fetchConnectionLevel(), []);

  const fetchConnectionLevel = () => {
    console.log(
      'fetchConnectionLevel function, get call , url : ${backend_url}/follow/networklevel/${item.UserId}',
    );
  };

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      Alert.alert('Something went wrong', 'userToken not available');
    }
  };

  const profileHandler = () => {
    console.log('navigate to profile screen');
    navigation.navigate('profile', {
      userID: item.UserId,
      // have to remove this later
      user: item,
    });
  };

  const connectionHandler = () => {
    console.log(
      'connectionHandler function , method : DELETE : POST, url : ${backend_url}/follow/${item.UserId}',
    );
  };

  return (
    <TouchableOpacity
      style={styles.profileCard}
      onPress={profileHandler}
      activeOpacity={0.5}>
      <View style={styles.imageSection}>
        <Image
          style={styles.profileImage}
          source={
            item.profile.img_file_name
              ? {uri: item.profile.img_file_name}
              : require('../../assets/male.png')
          }
        />
      </View>
      <View style={styles.detailsSection}>
        <View style={styles.userNameDetails}>
          <Text style={styles.profileName}>
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
        <Text style={styles.profileTitle}>{item.profile.heading}</Text>
        <TouchableOpacity onPress={connectionHandler} activeOpacity={0.5}>
          {connected ? (
            <Text style={[styles.connectedButton, styles.buttonStyle]}>
              CONNECTED
            </Text>
          ) : (
            <Text style={[styles.connectButton, styles.buttonStyle]}>
              CONNECT
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    width: '40%',
    borderRadius: normalize(5),
    borderWidth: 1,
    borderColor: theme.colors.grey,
    alignItems: 'center',
    marginLeft: '6.5%',
    marginBottom: normalize(theme.spacing.extraLarge),
  },
  imageSection: {
    backgroundColor: theme.colors.primary,
    height: normalize(75),
    borderTopLeftRadius: normalize(5),
    borderTopRightRadius: normalize(5),
    width: '100%',
    position: 'relative',
  },
  profileImage: {
    width: normalize(75),
    height: normalize(75),
    alignSelf: 'center',
    position: 'absolute',
    top: '50%',
    borderRadius: normalize(100),
  },
  detailsSection: {
    marginTop: normalize(50),
    alignItems: 'center',
    paddingHorizontal: normalize(theme.spacing.medium),
  },
  userNameDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  profileTitle: {
    fontSize: normalize(theme.fontSizes.small),
    marginTop: normalize(theme.spacing.extraSmall),
    color: '#999',
  },
  buttonStyle: {
    borderColor: theme.colors.primary,
    borderRadius: normalize(5),
    paddingHorizontal: normalize(theme.spacing.small),
    paddingVertical: normalize(theme.spacing.extraSmall),
    marginVertical: normalize(theme.spacing.small),
  },
  connectedButton: {
    color: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  connectButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderWidth: 1,
  },
  connectionLevel: {
    fontSize: 5,
    color: theme.colors.black,
  },
});

export default ProfileCard;
