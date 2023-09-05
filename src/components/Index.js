import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from './Header';
import Navigator from '../navigation/navigator';
import theme from '../../theme';

const Index = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Navigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export default Index;
