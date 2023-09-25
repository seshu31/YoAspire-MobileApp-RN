import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Menu} from 'react-native-paper';
import normalize from 'react-native-normalize';
import Loader from '../reusables/Loader';
import theme from '../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CommentCard = ({item, navigation, admin, fetchComments}) => {
  const [liked, setLiked] = useState(() => true);
  const [likeCount, setLikeCount] = useState(5);
  const [visible, setVisible] = useState(() => false);

  const likeHandler = () => {
    // Toggle the liked state
    setLiked(!liked);

    // Log whether the item was liked or unliked
    if (!liked) {
      setLikeCount(likeCount + 1);
      console.log('Item liked');
    } else {
      setLikeCount(likeCount - 1);
      console.log('Item unliked');
    }
  };

  const dialogHandler = () =>
    Alert.alert(
      'Are you sure?',
      'You want to delete this comment',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setVisible(false),
        },
        {text: 'OK', onPress: deleteHandler},
      ],
      {cancelable: false},
    );

  const deleteHandler = () => {
    console.log('medthod: get, url: ${backend_url}/comment/${item.CommentId}');
  };

  return (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../../assets/male.png')}
          />
          <Text style={styles.username}>
            {item.First_Name} {item.Last_Name}
          </Text>
        </View>
        {admin ? (
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => setVisible(true)}
                style={{paddingHorizontal: '2%'}}>
                <MaterialIcons name="more-vert" size={26} color="#303030" />
              </TouchableOpacity>
            }>
            <Menu.Item onPress={dialogHandler} title="Delete" />
          </Menu>
        ) : null}
      </View>
      <Text style={styles.comment}> {item.Comment}</Text>
      <View style={styles.likeSection}>
        <View style={styles.likeButton}>
          <TouchableOpacity onPress={likeHandler} activeOpacity={0.5}>
            {liked ? (
              <AntDesign
                name="like1"
                size={24}
                color="#1b76f2" // Color when liked
              />
            ) : (
              <AntDesign
                name="like2"
                size={24}
                color="lightgrey" // Color when not liked
              />
            )}
          </TouchableOpacity>
          <Text style={styles.likeText}>{likeCount} Likes</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentCard: {
    paddingVertical: normalize(theme.spacing.small),
    borderRadius: normalize(theme.spacing.extraSmall),
    marginHorizontal: '5%',
    marginTop: normalize(theme.spacing.small),
    backgroundColor: theme.colors.whiteSmoke,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
  },
  username: {
    alignSelf: 'center',
    fontSize: normalize(theme.fontSizes.medium),
    paddingLeft: '3%',
    fontWeight: theme.fontWeight.bold,
  },
  comment: {
    fontSize: normalize(theme.fontSizes.medium),
    lineHeight: normalize(theme.spacing.large),
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: '2%',
  },
  likeSection: {
    flexDirection: 'row',
    paddingTop: normalize(theme.spacing.small),
    paddingHorizontal: '3%',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },
  likeText: {
    paddingLeft: normalize(theme.spacing.small),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.grey,
  },
});

export default CommentCard;
