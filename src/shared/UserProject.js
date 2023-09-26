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

const UserProject = ({navigation, route}) => {
  const [project, setProject] = useState(
    route.params?.projects ? route.params.projects : [],
  );
  const {userid} = route.params;
  const [owner, setOwner] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => fetchProjects(), []);

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

  const fetchProjects = () => {
    // setIsLoading(true);
    // getToken().then(async token => {
    //   const response = await axios.get(
    //     `${backend_url}/profiles/userprojects/${userid}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   if (response.data.statuscode === 1) {
    //     setIsLoading(false);
    //     setProject(response.data.projects);
    //   } else {
    //     setIsLoading(false);
    //     alert('Something went wrong. Please, Try again');
    //   }
    // });
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
            size={normalize(theme.iconSizes.mediumLarge)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Projects</Text>
        {owner ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('edit-project')}
            activeOpacity={0.5}>
            <Ionicons
              name="add"
              size={normalize(theme.iconSizes.large)}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        ) : (
          <Ionicons
            size={normalize(theme.iconSizes.mediumLarge)}
            color={theme.colors.primary}
          />
        )}
      </View>
      {project.length ? (
        <ScrollView style={{opacity: isLoading ? 0 : 1}}>
          <View style={styles.coursesContainer}>
            {project.map((el, index) => {
              return (
                <View key={index} style={styles.couseItem}>
                  <View>
                    <Text style={styles.courseText}>{el.title}</Text>
                    <Text style={styles.dateText}>
                      {dateConvert(el.From)} - {dateConvert(el.To)}
                    </Text>
                  </View>
                  {owner ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('edit-project', {
                          project: el,
                        })
                      }
                      style={styles.editIcon}
                      activeOpacity={0.5}>
                      <AntDesign
                        name="edit"
                        color={theme.colors.primary}
                        size={normalize(theme.iconSizes.medium)}
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
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: normalize(theme.spacing.small),
  },
  courseText: {
    fontSize: normalize(theme.fontSizes.large),
    marginBottom: normalize(theme.spacing.small),
    color: theme.colors.black,
  },
  dateText: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.level2,
  },
  editIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  NoProjectContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  NoProject: {
    fontSize: normalize(theme.fontSizes.small),
    color: theme.colors.darkgrey,
    textAlign: 'center',
  },
});

export default UserProject;
