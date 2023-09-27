import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import DashboardArticle from '../shared/DashboardArticle';
import Loader from '../reusables/Loader';
import {useNavigation} from '@react-navigation/native';
import {articlesData} from '../PostProfileData';
const Dashboard = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState(articlesData);
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const renderFooter = () => {
    loading ? <Loader /> : null;
  };

  const loadTopPosts = () => {
    setFetching(true);
    fetchPosts();
  };

  const fetchPosts = () => {
    console.log(
      'fetchPosts, method: Get, url :${backend_url}/feed/latestfirst/10/${loading ? page : 0}',
    );
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
    <DashboardArticle articles={item} navigation={navigation} />
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
          keyExtractor={item => item.PostId.toString()}
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
