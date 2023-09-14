import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  // ActivityIndicator,
  // LogBox,
} from 'react-native';
import CommentCard from './CommentCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../reusables/Loader';
import normalize from 'react-native-normalize';
import {Provider} from 'react-native-paper';
import theme from '../../theme';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation, useRoute} from '@react-navigation/native';

const DetailedArticle = ({navigation}) => {
  const [article, setArticle] = useState(() => []);
  const [comments, setComments] = useState(() => [
    {id: '1', text: 'This is comment 1'},
    {id: '2', text: 'This is comment 2'},
    {id: '3', text: 'This is comment 3'},
  ]);
  // const [loading, setLoading] = useState(() => true);
  // const [fetching, setFetching] = useState(() => false);
  const [likeCount, setLikeCount] = useState(4);
  const [commentCount, setCommentCount] = useState(10);
  const [commentField, setCommentField] = useState(() => true);
  const [comment, setComment] = useState(() => '');

  useEffect(() => {
    console.log(comments);
  });

  const fetchTags = () => {
    console.log('fetchTags');
    return <Text style={styles.tagsText}>tag</Text>;
    // const HashTags = article.Hashtags.split(',');
    // return HashTags.map((tag, index) => {
    //   return (
    //     <Text style={styles.tagsText} key={index}>
    //       tag
    //     </Text>
    //   );
    // });
  };

  const [liked, setLiked] = useState(false);

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

  const commentFieldHandler = () => {
    console.log('commentFieldHandler');
    setCommentField(prevValue => !prevValue);
    setComment('');
  };

  const postComment = () => {
    console.log(
      'postComment, method : post, url :${backend_url}/comment/${article.PostId}',
    );
  };

  const commentHandler = value => {
    setComment(value);
  };

  const getHeaderComponent = () => {
    return (
      <View>
        <View style={styles.writerInfo}>
          <View>
            <Image
              style={styles.writeImage}
              source={require('../../assets/male.png')}
              // source={
              //   article.img_file_name
              //     ? {uri: article.img_file_name}
              //     : require('../../assets/male.png')
              // }
            />
          </View>
          <View style={styles.writerDesc}>
            <Text style={styles.writerName}>
              {/* {article.First_Name} {article.Last_Name} */}
              Venu makaraju
            </Text>
          </View>
        </View>
        <View style={styles.articleTitle}>
          <Text style={styles.titleText}>Title</Text>
        </View>
        <View style={styles.articleBrief}>
          <Text style={styles.briefText}>Brief</Text>
        </View>
        {/* {article.Brief != null ? (
        ) : null} */}
        <View style={styles.articleDesc}>
          <View>
            <Text>@Job_Type</Text>
            <Text style={styles.location}>location</Text>
          </View>
          {/* {article.Category_Type === 'job' ? (
          ) : null} */}
          <Text style={styles.descriptionText}>Description</Text>
          {/* {article.Category_Type === 'article' ? null : (
            <Text style={styles.byText}>
              By <Text style={{fontWeight: 'bold'}}>{article.Organiser}</Text>,{' '}
              {new Date(article.Date_of_Event).toDateString()},{' '}
              {`${article.Time_of_Event[0]}${article.Time_of_Event[1]}.${article.Time_of_Event[3]}${article.Time_of_Event[4]}`}
            </Text>
          )} */}
          <Text style={styles.byText}>
            By <Text style={styles.organiser}>Organiser</Text>
          </Text>
          {/* {article.Category_Type === 'article' ? null : (
            <View style={styles.articleLink}>
              <Text style={styles.linkText}>{article.Link}</Text>
            </View>
          )} */}
          <View style={styles.articleLink}>
            <Text style={styles.linkText}>Link</Text>
          </View>
          {/* {article.Hashtags != null ? (
            <View style={styles.articleTags}>{fetchTags()}</View>
          ) : null} */}
          <View style={styles.articleTags}>{fetchTags()}</View>
          <View style={styles.articleImage}>
            <Image
              style={styles.article}
              source={require('../../assets/pic2.png')}
              // source={
              //   article.Image
              //     ? {uri: article.Image}
              //     : require('../../assets/pic2.png')
              // }
            />
          </View>
          <View style={styles.likeSection}>
            <View style={styles.likeButton}>
              <TouchableOpacity onPress={likeHandler} activeOpacity={0.5}>
                <Ionicons
                  name="thumbs-up"
                  size={24}
                  color={liked ? '#1b76f2' : 'lightgrey'}
                />
              </TouchableOpacity>
              <Text style={styles.likeText}>{likeCount} Likes</Text>
            </View>
            <View style={styles.likeButton}>
              <TouchableOpacity
                onPress={commentFieldHandler}
                activeOpacity={0.5}>
                <Ionicons name="text" size={24} color="lightgrey" />
              </TouchableOpacity>
              <Text style={styles.likeText}>{commentCount} Comments</Text>
            </View>
          </View>
          {/* {commentField ? (
            <View style={styles.inputRow}>
              <TextInput
                placeholder="Comment"
                value={comment}
                onChangeText={commentHandler}
                autoCapitalize="none"
                style={styles.inputField}
                autoFocus={commentField}
              />
              <TouchableOpacity onPress={postComment} activeOpacity={0.5}>
                <Ionicons name="md-send" color="#376eb3" size={32} />
              </TouchableOpacity>
            </View>
          ) : null} */}
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Comment"
              value={comment}
              onChangeText={commentHandler}
              autoCapitalize="none"
              style={styles.inputField}
              autoFocus={commentField}
            />
            <View style={styles.postComment}>
              <TouchableOpacity onPress={postComment} activeOpacity={0.5}>
                <Ionicons name="send" color="#376eb3" size={34} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => {
    console.log('CommentCard');
    <CommentCard
    // item={item}
    // navigation={navigation}
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
        </View>
        <FlatList
          data={comments}
          contentContainerStyle={{paddingBottom: 10}}
          // keyExtractor={item => item.CosmmentId.toString()}
          ListHeaderComponent={getHeaderComponent()}
          renderItem={renderItem}
          // refreshing={fetching}
          // onRefresh={refreshControl}
          // style={{opacity: loading ? 0 : 1}}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  profileHeader: {
    height: normalize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(theme.spacing.small),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
  },
  writerInfo: {
    flexDirection: 'row',
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.border,
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: '5%',
    width: '100%',
  },
  writerDesc: {
    width: '85%',
    justifyContent: 'center',
  },
  writeImage: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(100),
  },
  writerName: {
    fontWeight: 'bold',
    fontSize: normalize(theme.fontSizes.medium),
    paddingLeft: '5%',
  },
  articleTitle: {
    paddingHorizontal: '5%',
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.border,
    minHeight: normalize(40),
    justifyContent: 'center',
  },
  titleText: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    lineHeight: normalize(theme.spacing.large),
    fontWeight: '700',
  },
  articleBrief: {
    paddingHorizontal: '5%',
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.border,
    minHeight: normalize(40),
    justifyContent: 'center',
  },
  briefText: {
    fontSize: normalize(17),
    lineHeight: normalize(theme.spacing.large),
  },
  articleDesc: {
    paddingHorizontal: '5%',
    paddingVertical: normalize(theme.spacing.large),
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.border,
  },
  descriptionText: {
    lineHeight: normalize(theme.spacing.large),
    fontSize: normalize(theme.fontSizes.medium),
    color: '#7f7f7f',
  },
  byText: {
    paddingTop: normalize(theme.spacing.small),
  },
  articleLink: {
    paddingVertical: normalize(theme.spacing.small),
  },
  linkText: {
    color: 'blue',
  },
  articleTags: {
    flexDirection: 'row',
    paddingTop: normalize(theme.spacing.extraSmall),
  },
  tagsText: {
    marginRight: normalize(theme.spacing.small),
    backgroundColor: theme.colors.grey,
    paddingHorizontal: normalize(theme.spacing.small),
    paddingVertical: normalize(2),
    borderRadius: normalize(theme.spacing.extraSmall),
  },
  articleImage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.border,
  },
  likeSection: {
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.border,
    flexDirection: 'row',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(40),
    paddingLeft: '5%',
  },
  likeText: {
    paddingLeft: normalize(theme.spacing.small),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.grey,
  },
  inputRow: {
    height: normalize(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(theme.spacing.small),
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  inputField: {
    width: '90%',
    borderWidth: normalize(3),
    borderColor: theme.colors.border,
    borderRadius: normalize(theme.spacing.extraSmall),
    paddingHorizontal: '5%',
    height: normalize(40),
    fontSize: normalize(theme.fontSizes.medium),
  },
  postComment: {
    paddingLeft: normalize(7),
  },
  location: {
    paddingVertical: normalize(theme.spacing.small),
  },
  organiser: {
    fontWeight: theme.fontWeight.bold,
  },
  article: {
    resizeMode: 'cover',
    width: '100%',
    height: normalize(200),
  },
});

export default DetailedArticle;
