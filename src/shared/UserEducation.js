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

const UserEducation = ({navigation}) => {
  const [education, setEducation] = useState(() => [
    {
      title: 'title 1',
      From: new Date('2022-03-25'),
      To: new Date('2023-03-25'),
      college_name: 'Rgukt',
    },
    {
      title: 'title 2',
      From: new Date('2022-03-25'),
      To: new Date('2023-03-25'),
      college_name: 'Rgukt',
    },
    {
      title: 'title 3',
      From: new Date('2022-03-25'),
      To: new Date('2023-03-25'),
    },
  ]);
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
          <Ionicons name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Education</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('edit-education')}
          activeOpacity={0.5}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      {education.length ? (
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
                    <Ionicons
                      name="create-outline"
                      color={'#376eb3'}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : null}
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
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#376eb3',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileTitle: {
    fontSize: 24,
    color: '#fff',
  },
  coursesContainer: {
    padding: 15,
  },
  couseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  organisationName: {
    fontSize: 20,
    marginBottom: 5,
    color: '#000',
  },
  dateText: {
    fontSize: 16,
    color: '#444',
  },
  editIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserEducation;
