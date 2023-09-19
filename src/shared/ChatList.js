import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const ChatList = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.chatList}
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate('chat-section', {
          name: `${item.profile.First_Name} ${item.profile.Last_Name}`,
          id: item.UserId,
        })
      }>
      <View style={styles.chatSection}>
        <Image
          style={styles.chatImage}
          source={
            item.profile.img_file_name
              ? {
                  uri: item.profile.img_file_name,
                }
              : require('../../assets/male.png')
          }
        />
        <View style={styles.chatData}>
          <View style={styles.chatDetails}>
            <Text style={styles.chatName}>
              {item.profile.First_Name} {item.profile.Last_Name}
            </Text>
            {/* <Moment style={styles.chatTime} element={Text} fromNow ago>
              {item.Timestamp}
            </Moment> */}
          </View>
          {item.flag === 'sender' ? (
            <Text style={styles.chatMessage} numberOfLines={1}>
              You: {item.message}
            </Text>
          ) : (
            <Text style={styles.chatMessage} numberOfLines={1}>
              {item.message}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatList: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  chatSection: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: 10,
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: theme.colors.primary,
    borderWidth: 0.5,
  },
  chatData: {
    flex: 1,
    paddingLeft: '5%',
  },
  chatDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatName: {
    width: '80%',
    fontSize: 18,
    color: theme.colors.black,
  },
  chatTime: {
    fontSize: 14,
  },
  chatMessage: {
    paddingTop: 5,
    fontSize: 15,
    color: 'grey',
  },
});

export default ChatList;
