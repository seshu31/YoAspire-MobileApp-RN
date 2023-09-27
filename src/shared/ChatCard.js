import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import theme from '../../theme';
import normalize from 'react-native-normalize';
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
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: '5%',
    width: '85%',
  },
  chatImage: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(100),
  },
  chatBody: {
    paddingLeft: normalize(theme.spacing.small),
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatName: {
    fontSize: normalize(theme.fontSizes.medium),
    fontWeight: theme.fontWeight.bold,
  },
  chatDot: {
    fontSize: normalize(theme.fontSizes.extraSmall),
    color: theme.colors.level2,
    paddingHorizontal: normalize(theme.spacing.extraSmall),
  },
  chatTime: {
    color: theme.colors.level2,
    fontSize: normalize(theme.fontSizes.small),
  },
  chatText: {
    paddingTop: normalize(theme.spacing.extraSmall),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.grey,
  },
});

export default ChatCard;
