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

const UserPublication = ({navigation, route}) => {
  const [publication, setPublication] = useState(() => [
    {
      title: 'title 1',
      date: new Date('2022-03-25'),
    },
    {
      title: 'title 2',
      date: new Date('2022-03-25'),
    },
    {
      title: 'title 3',
      date: new Date('2022-03-25'),
    },
  ]);
  const {userid} = route.params;
  const [owner, setOwner] = useState(() => true);
  const [isLoading, setIsLoading] = useState(() => false);

  useEffect(() => fetchPublications(), []);

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

  const fetchPublications = () => {
    // setIsLoading(true);
    // getToken().then(async token => {
    //   const response = await axios.get(
    //     `${backend_url}/profiles/userpublications/${userid}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   if (response.data.statuscode === 1) {
    //     setIsLoading(false);
    //     setPublication(response.data.publications);
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
        <Text style={styles.profileTitle}>Publications</Text>
        {owner ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('edit-publication')}
            activeOpacity={0.5}>
            <Ionicons name="add" size={32} color="#fff" />
          </TouchableOpacity>
        ) : (
          <Ionicons size={32} color="#376eb3" />
        )}
      </View>
      {publication.length ? (
        <ScrollView style={{opacity: isLoading ? 0 : 1}}>
          <View style={styles.coursesContainer}>
            {publication.map((el, index) => {
              return (
                <View key={index} style={styles.couseItem}>
                  <View>
                    <Text style={styles.courseText}>{el.title}</Text>
                    <Text style={styles.dateText}>{dateConvert(el.date)}</Text>
                  </View>
                  {owner ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('edit-publication', {
                          publication: el,
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
  courseText: {
    fontSize: 20,
    marginBottom: 10,
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

export default UserPublication;
