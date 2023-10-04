import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import theme from '../../theme';
import normalize from 'react-native-normalize';
import ProfilePicture from '../reusables/profilePic';
import getRandomColor from '../reusables/randomColor';

const ChatList = ({item, navigation}) => {
  const randomBackgroundColor = getRandomColor();
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
        {/* <Image
          style={styles.chatImage}
          source={
            item.profile.img_file_name
              ? {
                  uri: item.profile.img_file_name,
                }
              : require('../../assets/male.png')
          }
        /> */}
        <ProfilePicture
          firstName={item?.profile.First_Name}
          lastName={item?.profile.Last_Name}
          style={{
            backgroundColor: randomBackgroundColor,
            height: normalize(50),
            width: normalize(50),
          }}
        />
        <View style={styles.chatData}>
          <View style={styles.chatDetails}>
            <Text style={styles.chatName} numberOfLines={1}>
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
    borderBottomColor: theme.colors.grey,
  },
  chatSection: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: normalize(theme.spacing.small),
  },
  chatImage: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(100),
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
    fontSize: normalize(theme.fontSizes.mediumLarge),
    color: theme.colors.black,
  },
  chatTime: {
    fontSize: normalize(theme.fontSizes.small),
  },
  chatMessage: {
    paddingTop: normalize(theme.spacing.extraSmall),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.grey,
  },
});

export default ChatList;
