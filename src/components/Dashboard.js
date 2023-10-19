import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {StyleSheet, View, FlatList, Alert} from 'react-native';
import DashboardArticle from '../shared/DashboardArticle';
import Loader from '../reusables/Loader';
import {useNavigation} from '@react-navigation/native';
import backend_url from '../../config';
import {articlesData} from '../PostProfileData';

const Dashboard = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState(() => []);
  const [isLoading, setIsLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [page, setPage] = useState(() => 0);

  useEffect(() => {
    const mount = navigation.addListener('focus', () => {
      fetchPosts();
    });
    fetchPosts();
    return mount;
  }, []);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  const renderFooter = () => {
    loading ? <Loader /> : null;
  };

  const loadTopPosts = () => {
    setFetching(true);
    fetchPosts();
  };

  const fetchPosts = () => {
    getToken().then(token => {
      axios
        .get(`${backend_url}/post/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          if (loading) {
            if (
              JSON.stringify(response.data.posts) !== JSON.stringify(articles)
            ) {
              setArticles([...articles, ...response.data.posts]);
            }
            setLoading(false);
          } else {
            setArticles(response.data.posts);
            setPage(0);
            setAllLoaded(false);
            setFetching(false);
          }
          setIsLoading(false);
          if (response.data.posts.length) setPage(page => page + 10);
          else {
            setAllLoaded(true);
          }
        })
        .catch(err => {
          setIsLoading(false);
          alert('Something went wrong. Please, Try again');
          navigation.navigate('Index');
        });
    });
  };

  const loadEndPosts = () => {
    if (!allLoaded) {
      setLoading(false);
    }
    if (loading) {
      fetchPosts();
    }
  };

  const renderItem = ({item}) => (
    // Render each item using the DashboardArticle component
    <DashboardArticle item={item} navigation={navigation} />
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isLoading ? '#fff' : '#e8e8e8',
        },
      ]}>
      {articles && articles.length ? (
        // Render a FlatList with the articles data
        <FlatList
          data={articles}
          keyExtractor={item => item.post_id.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          refreshing={fetching}
          onRefresh={loadTopPosts}
          onEndReachedThreshold={0.1}
          onEndReached={loadEndPosts}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Dashboard;
