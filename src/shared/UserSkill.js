import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import normalize from 'react-native-normalize';
import theme from '../../theme';

const UserSkill = ({navigation, route}) => {
  const skills = route.params?.skills ? route.params.skills : null;

  let skillsArr = ['Html', 'Css', 'JavaScript', 'React', 'Angular'];

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
        <Text style={styles.profileTitle}>Skills</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('edit-skill', {
              skills: skills,
            })
          }
          activeOpacity={0.5}>
          <Ionicons
            name="add"
            size={normalize(32)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
      {skills && skills.length !== 0 ? (
        <ScrollView>
          <View style={styles.coursesContainer}>
            {skills.map((el, index) => {
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
          <Text style={styles.NoProject}>No skills to display</Text>
          <Text style={styles.NoProject}>
            Click on '+' icon to add a skill.
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
    alignItems: 'center',
  },
  NoProject: {
    fontSize: normalize(theme.fontSizes.small),
    color: 'black',
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
