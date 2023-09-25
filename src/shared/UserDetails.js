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
import theme from '../../theme';
import normalize from 'react-native-normalize';

const UserDetails = ({navigation, route}) => {
  const {userid, skills} = route.params;
  const [experience, setExperience] = useState(() => [
    {
      Company_name: 'title 1',
      role: 'role1',
      From: new Date('2022-03-25'),
      To: new Date('2023-03-25'),
    },
    {
      Company_name: 'title 2',
      role: 'role1',
      From: new Date('2022-03-25'),
      To: new Date('2023-03-25'),
    },
    {
      Company_name: 'title 3',
      role: 'role1',
      From: new Date('2022-03-25'),
      To: new Date('2023-03-25'),
    },
  ]);
  const [education, setEducation] = useState(() => [
    {
      college_name: 'title 1',
      From: new Date('2022-03-25'),
      To: new Date('2023-03-25'),
    },
    {
      college_name: 'title 2',
      From: new Date('2022-03-25'),
      To: new Date('2023-03-25'),
    },
    {
      college_name: 'title 3',
      From: new Date('2022-03-25'),
      To: new Date('2023-03-25'),
    },
  ]);
  const [owner, setOwner] = useState(() => true);
  const [expLoading, setExpLoading] = useState(() => false);
  const [eduLoading, setEduLoading] = useState(() => false);

  let skillsArr = ['Html', 'Css', 'JavaScript', 'React', 'Angular'];

  useEffect(() => fetchDetails(), []);

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

  const fetchDetails = () => {
    // setExpLoading(true);
    // setEduLoading(true);
    // getToken().then(async token => {
    //   const experienceData = await axios.get(
    //     `${backend_url}/profiles/userexperience/${userid}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   if (experienceData.data.statuscode === 1) {
    //     setExpLoading(false);
    //     setExperience(experienceData.data.experience);
    //   } else {
    //     setExpLoading(false);
    //     alert('Something went wrong. Please, Try again');
    //   }
    //   const educationData = await axios.get(
    //     `${backend_url}/profiles/usereducation/${userid}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   if (educationData.data.statuscode === 1) {
    //     setEduLoading(false);
    //     setEducation(educationData.data.education);
    //   } else {
    //     setEduLoading(false);
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
          <Ionicons name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Background</Text>
      </View>

      <ScrollView style={{opacity: expLoading || eduLoading ? 0 : 1}}>
        <View style={styles.coursesContainer}>
          <View style={styles.titleHeader}>
            <Text style={styles.subHeading}>Experience</Text>
            {owner ? (
              <TouchableOpacity
                // onPress={() => navigation.navigate('edit-experience')}
                activeOpacity={0.5}>
                <Ionicons name="add" size={32} color="#376eb3" />
              </TouchableOpacity>
            ) : null}
          </View>
          {experience.map((el, index) => {
            return (
              <View key={index} style={styles.couseItem}>
                <View>
                  <Text style={styles.organisationName}>{el.Company_name}</Text>
                  <Text style={styles.role}>{el.role}</Text>
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
                {owner ? (
                  <TouchableOpacity
                    // onPress={() =>
                    //   navigation.navigate('edit-experience', {
                    //     experience: el,
                    //   })
                    // }
                    style={styles.editIcon}
                    activeOpacity={0.5}>
                    <Ionicons name="create" color={'#376eb3'} size={24} />
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
        </View>
        <View style={styles.coursesContainer}>
          <View style={styles.titleHeader}>
            <Text style={styles.subHeading}>Education</Text>
            {owner ? (
              <TouchableOpacity
                // onPress={() => navigation.navigate('edit-education')}
                activeOpacity={0.5}>
                <Ionicons name="add" size={32} color="#376eb3" />
              </TouchableOpacity>
            ) : null}
          </View>
          {education.map((el, index) => {
            return (
              <View key={index} style={styles.couseItem}>
                <View>
                  <Text style={styles.organisationName}>{el.college_name}</Text>
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
                {owner ? (
                  <TouchableOpacity
                    // onPress={() =>
                    //   navigation.navigate('edit-education', {
                    //     education: el,
                    //   })
                    // }
                    style={styles.editIcon}
                    activeOpacity={0.5}>
                    <Ionicons name="create" color={'#376eb3'} size={24} />
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
        </View>
        <View style={styles.coursesContainer}>
          <View style={styles.titleHeader}>
            <Text style={styles.subHeading}>Skills</Text>
            {owner ? (
              <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate('edit-skill', {skills: skills})
                // }
                activeOpacity={0.5}>
                <Ionicons name="add" size={32} color="#376eb3" />
              </TouchableOpacity>
            ) : null}
          </View>
          {skillsArr.map((el, index) => {
            return (
              <View key={index} style={styles.couseItem}>
                <Text style={styles.skillItem}>{el}</Text>
                {owner ? (
                  <TouchableOpacity
                    // onPress={() =>
                    //   navigation.navigate('edit-skill', {
                    //     skill: el,
                    //     skills: skills,
                    //   })
                    // }
                    style={styles.editIcon}
                    activeOpacity={0.5}>
                    <Ionicons
                      name="create"
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
    paddingHorizontal: normalize(theme.spacing.small),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
    paddingLeft: '30%',
  },
  titleHeader: {
    marginHorizontal: normalize(-theme.spacing.medium),
    padding: normalize(theme.spacing.medium),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.whiteSmoke,
  },
  coursesContainer: {
    paddingHorizontal: normalize(theme.spacing.medium),
    paddingBottom: normalize(theme.spacing.medium),
  },
  couseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: normalize(3),
    borderColor: theme.colors.border,
    paddingVertical: normalize(theme.spacing.small),
    color: theme.colors.black,
  },
  organisationName: {
    fontSize: normalize(theme.fontSizes.large),
    marginBottom: normalize(theme.spacing.extraSmall),
    textTransform: 'capitalize',
    color: theme.colors.black,
  },
  role: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginBottom: normalize(theme.spacing.extraSmall),
    color: theme.colors.black,
  },
  skillItem: {
    fontSize: normalize(theme.fontSizes.medium),
    height: normalize(40),
    width: '90%',
    color: theme.colors.black,
    lineHeight: normalize(40),
  },
  dateText: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.level2,
  },
  editIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeading: {
    fontSize: normalize(theme.fontSizes.large),
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
});

export default UserDetails;
