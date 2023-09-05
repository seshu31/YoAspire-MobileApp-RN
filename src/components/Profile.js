import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  LogBox,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme';
import normalize from 'react-native-normalize';
import Loader from '../reusables/Loader';

const Profile = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [user, setUser] = useState('');
  const [dob, setDOB] = useState(new Date());
  const [skills, setSkills] = useState([]);
  const [userID, setUserID] = useState(null);
  const [owner, setOwner] = useState(true);
  const [following, setFollowing] = useState(false);
  const [connectionLevel, setConnectionLevel] = useState(0);

  useEffect(() => {
    setUser({profile: route.params?.user});
    console.log({profile: route.params?.user}, 'experience', user);
    const mount = navigation.addListener('focus', () => {
      LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
      ]);
      fetchUser();
      if (route.params.userID) fetchConnectionLevel();
    });
    return mount;
  }, []);

  const getToken = async () => {
    try {
      let userid;
      if (
        route.params &&
        route.params.userID &&
        (await AsyncStorage.getItem('userId')) != route.params.userID
      ) {
        userid = route.params.userID;
        setOwner(false);
      } else {
        userid = await AsyncStorage.getItem('userId');
        setOwner(true);
      }
      setUserID(userid);
      return {
        userid: userid,
        token: await AsyncStorage.getItem('userToken'),
      };
    } catch (error) {
      Alert.alert('Something went wrong', 'user id issue');
    }
  };

  const fetchUser = () => {
    console.log(
      'fetch user function,method: get, url: `${backend_url}/profiles/${userid}`',
    );
  };

  if (!owner) {
    console.log(
      'if(!owner) , method: get ,url:${backend_url}/follow/getfollowees/${await AsyncStorage.getItem(userId)',
    );
  }

  const logoutHandler = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');
      route.params.loginHandler(false);
    } catch (error) {
      Alert.alert('Logout unsuccessful', 'user id, userToken not found');
    }
  };

  const followHandler = () => {
    console.log(
      'followHandler function , method: following ? DELETE : POST, url :${backend_url}/follow/${userid}` ',
    );
  };

  const fetchConnectionLevel = () => {
    console.log(
      'fetchConnectionLevel function, method: get, url:${backend_url}/follow/networklevel/${route.params.userID}',
    );
  };

  const dateConvert = value => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date(value);
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <MaterialIcons
            name="arrow-back-ios"
            size={normalize(26)}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity onPress={logoutHandler} activeOpacity={0.5}>
          <MaterialIcons
            name="logout"
            color={theme.colors.primary}
            size={normalize(26)}
          />
        </TouchableOpacity>
      </View>
      {isLoading ? <Loader /> : null}
      {user.profile && user.profile != null ? (
        <ScrollView style={{opacity: isLoading ? 0 : 1}}>
          <View style={styles.userProfileImage}>
            <View style={styles.profileImage}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
                source={
                  user.profile.img_file_name
                    ? {uri: user.profile.img_file_name}
                    : require('../../assets/male.png')
                }
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
              />
            </View>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.userNameDetails}>
              <Text style={styles.userName}>
                {user.profile.First_Name} {user.profile.Last_Name}
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
            {user.profile.Title ? (
              <Text style={styles.userDesc}>{user.profile.Title}</Text>
            ) : null}
            {owner ? null : (
              <View style={styles.followSection}>
                <TouchableOpacity onPress={followHandler} activeOpacity={0.5}>
                  {following ? (
                    <Text style={styles.followingButton}>Following</Text>
                  ) : (
                    <Text style={styles.followingButton}>Follow</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    () => console.log('navigate to chat-section ')
                    // navigation.navigate('chat-section', {
                    //   name: `${user.profile.First_Name} ${user.profile.Last_Name}`,
                    //   id: route.params.userID,
                    // })
                  }
                  activeOpacity={0.5}>
                  <Text style={[styles.followingButton, styles.messageButton]}>
                    Message
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.infoBox}>
            <View style={styles.boxHeader}>
              <Text style={styles.infoHeader}>Personal Info</Text>
              {owner ? (
                <TouchableOpacity
                  onPress={
                    () => console.log('navigate to user-profile')
                    // navigation.navigate('user-profile', {
                    //   user: user.profile,
                    // })
                  }
                  activeOpacity={0.5}>
                  <Ionicons
                    name="create"
                    color={theme.colors.primary}
                    size={normalize(24)}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {user.experience?.length ? (
            <View style={styles.infoBox}>
              <View style={styles.boxHeader}>
                <Text style={styles.infoHeader}>Experience</Text>
                {owner ? (
                  <TouchableOpacity
                    onPress={() => console.log('navigate to user-experience')}
                    activeOpacity={0.5}>
                    <Ionicons
                      name="create"
                      color={theme.colors.primary}
                      size={normalize(24)}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              {user.experience.map((el, index) => {
                return (
                  <View key={index} style={styles.userEducationItem}>
                    <Text style={styles.organisationName}>
                      {el.Company_name}
                    </Text>
                    <Text style={styles.role}>{el.Role}</Text>
                    {el.To ? (
                      <Text>
                        {dateConvert(el.From)} - {dateConvert(el.To)}
                      </Text>
                    ) : (
                      <Text>{dateConvert(el.From)} - Present</Text>
                    )}
                  </View>
                );
              })}
            </View>
          ) : null}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  profileHeader: {
    height: normalize(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(theme.spacing.small),
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    textTransform: 'uppercase',
    color: theme.colors.primary,
  },
  userProfileImage: {
    height: normalize(100),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    position: 'relative',
    marginBottom: normalize(50),
  },
  profileImage: {
    backgroundColor: theme.colors.white,
    borderRadius: normalize(100),
    height: normalize(100),
    width: normalize(100),
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
    borderColor: theme.colors.primary,
  },
  userInfo: {
    alignItems: 'center',
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: normalize(theme.spacing.mediumLarge),
  },
  userNameDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: normalize(theme.fontSizes.large),
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  connectionLevel: {
    fontSize: normalize(theme.fontSizes.extraSmall),
    color: theme.colors.black,
  },
  userDesc: {
    fontSize: normalize(theme.fontSizes.medium),
    paddingTop: normalize(theme.spacing.extraSmall),
    color: theme.colors.black,
  },
  followSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: theme.colors.white,
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: normalize(5),
    fontSize: normalize(theme.fontSizes.medium),
    letterSpacing: 0.75,
    marginTop: normalize(theme.spacing.small),
    paddingHorizontal: normalize(theme.spacing.small),
    paddingVertical: normalize(theme.spacing.extraSmall),
  },
  messageButton: {
    marginLeft: normalize(theme.spacing.small),
  },
  infoBox: {
    padding: normalize(theme.spacing.small),
    marginVertical: normalize(theme.spacing.extraSmall),
    borderColor: 'black',
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  infoHeader: {
    fontSize: normalize(theme.fontSizes.large),
    fontWeight: theme.fontWeight.bold,
    width: '95%',
    color: theme.colors.black,
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default Profile;
