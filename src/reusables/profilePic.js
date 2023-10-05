import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

const ProfilePicture = ({firstName, lastName, style}) => {
  const renderProfilePic = () => {
    if (firstName) {
      const nameWords = firstName.split(' ');

      if (nameWords.length >= 2) {
        const secondName = nameWords[1];
        const initials = `${firstName.charAt(0).toUpperCase()}${secondName
          .charAt(0)
          .toUpperCase()}`;

        return (
          <View style={[styles.profilePic, style]}>
            <Text style={styles.profilePicText}>{initials}</Text>
          </View>
        );
      } else {
        const lastNameInitial = lastName
          ? lastName.charAt(0).toUpperCase()
          : '';
        const firstNameInitial = firstName.charAt(0).toUpperCase();
        const initials = `${firstNameInitial}${lastNameInitial}`;

        return (
          <View style={[styles.profilePic, style]}>
            <Text style={styles.profilePicText}>{initials}</Text>
          </View>
        );
      }
    }

    return null;
  };

  return renderProfilePic();
};

const styles = StyleSheet.create({
  profilePic: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(100),
    alignItems: 'center',
    justifyContent: 'center',
    // Add other default styles here
  },
  profilePicText: {
    fontSize: normalize(18), // Default size
    fontWeight: 'bold',
    color: 'white', // Default color
    // Add other default text styles here
  },
});

export default ProfilePicture;
