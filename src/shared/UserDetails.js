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
                    <Ionicons name="create" color={'#376eb3'} size={24} />
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
    backgroundColor: '#fff',
  },
  profileHeader: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#376eb3',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileTitle: {
    fontSize: 24,
    color: '#fff',
    paddingLeft: '30%',
  },
  titleHeader: {
    marginHorizontal: -15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f2ef',
  },
  coursesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  couseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    color: '#000',
  },
  organisationName: {
    fontSize: 20,
    marginBottom: 5,
    textTransform: 'capitalize',
    color: '#000',
  },
  role: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000',
  },
  skillItem: {
    fontSize: 16,
    height: 40,
    width: '90%',
    color: '#000',
    lineHeight: 40,
  },
  dateText: {
    fontSize: 16,
    color: '#444',
  },
  editIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#376eb3',
  },
});

export default UserDetails;
