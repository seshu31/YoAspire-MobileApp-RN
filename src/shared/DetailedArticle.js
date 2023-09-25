import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CommentCard from './CommentCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../reusables/Loader';
import normalize from 'react-native-normalize';
import {Provider} from 'react-native-paper';
import theme from '../../theme';

const DetailedArticle = ({navigation, route}) => {
  const [article, setArticle] = useState(
    route.params?.articles ? route.params.articles : null,
  );
  console.log('This is Article Data:', article);
  const enableAutofocus = route.params?.enableAutofocus || false;
  const [comments, setComments] = useState([
    {
      id: '1',
      text: 'This is comment 1',
      First_Name: 'venu',
      Last_Name: 'm',
      Comment: 'Comment 1',
    },
    {
      id: '2',
      text: 'This is comment 2',
      First_Name: 'venu2',
      Last_Name: 'm',
      Comment: 'Comment 2',
    },
    {
      id: '3',
      text: 'This is comment 3',
      First_Name: 'venu3',
      Last_Name: 'm',
      Comment: 'Comment 3',
    },
  ]);
  // const [loading, setLoading] = useState(() => true);
  const [fetching, setFetching] = useState(false);
  const [likeCount, setLikeCount] = useState(4);
  const [commentCount, setCommentCount] = useState(10);
  const [commentField, setCommentField] = useState(true);
  const [comment, setComment] = useState(() => '');
  const [userid, setUserid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState(false);

  const fetchTags = () => {
    const HashTags = article.Hashtags.split(',');
    return HashTags.map((tag, index) => {
      return (
        <Text style={styles.tagsText} key={index}>
          {tag}
        </Text>
      );
    });
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
              source={
                article.img_file_name
                  ? {uri: article.img_file_name}
                  : require('../../assets/male.png')
              }
            />
          </View>
          <View style={styles.writerDesc}>
            <Text style={styles.writerName}>
              {article.First_Name} {article.Last_Name}
            </Text>
            <Text style={[styles.postTime]}>
              {new Date(article.Date_of_Event).toDateString()}{' '}
              {new Date(article.Date_of_Event).toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <View style={styles.articleTitle}>
          <Text style={styles.titleText}>{article.Title}</Text>
        </View>

        {article.Brief !== null ? (
          <View style={styles.articleBrief}>
            <Text style={styles.briefText}>{article.Brief}</Text>
          </View>
        ) : null}

        <View style={styles.articleDesc}>
          {article.Category_Type === 'job' ? (
            <View style={styles.joblocation}>
              <Text style={styles.jobType1}>{article.Job_Type}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  name="location"
                  color={theme.colors.primary}
                  size={24}
                />
                <Text>{article.Location}</Text>
              </View>
            </View>
          ) : null}

          <View>
            <Text style={{fontWeight: '700', color: '#000'}}>Description:</Text>
            <Text style={styles.descriptionText}>{article.Description}</Text>
          </View>

          {article.Category_Type === 'article' ? null : (
            <View style={styles.byText}>
              <Text style={{fontWeight: '700', color: '#000'}}>Posted By:</Text>
              <Text>{article.Organiser}</Text>
            </View>
          )}

          {article.Category_Type === 'article' ? null : (
            <View style={styles.articleLink}>
              <Text style={{color: '#000', fontWeight: '700'}}>Links:</Text>
              <Text style={styles.linkText}>{article.Link}</Text>
            </View>
          )}

          {article.Hashtags != null ? (
            <View style={styles.articleTags}>{fetchTags()}</View>
          ) : null}
        </View>

        <View style={styles.articleImage}>
          <Image
            style={{resizeMode: 'cover', width: '100%', height: 200}}
            source={
              article.Image
                ? {uri: article.Image}
                : require('../../assets/pic2.png')
            }
          />
        </View>

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
          <View style={styles.likeButton}>
            <TouchableOpacity onPress={commentFieldHandler} activeOpacity={0.5}>
              <FontAwesome name="comment-o" size={24} color="lightgrey" />
            </TouchableOpacity>
            <Text style={styles.likeText}>{commentCount} Comments</Text>
          </View>
        </View>

        {commentField ? (
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Comment"
              value={comment}
              onChangeText={commentHandler}
              autoCapitalize="none"
              style={styles.inputField}
              autoFocus={(commentField, enableAutofocus)}
            />
            <TouchableOpacity onPress={postComment} activeOpacity={0.5}>
              <Ionicons name="send" color="#376eb3" size={32} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  const fetchComments = () => {
    console.log(
      'fetchComments function, method:get, url:${backend_url}/comment/onpost/${route.params.PostId}',
    );
  };

  const renderItem = ({item}) => {
    return (
      <CommentCard
        item={item}
        navigation={navigation}
        admin={item.UserId === userid || owner}
        fetchComments={fetchComments}
      />
    );
  };

  const refreshControl = () => {
    // setFetching(true);
    // fetchPost();
    // fetchComments();
  };
  return (
    <Provider>
      <View style={styles.container}>
        {article ? (
          <>
            <View style={styles.profileHeader}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.5}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={normalize(26)}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
              <Text style={styles.profileTitle}>
                {route.params.articles.Category_Type}
              </Text>
              {article.UserId != userid ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CreatePost', {
                      post: article,
                    })
                  }
                  activeOpacity={0.5}>
                  <Ionicons name="create" size={32} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity disabled={true}>
                  <Ionicons
                    name="create"
                    size={32}
                    color={theme.colors.white}
                  />
                </TouchableOpacity>
              )}
            </View>

            {loading ? <Loader /> : null}

            <FlatList
              data={comments}
              contentContainerStyle={styles.articlelist}
              keyExtractor={item => item.Comment?.toString()}
              ListHeaderComponent={getHeaderComponent()}
              renderItem={renderItem}
              refreshing={fetching}
              onRefresh={refreshControl}
              style={{opacity: loading ? 0 : 1}}
            />
          </>
        ) : null}
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
    paddingHorizontal: normalize(theme.spacing.large),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
    textTransform: 'capitalize',
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
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  postTime: {
    paddingLeft: '5%',
    fontWeight: theme.fontWeight.normal,
    fontSize: normalize(14),
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
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.black,
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
    color: theme.colors.level2,
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
    color: theme.colors.level2,
  },
  byText: {
    paddingTop: normalize(theme.spacing.small),
    flexDirection: 'column',
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
    borderRadius: normalize(theme.spacing.extraSmall),
    backgroundColor: theme.colors.grey,
    paddingHorizontal: normalize(theme.spacing.small),
    paddingBottom: normalize(5),
    color: theme.colors.black,
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
    color: theme.colors.level2,
  },
  jobType: {
    color: theme.colors.level2,
  },
  organiser: {
    fontWeight: theme.fontWeight.bold,
  },
  article: {
    resizeMode: 'cover',
    width: '100%',
    height: normalize(200),
  },
  articlelist: {
    paddingBottom: normalize(theme.spacing.small),
    paddingHorizontal: normalize(theme.spacing.small),
  },
  jobType1: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(5),
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontSize: normalize(theme.fontSizes.small),
    fontWeight: theme.fontWeight.bold,
    borderRadius: normalize(theme.spacing.extraSmall),
    alignSelf: 'flex-start',
    marginRight: 10,
    marginBottom: 10,
  },
  joblocation: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 10,
  },
});

export default DetailedArticle;
