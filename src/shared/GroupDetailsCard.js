import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  LogBox,
} from 'react-native';
import DashboardArticle from './DashboardArticle';
import Moment from 'react-moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../reusables/Loader';
import normalize from 'react-native-normalize';
import theme from '../../theme';

const GroupDetailsCard = ({navigation, route}) => {
  // Replace the following static data with actual data
  const groupData = {
    id: 1,
    name: 'Sample Group',
    description:
      'This is a sample group description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a sample group description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a sample group description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://example.com/sample-image.jpg',
    created_on: '2023-01-15T10:30:00Z',
    total_members: 20,
    admin_flag: true, //Boolean value change according data
    created_by: null, //This is will take int value
    joined: false,
    req_sent: false, //Boolean value change according data
    group_type: true, //Boolean value change according data
  };
  const staticArticlesData = [
    {
      PostId: 1,
      Active: 1,
      No_of_Likes: 3,
      Category_Type: 'article',
      First_Name: 'venu',
      Last_Name: 'makaraju',
      Title: 'Web Developer',
      Description: 'Current working tool React Native',
    },
    {
      PostId: 2,
      Active: 1,
      No_of_Likes: 2,
      Category_Type: 'webinar',
      First_Name: 'sraz',
      Last_Name: 'vadlamanu',
      Title: 'Web Developer',
      Description: 'current working tool Java',
      Organiser: 'Aspire',
      Brief: 'This is sravani working as a developer in aspire',
    },
    {
      PostId: 3,
      Active: 0,
      No_of_Likes: 3,
      Category_Type: 'job',
      Title: 'Backend Developer',
      Description: 'Current working tool Nodejs, mongodb ',
      Organiser: 'Aspire',
      Location: 'Vijayawada',
      Job_Type: 'Full time',
    },
    // Add more static article data as needed
  ];

  const {id, item} = route.params || {id: null, item: null};
  const [group, setGroup] = useState(groupData);
  const [admin, setAdmin] = useState(groupData.admin_flag);
  const [creator, setCreator] = useState(groupData.created_by);
  const [lineLength, setLineLength] = useState(3);
  const [lines, setLines] = useState(0);
  const [articles, setArticles] = useState(staticArticlesData);
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [load, setLoad] = useState(false);

  const fetchGroup = () => {
    console.log('fetchGroup');
  };

  const fetchPosts = () => {
    console.log('fetchPosts');
  };

  useEffect(() => {
    console.log(staticArticlesData, 'static articles');
  });
  useEffect(() => {
    const mount = navigation.addListener('focus', () => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      fetchGroup();
      fetchPosts();
    });
    fetchPosts();
    return mount;
  });

  const loadHandler = () => {
    setLoad(prevValue => !prevValue);
  };

  const renderItem = ({item}) => (
    <DashboardArticle
      articles={item}
      navigation={navigation}
      loadHandler={loadHandler}
    />
  );

  const lineHandler = () => {
    setLineLength(lines);
  };

  const leaveHandler = () => {
    console.log(
      'method: DELETE,  ${backend_url}/group/delmember/${userid}/${id}',
    );
  };
  const cancelHandler = () => {
    console.log(
      'method: DELETE, ${backend_url}/group/reject/${userid}/${group.groupid}',
    );
  };

  const joinHandler = () => {
    console.log(
      'method: POST, group_type ? ${backend_url}/group/sendreq/${userid}/${id} : ${backend_url}/group/addmember/${userid}/${id}',
    );
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return <Loader />;
  };

  const loadTopPosts = () => {
    setFetching(true);
    fetchPosts();
    fetchGroup();
  };

  const loadEndPosts = () => {
    if (!allLoaded) {
      setLoading(true);
    }
    if (loading) {
      fetchPosts();
    }
  };

  const renderHeader = () => {
    return group ? (
      <>
        <View style={styles.groupImageSection}>
          <View style={styles.groupImageBlock}>
            <Image
              style={styles.groupImage}
              // source={
              //   group.image
              //     ? {uri: group.image}
              //     : require('../../assets/male.png')
              // }
              source={require('../../assets/male.png')}
            />
          </View>
        </View>
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{group.name}</Text>
          <Text
            style={styles.groupDesc}
            numberOfLines={lineLength}
            onTextLayout={event => setLines(event.nativeEvent.lines.length)}>
            {group.description}
          </Text>
          {lines > lineLength ? (
            <TouchableOpacity onPress={lineHandler} activeOpacity={0.5}>
              <Text style={styles.showMore}>Show more</Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.groupDesc}>
            created on{' '}
            <Moment element={Text} format="YYYY-MM-DD">
              {new Date(group.created_on)}
            </Moment>{' '}
            at{' '}
            <Moment element={Text} format="hh.mm">
              {new Date(group.created_on)}
            </Moment>
          </Text>
          <TouchableOpacity
            style={styles.membersItem}
            onPress={() =>
              navigation.navigate('group-members', {
                id: id,
                admin: admin,
                creator: group.created_by,
              })
            }
            activeOpacity={0.5}>
            <Text style={styles.membersText}>
              {group.total_members} Members
            </Text>
            <Ionicons name="arrow-forward" size={22} color="#376eb3" />
          </TouchableOpacity>
          <View style={styles.groupButtons}>
            {creator ? null : group.joined ? (
              <TouchableOpacity onPress={leaveHandler} activeOpacity={0.5}>
                <Text style={styles.groupButton}>Leave</Text>
              </TouchableOpacity>
            ) : group.req_sent ? (
              <TouchableOpacity onPress={cancelHandler} activeOpacity={0.5}>
                <Text style={styles.groupButton}>Requested</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={joinHandler} activeOpacity={0.5}>
                <Text style={styles.groupButton}>
                  {group.group_type ? 'Request' : 'Join'}
                </Text>
              </TouchableOpacity>
            )}
            {admin && group.group_type ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('manage-requests', {
                    id: id,
                  })
                }
                activeOpacity={0.5}>
                <Text style={styles.groupButtonrequest}>Requests</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </>
    ) : null;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isLoading ? '#fff' : '#e8e8e8',
        },
      ]}>
      <View style={styles.groupHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <Ionicons name="arrow-back" size={32} color="#376eb3" />
        </TouchableOpacity>
        <Text style={styles.groupTitle}>Group</Text>
        {admin ? (
          <TouchableOpacity
            style={styles.creategroup}
            onPress={() =>
              navigation.navigate('create-group', {
                group: group,
              })
            }
            activeOpacity={0.5}>
            <Ionicons name="create" color={'#376eb3'} size={26} />
          </TouchableOpacity>
        ) : (
          <Ionicons color={'#fff'} marginRight={26} />
        )}
      </View>
      {/* <Loader /> */}
      <FlatList
        data={articles}
        keyExtractor={item => item.PostId.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={styles.headercomponent}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={styles.footer}
        refreshing={fetching}
        onRefresh={loadTopPosts}
        onEndReached={loadEndPosts}
        style={{opacity: isLoading ? 0 : 1}}
      />
      <TouchableOpacity
        style={styles.createPost}
        onPress={() =>
          navigation.navigate('CreatePost', {
            group: group.name,
            id: group.groupid,
          })
        }
        activeOpacity={0.5}>
        <Ionicons name="create" size={28} color="white" />
      </TouchableOpacity>
      {/* {group && group.joined ? (
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupHeader: {
    height: normalize(50),
    flexDirection: 'row',
    paddingHorizontal: '5%',
    borderBottomWidth: normalize(3),
    borderColor: theme.colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  groupTitle: {
    fontSize: normalize(25),
    textTransform: 'uppercase',
    paddingLeft: normalize(theme.spacing.large),
    color: theme.colors.primary,
  },
  groupImageSection: {
    height: normalize(100),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    position: 'relative',
    marginBottom: normalize(50),
  },
  groupImageBlock: {
    backgroundColor: theme.colors.white,
    borderRadius: normalize(100),
    height: normalize(98),
    width: normalize(95),
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
  },
  groupImage: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(100),
    borderWidth: normalize(6),
    borderColor: theme.colors.primary,
  },
  groupInfo: {
    alignItems: 'center',
    paddingVertical: normalize(theme.spacing.small),
    paddingHorizontal: '5%',
  },
  groupName: {
    fontSize: normalize(21),
    fontWeight: theme.fontWeight.bold,
  },
  groupDesc: {
    fontSize: normalize(theme.fontSizes.medium),
    paddingTop: normalize(6),
  },
  showMore: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.primary,
    alignSelf: 'flex-start',
  },
  membersItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(11),
  },
  membersText: {
    fontSize: normalize(17),
    color: theme.colors.primary,
  },
  groupButtons: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
  },
  footer: {
    paddingBottom: normalize(6),
  },
  groupButtonrequest: {
    backgroundColor: theme.colors.white,
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderWidth: normalize(3),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(20),
    fontSize: normalize(theme.fontSizes.medium),
    borderRadius: normalize(theme.spacing.medium),
    marginTop: normalize(5),
    marginBottom: normalize(10),
    marginRight: normalize(10),
  },
  groupButton: {
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(theme.spacing.large),
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderWidth: normalize(3),
    color: theme.colors.white,
    fontSize: normalize(theme.fontSizes.medium),
    borderRadius: normalize(theme.spacing.medium),
    marginTop: normalize(theme.spacing.extraSmall),
    marginBottom: normalize(theme.spacing.small),
    marginRight: normalize(theme.spacing.small),
  },
  createPost: {
    position: 'absolute',
    bottom: normalize(11),
    right: normalize(11),
    backgroundColor: theme.colors.primary,
    borderRadius: normalize(100),
    elevation: normalize(5),
    paddingTop: normalize(12),
    paddingBottom: normalize(13),
    paddingLeft: normalize(15),
    paddingRight: normalize(12),
  },
  creategroup: {
    marginLeft: '5%',
  },
  headercomponent: {
    backgroundColor: theme.colors.white,
    marginBottom: normalize(6),
  },
});

export default GroupDetailsCard;
