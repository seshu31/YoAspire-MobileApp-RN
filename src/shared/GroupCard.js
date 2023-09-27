import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const GroupCard = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('group', {
          id: item.groupid,
        })
      }
      style={styles.groupDetails}
      activeOpacity={0.5}>
      <View style={styles.groupCard}>
        <Image
          style={styles.groupPhoto}
          source={
            item.image ? {uri: item.image} : require('../../assets/male.png')
          }
        />
        <Text style={styles.groupName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  groupDetails: {
    backgroundColor: theme.colors.whiteSmoke,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(theme.spacing.medium),
    paddingVertical: normalize(theme.spacing.small),
    width: '85%',
  },
  groupPhoto: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(100),
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  groupName: {
    fontSize: normalize(17),
    paddingLeft: normalize(theme.spacing.medium),
    color: theme.colors.level2,
  },
});

export default GroupCard;
