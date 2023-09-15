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
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../theme';
import normalize from 'react-native-normalize';
import Loader from '../reusables/Loader';

const Profile = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [user, setUser] = useState('');
  const [dob, setDOB] = useState(
    route.params?.user?.profile?.DOB
      ? new Date(route.params?.user.profile.DOB)
      : null,
  );
  const [skills, setSkills] = useState([]);
  const [userID, setUserID] = useState(null);
  const [owner, setOwner] = useState(true);
  const [following, setFollowing] = useState(false);
  const [connectionLevel, setConnectionLevel] = useState(0);
  const [showAll, setShowAll] = useState({
    isShownAllExperience: false,
    isShownAllEducation: false,
    isShownAllSkills: false,
  });

  useEffect(() => {
    setUser(route.params?.user);
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
        (await AsyncStorage.getItem('userId')) !== route.params.userID
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
      {user && user != null ? (
        <ScrollView style={{opacity: isLoading ? 0 : 1}}>
          <View style={styles.userProfileImage}>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
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
                  <Text style={styles.details}> {connectionLevel}</Text>
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
          <View style={styles.userDetailesContainer}>
            <View style={styles.infoBox}>
              <View style={styles.boxHeader}>
                <Text style={styles.infoHeader}>Personal Info</Text>
                {owner ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('edit-profile', {
                        user: user,
                      })
                    }
                    activeOpacity={0.5}>
                    <AntDesign
                      name="edit"
                      color={theme.colors.primary}
                      size={normalize(24)}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={styles.userInfoBox}>
                <View style={styles.personalInfoItem}>
                  <Text style={styles.details}>Date Of Birth :</Text>
                  {dob != null ? (
                    <Text style={styles.details}>
                      {`${
                        dob.getDate().toString().length === 1
                          ? '0' + dob.getDate()
                          : dob.getDate()
                      } - ${
                        (dob.getMonth() + 1).toString().length === 1
                          ? '0' + (dob.getMonth() + 1)
                          : dob.getMonth() + 1
                      } - ${dob.getFullYear()}`}
                    </Text>
                  ) : (
                    <Text style={styles.details}>----</Text>
                  )}
                </View>
                <View style={styles.personalInfoItem}>
                  <Text style={styles.details}>Email :</Text>
                  {user.profile.Email !== '' && null ? (
                    <Text style={styles.details}>{user.profile.Email}</Text>
                  ) : (
                    <Text style={styles.details}>----</Text>
                  )}
                </View>
                <View style={styles.personalInfoItem}>
                  <Text style={styles.details}>Phone :</Text>
                  {user.profile.phone_no !== '' && null ? (
                    <Text style={styles.details}>{user.profile.phone_no}</Text>
                  ) : (
                    <Text style={styles.details}>----</Text>
                  )}
                </View>
                <View style={styles.personalInfoItem}>
                  <Text style={styles.details}>Location :</Text>
                  {user.profile.Location != null ? (
                    <Text style={styles.details}>{user.profile.Location}</Text>
                  ) : (
                    <Text style={styles.details}>----</Text>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.boxHeader}>
              <Text style={styles.infoHeader}>Experience</Text>
              {owner ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('user-experience', {
                      experience: user?.experience,
                    })
                  }
                  activeOpacity={0.5}>
                  <AntDesign
                    name="edit"
                    color={theme.colors.primary}
                    size={normalize(24)}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            {user.experience?.length ? (
              <View style={styles.infoBox}>
                {user.experience
                  ? user.experience
                      .slice(
                        0,
                        showAll.isShownAllExperience
                          ? user.experience.length
                          : 3,
                      )
                      .map((experienceElement, index) => {
                        return (
                          <View key={index} style={styles.userEducationItem}>
                            <Text style={styles.organisationName}>
                              {experienceElement.Company_name}
                            </Text>
                            <Text style={styles.role}>
                              {experienceElement.Role}
                            </Text>
                            {experienceElement.To ? (
                              <Text style={styles.dateStyle}>
                                {dateConvert(experienceElement.From)} -{' '}
                                {dateConvert(experienceElement.To)}
                              </Text>
                            ) : (
                              <Text style={styles.dateStyle}>
                                {dateConvert(experienceElement.From)} - Present
                              </Text>
                            )}
                          </View>
                        );
                      })
                  : null}
                {user.experience.length > 3 ? (
                  <TouchableOpacity
                    onPress={() =>
                      setShowAll({
                        ...showAll,
                        isShownAllExperience: !showAll.isShownAllExperience,
                      })
                    }>
                    {showAll.isShownAllExperience ? (
                      <Text style={styles.showMore}>show less</Text>
                    ) : (
                      <Text style={styles.showMore}>show more</Text>
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : (
              <View style={styles.NoProjectContainer}>
                <Text style={styles.NoProject}>No experience to display.</Text>
                <Text style={styles.NoProject}>
                  Click on 'edit' icon to add your experience.
                </Text>
              </View>
            )}

            <View style={styles.boxHeader}>
              <Text style={styles.infoHeader}>Education</Text>
              {owner ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('user-education', {
                      education: user?.education,
                    })
                  }
                  activeOpacity={0.5}>
                  <AntDesign
                    name="edit"
                    color={theme.colors.primary}
                    size={normalize(24)}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            {user.education?.length ? (
              <View style={styles.infoBox}>
                {user.education
                  ? user.education
                      .slice(
                        0,
                        showAll.isShownAllEducation
                          ? user.experience.length
                          : 3,
                      )
                      .map((educationElement, index) => {
                        return (
                          <View key={index} style={styles.userEducationItem}>
                            <Text style={styles.organisationName}>
                              {educationElement.college_name}
                            </Text>
                            {educationElement.To ? (
                              <Text style={styles.dateStyle}>
                                {dateConvert(educationElement.From)} -{' '}
                                {dateConvert(educationElement.To)}
                              </Text>
                            ) : (
                              <Text style={styles.dateStyle}>
                                {dateConvert(educationElement.From)} - Present
                              </Text>
                            )}
                          </View>
                        );
                      })
                  : null}
                {user.education.length > 3 ? (
                  <TouchableOpacity
                    onPress={() =>
                      setShowAll({
                        ...showAll,
                        isShownAllEducation: !showAll.isShownAllEducation,
                      })
                    }>
                    {showAll.isShownAllEducation ? (
                      <Text style={styles.showMore}>show less</Text>
                    ) : (
                      <Text style={styles.showMore}>show more</Text>
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : (
              <View style={styles.NoProjectContainer}>
                <Text style={styles.NoProject}>No education to display.</Text>
                <Text style={styles.NoProject}>
                  Click on 'edit' icon to add your education details.
                </Text>
              </View>
            )}

            <View style={styles.boxHeader}>
              <Text style={styles.infoHeader}>Skills</Text>
              {owner ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('user-skill', {
                      skills: user.skills,
                    })
                  }
                  activeOpacity={0.5}>
                  <AntDesign
                    name="edit"
                    color={theme.colors.primary}
                    size={normalize(24)}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            {user.skills?.length ? (
              <View style={styles.infoBox}>
                <View style={styles.skillsContainer}>
                  {user.skills
                    ? user.skills
                        .slice(
                          0,
                          showAll.isShownAllSkills ? user.experience.length : 3,
                        )
                        .map((skillElement, index) => {
                          return (
                            <Text key={index} style={styles.skillItem}>
                              {skillElement}
                            </Text>
                          );
                        })
                    : null}
                  {user.skills.length > 3 ? (
                    <TouchableOpacity
                      onPress={() =>
                        setShowAll({
                          ...showAll,
                          isShownAllSkills: !showAll.isShownAllSkills,
                        })
                      }>
                      {showAll.isShownAllSkills ? (
                        <Text style={styles.showMore}>show less</Text>
                      ) : (
                        <Text style={styles.showMore}>show more</Text>
                      )}
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            ) : (
              <View style={styles.NoProjectContainer}>
                <Text style={styles.NoProject}>No skills to display.</Text>
                <Text style={styles.NoProject}>
                  Click on 'edit' icon to add your skills.
                </Text>
              </View>
            )}

            {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate('user-details', {
                  userid: userID,
                  skills: user.skills,
                })
              }
              activeOpacity={0.5}>
              <Text style={styles.showMore}>SHOW MORE</Text>
            </TouchableOpacity> */}
            <View style={styles.infoBox}>
              <Text style={styles.infoHeader}>Achievements</Text>
              <TouchableOpacity
                style={styles.achivementItem}
                disabled={!(user.projects || owner)}
                onPress={() =>
                  navigation.navigate('user-project', {
                    userid: userID,
                    projects: user.projects,
                  })
                }
                activeOpacity={0.5}>
                <Text style={styles.achievementText}>
                  Projects ({user.projects?.length || 0})
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="#376eb3"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.achivementItem}
                disabled={!(user.courses || owner)}
                onPress={() =>
                  navigation.navigate('user-course', {
                    userid: userID,
                    courses: user.courses,
                  })
                }
                activeOpacity={0.5}>
                <Text style={styles.achievementText}>
                  Courses ({user.courses?.length || 0})
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="#376eb3"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.achivementItem}
                disabled={!(user.publications || owner)}
                onPress={() =>
                  navigation.navigate('user-publication', {
                    userid: userID,
                    publications: user.publications,
                  })
                }
                activeOpacity={0.5}>
                <Text style={styles.achievementText}>
                  Publications ({user.publications?.length || 0})
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="#376eb3"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  NoProjectContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: normalize(theme.spacing.extraSmall),
  },
  NoProject: {
    fontSize: normalize(theme.fontSizes.small),
    color: theme.colors.black,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  profileHeader: {
    height: normalize(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(theme.spacing.large),
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
  profileImageContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: normalize(100),
    height: normalize(100),
    width: normalize(100),
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
  },
  profileImage: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(100),
  },
  userInfo: {
    alignItems: 'center',
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: normalize(theme.spacing.extraLarge),
  },
  userNameDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    fontWeight: 'bold',
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  connectionLevel: {
    fontSize: normalize(theme.fontSizes.extraSmall),
    color: theme.colors.black,
  },
  userDesc: {
    fontSize: normalize(theme.fontSizes.medium),
    paddingTop: normalize(theme.spacing.extraSmall),
    color: theme.colors.level2,
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
    borderColor: theme.colors.grey,
    borderBottomWidth: 0,
  },
  infoHeader: {
    fontSize: normalize(theme.fontSizes.large),
    fontWeight: theme.fontWeight.bold,
    width: '95%',
    color: theme.colors.black,
  },
  boxHeader: {
    padding: normalize(theme.spacing.small),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  personalInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: normalize(theme.spacing.extraSmall),
    fontSize: normalize(theme.fontSizes.medium),
  },
  details: {
    color: theme.colors.black,
  },
  userEducationItem: {
    paddingVertical: normalize(theme.spacing.small),
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: 1,
  },
  organisationName: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginBottom: normalize(theme.spacing.extraSmall),
    textTransform: 'capitalize',
    color: theme.colors.black,
  },
  role: {
    marginBottom: 5,
    color: theme.colors.level2,
  },
  dateStyle: {
    color: theme.colors.level2,
  },
  userInfoBox: {
    marginTop: normalize(theme.spacing.small),
  },
  skillsContainer: {
    marginVertical: normalize(theme.spacing.small),
  },
  skillItem: {
    borderBottomWidth: 1,
    height: normalize(50),
    lineHeight: normalize(50),
    borderColor: theme.colors.grey,
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  showMore: {
    color: theme.colors.primary,
    alignSelf: 'center',
    marginBottom: normalize(theme.spacing.small),
  },
  achivementItem: {
    height: normalize(50),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: theme.colors.grey,
    flexDirection: 'row',
  },
  achievementText: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.primary,
  },
  userDetailesContainer: {
    marginHorizontal: normalize(theme.spacing.small),
  },
});
export default Profile;
