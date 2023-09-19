import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const UserCourse = ({navigation, route}) => {
  const [course, setCourse] = useState(() => []);
  const {userid} = route.params;
  const [owner, setOwner] = useState(() => true);
  const [isLoading, setIsLoading] = useState(() => false);

  let courseArr = route.params?.courses ? route.params.courses : null;

  useEffect(() => fetchCourses(), []);

  const getToken = async () => {
    try {
      userid === (await AsyncStorage.getItem('userId'))
        ? setOwner(true)
        : setOwner(false);
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      alert('Something went wrong');
    }
  };

  const fetchCourses = () => {
    // setIsLoading(true);
    // getToken().then(async token => {
    //   const response = await axios.get(
    //     `${backend_url}/profiles/usercourses/${userid}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   if (response.data.statuscode === 1) {
    //     setIsLoading(false);
    //     setCourse(response.data.courses);
    //   } else {
    //     setIsLoading(false);
    //     alert('Something went wrong. Please, Try again');
    //   }
    // });
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
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Courses</Text>
        {owner ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('edit-course')}
            activeOpacity={0.5}>
            <Ionicons
              name="add"
              size={normalize(32)}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        ) : (
          <Ionicons size={normalize(32)} color={theme.colors.black} />
        )}
      </View>
      {courseArr && courseArr.length ? (
        <ScrollView style={{opacity: isLoading ? 0 : 1}}>
          <View style={styles.coursesContainer}>
            {courseArr.map((el, index) => {
              return (
                <View key={index} style={styles.couseItem}>
                  <Text style={styles.courseText}>{el.title}</Text>
                  {owner ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('edit-course', {
                          course: el,
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
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.NoProjectContainer}>
          <Text style={styles.NoProject}>No projects to display</Text>
          <Text style={styles.NoProject}>
            Click on '+' icon to add a project.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  NoProjectContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  NoProject: {
    fontSize: normalize(theme.fontSizes.small),
    color: theme.colors.darkgrey,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  profileHeader: {
    height: normalize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(theme.spacing.large),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
  },
  coursesContainer: {
    padding: normalize(theme.spacing.medium),
  },
  couseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: normalize(3),
    borderColor: theme.colors.border,
  },
  courseText: {
    fontSize: normalize(theme.fontSizes.large),
    height: normalize(60),
    lineHeight: normalize(60),
    color: theme.colors.black,
  },
});

export default UserCourse;
