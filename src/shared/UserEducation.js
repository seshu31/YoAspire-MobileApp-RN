import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const UserEducation = ({navigation, route}) => {
  const [education, setEducation] = useState(
    route.params?.education ? route.params.education : null,
  );
  console.log(education);
  const [isLoading, setIsLoading] = useState(() => false);

  useEffect(() => fetchEducation(), []);

  const getToken = async () => {
    try {
      return {
        userid: await AsyncStorage.getItem('userId'),
        token: await AsyncStorage.getItem('userToken'),
      };
    } catch (error) {
      alert('Something went wrong');
    }
  };

  const fetchEducation = () => {
    // setIsLoading(true);
    // getToken().then(async ({userid, token}) => {
    //   const response = await axios.get(
    //     `${backend_url}/profiles/usereducation/${userid}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   if (response.data.statuscode === 1) {
    //     setIsLoading(false);
    //     setEducation(response.data.education);
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
            size={normalize(26)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Education</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('edit-education')}
          activeOpacity={0.5}>
          <Ionicons
            name="add"
            size={normalize(32)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
      {education && education.length ? (
        <ScrollView style={{opacity: isLoading ? 0 : 1}}>
          <View style={styles.coursesContainer}>
            {education.map((el, index) => {
              return (
                <View key={index} style={styles.couseItem}>
                  <View>
                    <Text style={styles.organisationName}>{el.title}</Text>
                    {el.To ? (
                      <Text style={styles.dateText}>
                        {dateConvert(el.From)} - {dateConvert(el.To)}
                      </Text>
                    ) : (
                      <Text style={styles.dateText}>
                        {dateConvert(el.From)} - Present
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('edit-education', {
                        education: el,
                      })
                    }
                    style={styles.editIcon}
                    activeOpacity={0.5}>
                    <AntDesign
                      name="edit"
                      color={theme.colors.primary}
                      size={normalize(24)}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.NoProjectContainer}>
          <Text style={styles.NoProject}>No education details to display</Text>
          <Text style={styles.NoProject}>
            Click on '+' icon to add education detail.
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
    justifyContent: 'space-between',
    borderBottomWidth: normalize(3),
    borderColor: theme.colors.border,
    paddingVertical: normalize(theme.spacing.small),
  },
  organisationName: {
    fontSize: normalize(theme.fontSizes.large),
    marginBottom: normalize(theme.spacing.extraSmall),
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
});

export default UserEducation;
