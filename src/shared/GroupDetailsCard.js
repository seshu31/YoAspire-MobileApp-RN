import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import DashboardArticle from './DashboardArticle';
import Moment from 'react-moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../reusables/Loader';

const GroupDetailsCard = ({navigation, route}) => {
  // Replace the following static data with actual data
  const groupData = {
    id: 1,
    name: 'Sample Group',
    description:
      'This is a sample group description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://example.com/sample-image.jpg',
    created_on: '2023-01-15T10:30:00Z',
    total_members: 20,
    admin_flag: false,
    created_by: 123,
    joined: false,
    req_sent: false,
    group_type: false,
  };

  const staticArticlesData = [
    {
      PostId: 1,
      // Add other article properties as needed
    },
    {
      PostId: 2,
      // Add other article properties as needed
    },
    // Add more static article data as needed
  ];

  const [group, setGroup] = useState(groupData);
  const [admin, setAdmin] = useState(groupData.admin_flag);
  const [creator, setCreator] = useState(groupData.created_by);
  const [lineLength, setLineLength] = useState(3);
  const [lines, setLines] = useState(0);
  const [articles, setArticles] = useState(staticArticlesData);
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [load, setLoad] = useState(false);

  const fetchGroup = () => {
    console.log('fetchGroup');
  };

  const fetchPosts = () => {
    console.log('fetchPosts');
  };

  useEffect(() => {
    const mount = navigation.addListener('focus', () => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      fetchGroup();
      fetchPosts();
    });
    fetchPosts();
    return mount;
  });
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
            style={{marginLeft: '5%'}}
            onPress={() =>
              navigation.navigate('create-group', {
                group: group,
              })
            }
            activeOpacity={0.5}>
            <Ionicons name="md-create" color={'#376eb3'} size={26} />
          </TouchableOpacity>
        ) : (
          <Ionicons color={'#fff'} style={{marginLeft: '5%'}} />
        )}
      </View>
      {/* <Loader /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupHeader: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderColor: '#376eb3',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  groupTitle: {
    fontSize: 24,
    textTransform: 'uppercase',
    paddingLeft: 20,
    color: '#376eb3',
  },
  groupImageSection: {
    height: 100,
    backgroundColor: '#376eb3',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 50,
  },
  groupImageBlock: {
    backgroundColor: 'white',
    borderRadius: 100,
    height: 100,
    width: 100,
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
  },
  groupImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#376eb3',
  },
  groupInfo: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: '5%',
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupDesc: {
    fontSize: 15,
    paddingTop: 5,
  },
  showMore: {
    fontSize: 15,
    color: '#376eb3',
    alignSelf: 'flex-start',
  },
  membersItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  membersText: {
    fontSize: 16,
    color: '#376eb3',
  },
  groupButtons: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
  },
  groupButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#376eb3',
    borderColor: '#376eb3',
    borderWidth: 1,
    color: '#fff',
    fontSize: 16,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
  },
  createPost: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#376eb3',
    borderRadius: 100,
    elevation: 5,
    paddingTop: 10,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 11,
  },
});

export default GroupDetailsCard;
