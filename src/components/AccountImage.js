import React from 'react';
import {StyleSheet, Image} from 'react-native';
import normalize from 'react-native-normalize';

const AccountImage = () => {
  return (
    <Image
      source={require('../../assets/yoalogo.png')}
      style={styles.companyLogo}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  companyLogo: {
    width: '80%',
    height: normalize(250),
  },
});

export default AccountImage;
