import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import normalize from 'react-native-normalize';
import theme from '../../theme';
import CommentCard from './CommentCard';
import ProfilePicture from '../reusables/profilePic';
import getRandomColor from '../reusables/randomColor';

const DashboardArticle = ({articles, navigation}) => {
  const [liked, setLiked] = useState(() =>
    articles?.Active === 1 ? true : false,
  );
  // console.log('Image Source:', articles);
  const [commentCount, setCommentCount] = useState(10);

  const [likeCount, setLikeCount] = useState(() => articles?.No_of_Likes);
  const likeHandler = () => {
    // Toggle the liked state locally
    setLiked(prevValue => !prevValue);

    // Update the like count based on the liked state
    setLikeCount(prevValue => (liked ? prevValue - 1 : prevValue + 1));
  };

  const postedFormattedTime = formatTimeAgo(articles?.PostedOn);

  // Function to format the time difference
  function formatTimeAgo(postedTime) {
    const currentTime = new Date();
    const postTime = new Date(postedTime);
    const timeDifference = currentTime - postTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    if (months > 0) {
      return months === 1 ? '1mo ago' : `${months}mo ago`;
    } else if (days > 0) {
      return days === 1 ? '1d ago' : `${days}d ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1h ago' : `${hours}h ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1m ago' : `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  }

  const randomBackgroundColor = getRandomColor();

  const fetchArticle = () => {
    if (articles?.Category_Type === 'article') {
      return (
        <View style={styles.articleItem}>
          <View style={styles.writerInfo}>
            <View style={[styles.writeImage]}>
              {/* <Image
                // style={styles.writeImage}
                style={[
                  styles.writeImage,
                  {backgroundColor: randomBackgroundColor},
                ]}
                source={
                  articles.img_file_name
                    ? {uri: articles.img_file_name}
                    : require('../../assets/male.png')
                }
              /> */}
              <ProfilePicture
                firstName={articles?.First_Name}
                lastName={articles?.Last_Name}
                style={{
                  backgroundColor: randomBackgroundColor,
                }}
              />
            </View>
            <View style={styles.writerDesc}>
              <Text style={styles.writerName} numberOfLines={1}>
                {articles.First_Name} {articles.Last_Name}
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
          <View style={styles.articleTitle}>
            <Text style={styles.titleText} numberOfLines={1}>
              {articles.Title}
            </Text>
          </View>
          <View style={styles.articleDesc}>
            <Text style={styles.descriptionText} numberOfLines={3}>
              {articles.Description}
            </Text>
          </View>
          <View style={styles.articleImage}>
            <Image
              style={styles.postImage}
              source={
                articles.Image
                  ? {uri: articles.Image}
                  : require('../../assets/pic2.png')
              }
            />
          </View>
        </View>
      );
    } else if (articles?.Category_Type === 'job') {
      return (
        <View style={styles.jobItem}>
          <View>
            <Image
              style={styles.jobImage}
              source={
                articles.Image
                  ? {uri: articles.Image}
                  : require('../../assets/pic2.png')
              }
            />
          </View>
          <View style={styles.jobDetails}>
            <Text style={styles.jobTitle}>{articles.Title}</Text>
            <View style={styles.postedOn}>
              <Text style={styles.postedOnText}>{postedFormattedTime}</Text>
              <Text style={styles.dot}>{'\u2B24'}</Text>
              <FontAwesome
                name="globe"
                size={normalize(theme.iconSizes.extraSmall)}
                color={theme.colors.level2}
              />
            </View>
            <Text style={styles.jobType}>{articles.Job_Type}</Text>
            <Text style={styles.jobOrganiser}>{articles.Organiser}</Text>
            <Text style={styles.jobLocation}>{articles.Location}</Text>
          </View>
        </View>
      );
    } else if (articles?.Category_Type === 'webinar') {
      return (
        <View style={styles.webinarItem}>
          <Text style={styles.webinarText}>Webinar</Text>
          <Text style={styles.webinarTitle}>{articles.Title}</Text>
          <View style={styles.postedOn}>
            <Text style={styles.postedOnText}>{postedFormattedTime}</Text>
            <Text style={styles.dot}>{'\u2B24'}</Text>
            <FontAwesome
              name="globe"
              size={normalize(theme.iconSizes.extraSmall)}
              color={theme.colors.level2}
            />
          </View>
          <Text style={styles.webinarOrganiser}>{articles.Organiser}</Text>
          <Text style={styles.webinarBrief}>{articles.Brief}</Text>
          <Image
            style={styles.webinarImage}
            source={
              articles.Image
                ? {uri: articles.Image}
                : require('../../assets/pic3.jpg')
            }
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('article', {
              articles: articles,
              enableAutofocusValue: false,
              formatTimeAgo: formatTimeAgo,
            })
          }
          activeOpacity={0.5}>
          {fetchArticle()}
        </TouchableOpacity>
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
            <View style={styles.likesContainer}>
              <Text style={styles.likeText}>{likeCount} Likes</Text>
            </View>
          </View>
          <View style={styles.likeButton}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('article', {
                  PostId: articles.PostId,
                  addComment: true,
                  articles: articles,
                  enableAutofocusValue: true,
                  formatTimeAgo: formatTimeAgo,
                })
              }
              activeOpacity={0.5}>
              <View style={styles.likesContainer}>
                <FontAwesome
                  name="comment-o"
                  size={normalize(theme.iconSizes.medium)}
                  color={theme.colors.grey}
                />
                <Text style={styles.likeText}>
                  {/* {articles.No_of_Comments} */}
                  {commentCount} Comments
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.whiteSmoke,
  },
  card: {
    borderRadius: normalize(theme.spacing.extraSmall),
    backgroundColor: theme.colors.white,
    marginVertical: normalize(theme.spacing.extraSmall),
    paddingHorizontal: normalize(theme.spacing.small),
  },
  articleItem: {
    marginBottom: normalize(theme.spacing.extraSmall),
    minHeight: normalize(100),
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
    justifyContent: 'center',
    width: '85%',
    paddingLeft: normalize(theme.spacing.medium),
  },
  writeImage: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(100),
  },
  writerName: {
    fontWeight: theme.fontWeight.bold,
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  articleTitle: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: normalize(theme.spacing.medium),
    lineHeight: normalize(theme.spacing.extraLarge),
    color: theme.colors.level2,
  },
  articleDesc: {
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: normalize(theme.spacing.medium),
  },
  descriptionText: {
    lineHeight: normalize(theme.spacing.large),
    fontSize: normalize(theme.fontSizes.medium),
    width: '100%',
    color: theme.colors.level2,
  },
  articleImage: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(theme.spacing.medium),
  },
  jobItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: '3%',
  },
  jobDetails: {
    paddingLeft: normalize(theme.spacing.small),
  },
  jobTitle: {
    fontSize: normalize(theme.fontSizes.medium),
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.black,
  },
  jobType: {
    paddingVertical: normalize(theme.spacing.extraSmall),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.level2,
  },
  jobOrganiser: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.level2,
  },
  jobLocation: {
    paddingVertical: normalize(theme.spacing.extraSmall),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.level2,
  },
  webinarItem: {
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: normalize(theme.spacing.medium),
  },
  webinarText: {
    paddingHorizontal: normalize(theme.spacing.small),
    paddingVertical: normalize(theme.spacing.extraSmall),
    backgroundColor: '#74d848',
    color: theme.colors.white,
    fontSize: normalize(theme.fontSizes.medium),
    fontWeight: theme.fontWeight.bold,
    borderRadius: normalize(theme.spacing.small),
    alignSelf: 'flex-start',
    marginBottom: normalize(theme.spacing.extraSmall),
  },
  webinarTitle: {
    fontSize: normalize(theme.fontSizes.medium),
    fontWeight: theme.fontWeight.bold,
    paddingVertical: normalize(theme.spacing.extraSmall),
    color: theme.colors.black,
  },
  webinarOrganiser: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.level2,
  },
  webinarBrief: {
    paddingVertical: normalize(theme.spacing.extraSmall),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.level2,
  },
  webinarImage: {
    width: '100%',
    height: normalize(100),
    resizeMode: 'cover',
    marginTop: normalize(theme.spacing.small),
  },
  likeSection: {
    flexDirection: 'row',
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
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
  postedOn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postedOnText: {
    color: theme.colors.level2,
    fontWeight: theme.fontWeight.semiBold,
  },
  dot: {
    color: theme.colors.level2,
    fontSize: normalize(theme.fontSizes.extraSmall),
    paddingHorizontal: normalize(theme.fontSizes.extraSmall),
  },
  postImage: {
    width: '100%',
    height: normalize(150),
    resizeMode: 'cover',
  },
  jobImage: {
    width: normalize(100),
    height: normalize(100),
    resizeMode: 'contain',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicText: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
  },
});

export default DashboardArticle;
