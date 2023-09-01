import React from 'react';
import {StyleSheet, Image} from 'react-native';

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
  },
});

export default AccountImage;
