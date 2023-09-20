import React, {useState} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Menu} from 'react-native-paper';
import normalize from 'react-native-normalize';
import Loader from '../reusables/Loader';
import theme from '../../theme';

const CommentCard = item => {
  const [liked, setLiked] = useState(() => true);
  const [likeCount, setLikeCount] = useState(5);
  const [visible, setVisible] = useState(() => false);

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
            Venu Makaraju
            {/* {item.First_Name} {item.Last_Name} */}
          </Text>
        </View>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{paddingHorizontal: '2%'}}>
              <Ionicons name="md-more" size={26} color="#303030" />
            </TouchableOpacity>
          }>
          <Menu.Item onPress={dialogHandler} title="Delete" />
        </Menu>
        {/* {admin ? (
        ) : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentCard: {
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: '5%',
    marginTop: 10,
    backgroundColor: 'whitesmoke',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: '2%',
  },
  username: {
    alignSelf: 'center',
    fontSize: 16,
    paddingLeft: '3%',
    fontWeight: '700',
  },
  comment: {
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 10,
    paddingHorizontal: '2%',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  likeSection: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: '3%',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },
  likeText: {
    paddingLeft: 10,
    fontSize: 16,
    color: 'grey',
  },
});

export default CommentCard;
