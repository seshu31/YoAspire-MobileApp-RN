import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserSkill = ({navigation, route}) => {
  const {skills} = route.params;

  let skillsArr = ['Html', 'Css', 'JavaScript', 'React', 'Angular'];

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <Ionicons name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Skills</Text>
        <TouchableOpacity
          onPress={() =>
            // navigation.navigate('edit-skill', {
            //   skills: skills,
            // })
            {}
          }
          activeOpacity={0.5}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.coursesContainer}>
          {skillsArr.map((el, index) => {
            return (
              <View key={index} style={styles.couseItem}>
                <Text style={styles.skillItem}>{el}</Text>
                <TouchableOpacity
                  // onPress={() =>
                  //   navigation.navigate('edit-skill', {
                  //     skill: el,
                  //     skills: skills,
                  //   })
                  // }
                  activeOpacity={0.5}>
                  <Ionicons name="create" color={'#376eb3'} size={24} />
                </TouchableOpacity>
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
    height: 60,
    alignItems: 'center',
  },
  skillItem: {
    fontSize: 20,
    width: '90%',
    color: '#000',
  },
});

export default UserSkill;
