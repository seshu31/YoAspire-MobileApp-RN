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
import {commentsData} from '../PostProfileData';
import ProfilePicture from '../reusables/profilePic';
import getRandomColor from '../reusables/randomColor';

const DetailedArticle = ({navigation, route}) => {
  const randomBackgroundColor = getRandomColor();
  const {articles, enableAutofocusValue, formatTimeAgo} = route.params;
  const [article, setArticle] = useState(
    route.params?.articles ? route.params.articles : {},
  );
  const enableAutofocus = enableAutofocusValue || false;
  const [comments, setComments] = useState(commentsData);
  const [fetching, setFetching] = useState(false);
  const [likeCount, setLikeCount] = useState(4);
  const [commentCount, setCommentCount] = useState(10);
  const [commentField, setCommentField] = useState(true);
  const [comment, setComment] = useState('');
  const [userid, setUserid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState(false);

  const postedFormattedTime = formatTimeAgo(articles?.PostedOn);
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
            {/* <Image
              style={styles.writeImage}
              source={
                article.img_file_name
                  ? {uri: article.img_file_name}
                  : require('../../assets/male.png')
              }
            /> */}
            <ProfilePicture
              firstName={articles?.First_Name}
              lastName={articles?.Last_Name}
              style={{
                backgroundColor: randomBackgroundColor,
                height: normalize(50),
                width: normalize(50),
              }}
            />
          </View>
          <View style={styles.writerDesc}>
            <Text style={styles.writerName}>
              {article.First_Name} {article.Last_Name}
            </Text>
            <View style={styles.postedOn}>
              <Text style={styles.postedOnText}>{postedFormattedTime}</Text>
              <Text style={styles.dot}>{'\u2B24'}</Text>
              <FontAwesome
                name="globe"
                size={normalize(theme.iconSizes.extraSmall)}
                color={theme.colors.level2}
              />
            </View>
          </View>
        </View>
        {article.Title ? (
          <View style={styles.articleTitle}>
            <Text style={styles.titleText}>{article.Title}</Text>
          </View>
        ) : null}
        {article.Brief !== null &&
        typeof article.Brief === 'string' &&
        article.Brief.trim() !== '' ? (
          <View style={styles.articleBrief}>
            <Text style={styles.briefText}>{article.Brief}</Text>
          </View>
        ) : null}

        <View style={styles.articleDesc}>
          {article.Category_Type === 'job' ? (
            <View style={styles.joblocation}>
              <Text style={styles.jobType1}>{article.Job_Type}</Text>
              {article.Location && article.location !== '' ? (
                <View style={styles.locationContainer}>
                  <Ionicons
                    name="location"
                    color={theme.colors.primary}
                    size={normalize(theme.iconSizes.medium)}
                  />
                  <Text style={styles.blackText}>{article.Location}</Text>
                </View>
              ) : null}
            </View>
          ) : null}

          {article.Date_of_Event !== null && article.Date_of_Event !== '' ? (
            <View>
              <Text style={styles.heading}>Event On:</Text>
              <Text style={[styles.postTime]}>
                {new Date(article.Date_of_Event).toDateString()}{' '}
                {new Date(article.Date_of_Event).toLocaleTimeString()}
              </Text>
            </View>
          ) : null}

          {article.Description ? (
            <View>
              <Text style={styles.heading}>Description:</Text>
              <Text style={styles.descriptionText}>{article.Description}</Text>
            </View>
          ) : null}

          {article.Organiser !== null ||
          article.Category_Type === 'article' ? null : (
            <View style={styles.byText}>
              <Text style={styles.heading}>Posted By:</Text>
              <Text style={{color: theme.colors.level2}}>
                {article.Organiser}
              </Text>
            </View>
          )}

          {article.Link !== null ||
          article.Category_Type === 'article' ? null : (
            <View style={styles.articleLink}>
              <Text style={styles.heading}>Links:</Text>
              <Text style={styles.linkText}>{article.Link}</Text>
            </View>
          )}

          {article.Hashtags != null ? (
            <View style={styles.articleTags}>{fetchTags()}</View>
          ) : null}
        </View>

        <View style={styles.articleImage}>
          <Image
            style={styles.postImage}
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
                  size={normalize(theme.iconSizes.medium)}
                  color={theme.colors.primary} // Color when liked
                />
              ) : (
                <AntDesign
                  name="like2"
                  size={normalize(theme.iconSizes.medium)}
                  color={theme.colors.grey} // Color when not liked
                />
              )}
            </TouchableOpacity>
            <Text style={styles.likeText}>{likeCount} Likes</Text>
          </View>
          <View style={styles.likeButton}>
            <TouchableOpacity onPress={commentFieldHandler} activeOpacity={0.5}>
              <FontAwesome
                name="comment-o"
                size={normalize(theme.iconSizes.medium)}
                color={theme.colors.grey}
              />
            </TouchableOpacity>
            <Text style={styles.likeText}>{commentCount} Comments</Text>
          </View>
        </View>

        {commentField ? (
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Comment"
              placeholderTextColor={theme.colors.grey}
              value={comment}
              onChangeText={commentHandler}
              autoCapitalize="none"
              style={styles.inputField}
              autoFocus={(commentField, enableAutofocus)}
            />
            <TouchableOpacity onPress={postComment} activeOpacity={0.5}>
              <Ionicons
                name="send"
                color={theme.colors.primary}
                size={normalize(theme.iconSizes.large)}
              />
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
                  size={normalize(theme.iconSizes.mediumLarge)}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
              <Text style={styles.profileTitle}>
                {route.params.articles.Category_Type}
              </Text>
              {article.UserId !== userid ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CreatePost', {
                      post: article,
                    })
                  }
                  activeOpacity={0.5}>
                  <Ionicons
                    name="create"
                    size={normalize(theme.iconSizes.large)}
                    color={theme.colors.white}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity disabled={true}>
                  <Ionicons
                    name="create"
                    size={normalize(theme.iconSizes.large)}
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: normalize(theme.spacing.medium),
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
    paddingLeft: normalize(theme.spacing.medium),
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  postTime: {
    fontWeight: theme.fontWeight.normal,
    fontSize: normalize(theme.fontSizes.small),
    color: theme.colors.level2,
    marginBottom: normalize(theme.spacing.small),
  },
  articleTitle: {
    paddingHorizontal: normalize(theme.spacing.medium),
    borderBottomWidth: 1,
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
    paddingHorizontal: normalize(theme.spacing.medium),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    minHeight: normalize(40),
    justifyContent: 'center',
  },
  briefText: {
    fontSize: normalize(theme.fontSizes.medium),
    lineHeight: normalize(theme.spacing.large),
    color: theme.colors.level2,
  },
  articleDesc: {
    paddingHorizontal: normalize(theme.spacing.medium),
    paddingVertical: normalize(theme.spacing.large),
    borderBottomWidth: 1,
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
    paddingBottom: normalize(theme.spacing.extraSmall),
    color: theme.colors.black,
  },
  articleImage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  likeSection: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: 'row',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(40),
    paddingLeft: normalize(theme.spacing.medium),
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
    paddingHorizontal: normalize(theme.spacing.medium),
    justifyContent: 'space-between',
  },
  inputField: {
    width: '90%',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: normalize(theme.spacing.extraSmall),
    paddingHorizontal: normalize(theme.spacing.medium),
    height: normalize(40),
    fontSize: normalize(theme.fontSizes.medium),
    marginRight: normalize(theme.spacing.extraSmall),
    color: theme.colors.black,
  },
  postComment: {
    paddingLeft: normalize(theme.spacing.extraSmall),
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
    paddingHorizontal: normalize(theme.spacing.small),
    paddingVertical: normalize(theme.spacing.extraSmall),
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontSize: normalize(theme.fontSizes.small),
    fontWeight: theme.fontWeight.bold,
    borderRadius: normalize(theme.spacing.extraSmall),
    alignSelf: 'flex-start',
    marginRight: normalize(theme.spacing.small),
    marginBottom: normalize(theme.spacing.small),
  },
  joblocation: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: normalize(theme.spacing.small),
  },
  heading: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.black,
    marginBottom: normalize(theme.spacing.extraSmall),
  },
  postedOn: {
    paddingLeft: normalize(theme.spacing.medium),
    flexDirection: 'row',
    alignItems: 'center',
  },
  postedOnText: {
    color: theme.colors.level2,
    fontWeight: theme.fontWeight.semiBold,
    fontSize: normalize(theme.fontSizes.medium),
  },
  dot: {
    color: theme.colors.level2,
    fontSize: normalize(theme.fontSizes.extraSmall),
    paddingHorizontal: normalize(theme.spacing.extraSmall),
  },
  blackText: {
    color: theme.colors.black,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postImage: {
    resizeMode: 'cover',
    width: '100%',
    height: normalize(200),
  },
});

export default DetailedArticle;
