/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Loader from '../reusables/Loader';
import {useNavigation} from '@react-navigation/native';
import DashboardArticle from '../shared/DashboardArticle';

const Dashboard = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState(() => [
    // Initial state with sample data
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
  ]);
  const [isLoading, setIsLoading] = useState(() => true);
  const [fetching, setFetching] = useState(() => false);

  useEffect(() => {
    setArticles(articles);
  }, [articles]);

  // const renderFooter = () => {
  //   if (!loading) {
  //     return null;
  //   }
  //   return <ActivityIndicator size="large" color="#376eb3" />;
  // };

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
      {articles.length ? (
        // Render a FlatList with the articles data
        <FlatList
          data={articles}
          keyExtractor={item => item.PostId.toString()}
          renderItem={renderItem}
          // ListFooterComponent={renderFooter}
          ListFooterComponentStyle={{paddingBottom: 10}}
          refreshing={fetching}
          // onRefresh={loadTopPosts}
          onEndReachedThreshold={0.1}
          // onEndReached={loadEndPosts}
          style={{paddingVertical: 5}}
        />
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Dashboard;
