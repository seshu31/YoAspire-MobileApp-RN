import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import normalize from 'react-native-normalize';
import theme from '../../theme';

const DashboardArticle = ({articles, navigation}) => {
  const [liked, setLiked] = useState(() =>
    articles?.Active === 1 ? true : false,
  );
  // console.log('Image Source:', articles);

  const [likeCount, setLikeCount] = useState(() => articles?.No_of_Likes);
  const likeHandler = () => {
    // Toggle the liked state locally
    setLiked(prevValue => !prevValue);

    // Update the like count based on the liked state
    setLikeCount(prevValue => (liked ? prevValue - 1 : prevValue + 1));
  };

  const fetchArticle = () => {
    if (articles?.Category_Type === 'article') {
      return (
        <View style={styles.articleItem}>
          <View style={styles.writerInfo}>
            <View>
              <Image
                style={styles.writeImage}
                // source={{uri: articles.img_file_name}}
                // source={require('../../assets/male.png')}
                source={
                  articles.img_file_name
                    ? {uri: articles.img_file_name}
                    : require('../../assets/male.png')
                }
              />
            </View>
            <View style={styles.writerDesc}>
              <Text
                style={styles.writerName}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {articles.First_Name} {articles.Last_Name}
              </Text>
            </View>
          </View>
          <View style={styles.articleTitle}>
            <Text
              style={styles.titleText}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {articles.Title}
            </Text>
          </View>
          <View style={styles.articleDesc}>
            <Text
              style={styles.descriptionText}
              numberOfLines={3}
              ellipsizeMode={'tail'}>
              {articles.Description}
            </Text>
          </View>
          <View style={styles.articleImage}>
            <Image
              style={{width: '100%', height: 150, resizeMode: 'cover'}}
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
              style={{width: 100, height: 100, resizeMode: 'contain'}}
              source={
                articles.Image
                  ? {uri: articles.Image}
                  : require('../../assets/pic2.png')
              }
            />
          </View>
          <View style={styles.jobDetails}>
            <Text style={styles.jobTitle}>{articles.Title}</Text>
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
              enableAutofocus: false,
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('article', {
                  PostId: articles.PostId,
                  addComment: true,
                  articles: articles,
                  enableAutofocus: true,
                })
              }
              activeOpacity={0.5}>
              <FontAwesome name="comment-o" size={24} color="lightgrey" />
            </TouchableOpacity>
            <Text style={styles.likeText}>
              {articles?.No_of_Comments} Comments
            </Text>
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
    paddingHorizontal: 10,
  },
  articleItem: {
    marginBottom: normalize(theme.spacing.extraSmall),
    minHeight: normalize(100),
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
    justifyContent: 'center',
    width: '85%',
  },
  writeImage: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(100),
  },
  writerName: {
    fontWeight: theme.fontWeight.bold,
    fontSize: normalize(theme.fontSizes.medium),
    paddingLeft: '5%',
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  articleTitle: {
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.border,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: '5%',
    lineHeight: normalize(theme.spacing.extraLarge),
    color: theme.colors.level2,
  },
  articleDesc: {
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: '5%',
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
    paddingHorizontal: '5%',
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
    fontWeight: '700',
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
    paddingHorizontal: '5%',
  },
  webinarText: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(3),
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
    paddingVertical: normalize(3),
    color: theme.colors.black,
  },
  webinarOrganiser: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.level2,
  },
  webinarBrief: {
    paddingVertical: normalize(3),
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
    borderTopWidth: normalize(3),
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(40),
    paddingLeft: '5%',
  },
  likeText: {
    paddingLeft: normalize(theme.spacing.extraSmall),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.grey,
  },
});

export default DashboardArticle;
