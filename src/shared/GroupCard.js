import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

const GroupCard = ({item, navigation}) => {
  // console.log('entered into group card', item);
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
          source={require('../../assets/male.png')}
          // source={
          //   item.image ? {uri: item.image} : require('../../assets/male.png')
          // }
        />
        <Text style={styles.groupName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  groupDetails: {
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    width: '85%',
  },
  groupPhoto: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  groupName: {
    fontSize: 17,
    paddingLeft: '5%',
  },
});

export default GroupCard;
