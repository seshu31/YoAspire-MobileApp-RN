import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const ChatCard = ({item}) => {
  return (
    <View style={styles.chatSection}>
      <Image
        style={styles.chatImage}
        source={
          item.profile.img_file_name
            ? {uri: item.profile.img_file_name}
            : require('../../assets/male.png')
        }
      />
      <View style={styles.chatBody}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>
            {item.profile.First_Name} {item.profile.Last_Name}
          </Text>
          <Text style={styles.chatDot}>{'\u2B24'}</Text>
          {/* <Moment style={styles.chatTime} element={Text} format="HH:mm">
            {item.Timestamp}
          </Moment> */}
        </View>
        <Text style={styles.chatText}>{item.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatSection: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: '5%',
    width: '85%',
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  chatBody: {
    paddingLeft: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  chatDot: {
    fontSize: 6,
    color: '#606060',
    paddingHorizontal: 7,
  },
  chatTime: {
    color: '#606060',
    fontSize: 13,
  },
  chatText: {
    paddingTop: 5,
    fontSize: 15,
    color: 'grey',
  },
});

export default ChatCard;
