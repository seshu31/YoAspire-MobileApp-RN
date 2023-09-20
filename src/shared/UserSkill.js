import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme';
import normalize from 'react-native-normalize';

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
            navigation.navigate('edit-skill', {
              skills: skills,
            })
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
                  onPress={() =>
                    navigation.navigate('edit-skill', {
                      skill: el,
                      skills: skills,
                    })
                  }
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
    backgroundColor: theme.colors.white,
  },
  profileHeader: {
    height: normalize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(theme.spacing.small),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
  },
  coursesContainer: {
    padding: normalize(15),
  },
  couseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: normalize(3),
    borderColor: theme.colors.border,
    paddingVertical: normalize(theme.spacing.small),
    height: normalize(60),
    alignItems: 'center',
  },
  skillItem: {
    fontSize: normalize(theme.fontSizes.large),
    width: '90%',
    color: theme.colors.black,
  },
});

export default UserSkill;
