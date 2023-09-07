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

const UserCourse = ({navigation, route}) => {
  const [course, setCourse] = useState(() => []);
  const {userid} = route.params;
  const [owner, setOwner] = useState(() => true);
  const [isLoading, setIsLoading] = useState(() => false);

  let courseArr = [
    {
      title: 'course1',
    },
    {
      title: 'course2',
    },
    {
      title: 'course3',
    },
  ];

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
          <Ionicons name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Courses</Text>
        {owner ? (
          <TouchableOpacity
            // onPress={() => navigation.navigate('edit-course')}
            activeOpacity={0.5}>
            <Ionicons name="add" size={32} color="#fff" />
          </TouchableOpacity>
        ) : (
          <Ionicons size={32} color="#376eb3" />
        )}
      </View>
      {courseArr.length ? (
        <ScrollView style={{opacity: isLoading ? 0 : 1}}>
          <View style={styles.coursesContainer}>
            {courseArr.map((el, index) => {
              return (
                <View key={index} style={styles.couseItem}>
                  <Text style={styles.courseText}>{el.title}</Text>
                  {owner ? (
                    <TouchableOpacity
                      // onPress={() =>
                      //   navigation.navigate('edit-course', {
                      //     course: el,
                      //   })
                      // }
                      activeOpacity={0.5}>
                      <Ionicons name="create" color={'#376eb3'} size={24} />
                    </TouchableOpacity>
                  ) : null}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: 50,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  courseText: {
    fontSize: 20,
    height: 60,
    lineHeight: 60,
    color: '#000',
  },
});

export default UserCourse;
