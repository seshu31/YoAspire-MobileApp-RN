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
// import backend_url from '../config';
// import axios from 'axios';
// import {Ionicons} from '@expo	/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Menu} from 'react-native-paper';

const CommentCard = ({item, admin, fetchComments}) => {
  const [liked, setLiked] = useState(() => false);
  const [likeCount, setLikeCount] = useState(4);
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
    Alert.alert('deleteHandler');
    // getToken().then(token => {
    //   axios
    //     .delete(`${backend_url}/comment/${item.CommentId}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then(response => {
    //       if (response.data.statuscode === 1) {
    //         fetchComments();
    //       }
    //     })
    //     .catch(err => {
    //       alert('Something went wrong. Please, Try again');
    //     });
    // });
  };

  const likeHandler = () => {
    // Alert.alert('you liked');E
    if (liked) {
      setLiked(false);
      setLikeCount(prevLikeCount => prevLikeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(prevLikeCount => prevLikeCount + 1);
    }
    // getToken().then(token => {
    //   axios({
    //     method: liked ? 'DELETE' : 'POST',
    //     url: `${backend_url}/like/comment/${item.CommentId}`,
    //     data: {
    //       Timestamp: new Date().toISOString(),
    //     },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then(response => {
    //       if (response.data.statuscode === 1) {
    //         setLikeCount(prevValue => (liked ? prevValue - 1 : prevValue + 1));
    //         setLiked(prevValue => !prevValue);
    //       }
    //     })
    //     .catch(err => {
    //       alert('Something went wrong. Please, Try again');
    //     });
    // });
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
            First_Name Last_Name
            {/* {item.First_Name} {item.Last_Name} */}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{paddingHorizontal: '2%'}}>
          <MaterialIcons name="more-vert" size={26} color="#303030" />
        </TouchableOpacity>
        {/* <Menu
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
        </Menu> */}
      </View>
      <Text style={styles.comment}>This is comment</Text>
      <View style={styles.likeSection}>
        <View style={styles.likeButton}>
          <TouchableOpacity onPress={likeHandler} activeOpacity={0.5}>
            <Ionicons
              name="thumbs-up"
              size={20}
              color={liked ? '#1b76f2' : 'lightgrey'}
            />
          </TouchableOpacity>
          <Text style={styles.likeText}>{likeCount} Likes</Text>
        </View>
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
