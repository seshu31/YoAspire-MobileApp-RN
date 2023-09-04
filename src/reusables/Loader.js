import React from 'react';
import {StyleSheet, View, ActivityIndicator, Dimensions} from 'react-native';
import normalize from 'react-native-normalize';
// import theme from '../theme';
const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loaderArea}>
        <ActivityIndicator size="large" color="#376eb3" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(Dimensions.get('window').width),
    height: normalize(Dimensions.get('window').height),
    zIndex: 1,
  },
  loaderArea: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(10),
    // backgroundColor: theme.colors.light,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
