import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import backend_url from '../config';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
// import {Ionicons} from '@expo/vector-icons';
import CommentCard from './CommentCard.js';
import {Provider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../reusables/Loader';

const getHeaderComponent = ({item, navigation}) => {
  const [article, setArticle] = useState(() => null);
  const [comments, setComments] = useState(() => [
    {id: '1', text: 'This is comment 1'},
    {id: '2', text: 'This is comment 2'},
    {id: '3', text: 'This is comment 3'},
  ]);
  const [loading, setLoading] = useState(() => true);
  const [fetching, setFetching] = useState(() => false);

  const renderItem = ({item}) => {
    console.log('CommentCard');
    <CommentCard
      // item={item}
      navigation={navigation}
      // admin={item.UserId == userid || owner}
      // fetchComments={fetchComments}
    />;
  };

  const refreshControl = () => {
    console.log('fetch');
    // setFetching(true);
    // fetchPost();
    // fetchComments();
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.5}>
            <Ionicons name="arrow-back" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>Article</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CreatePost', {
                post: article,
              })
            }
            activeOpacity={0.5}>
            <Ionicons name="create" size={32} color="#fff" />
          </TouchableOpacity>
          {/* <TouchableOpacity disabled={true}>
            <Ionicons name="create" size={32} color="#376eb3" />
          </TouchableOpacity> */}
        </View>
        {/* <Loader /> */}
        <FlatList
          data={comments}
          contentContainerStyle={{paddingBottom: 10}}
          keyExtractor={item => item.CosmmentId.toString()}
          ListHeaderComponent={getHeaderComponent()}
          renderItem={renderItem}
          refreshing={fetching}
          onRefresh={refreshControl}
          style={{opacity: loading ? 0 : 1}}
        />
        {/* {article ? (
          <>
          </>
        ) : null} */}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#376eb3',
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: 24,
    color: '#fff',
  },
  writerInfo: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: '5%',
    width: '100%',
  },
  writerDesc: {
    width: '85%',
    justifyContent: 'center',
  },
  writeImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  writerName: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: '5%',
  },
  articleTitle: {
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    minHeight: 40,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '700',
  },
  articleBrief: {
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    minHeight: 40,
    justifyContent: 'center',
  },
  briefText: {
    fontSize: 17,
    lineHeight: 20,
  },
  articleDesc: {
    paddingHorizontal: '5%',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  descriptionText: {
    lineHeight: 20,
    fontSize: 16,
    color: '#7f7f7f',
  },
  byText: {
    paddingTop: 10,
  },
  articleLink: {
    paddingVertical: 10,
  },
  linkText: {
    color: 'blue',
  },
  articleTags: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  tagsText: {
    marginRight: 10,
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
  },
  articleImage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  likeSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingLeft: '5%',
  },
  likeText: {
    paddingLeft: 10,
    fontSize: 16,
    color: '#ccc',
  },
  inputRow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  inputField: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: '5%',
    height: 40,
    fontSize: 16,
  },
});

export default getHeaderComponent;
