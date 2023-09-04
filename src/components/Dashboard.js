/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Loader from '../reusables/Loader';
import {useNavigation} from '@react-navigation/native';
import DashboardArticle from '../shared/DashboardArticle';

const Dashboard = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => true);
  const [fetching, setFetching] = useState(() => false);

  //Sending sample data instead of api call
  const dummyData = [
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
      Category_Type: 'article',
      First_Name: 'sraz',
      Last_Name: 'vadlamanu',
      Title: 'Web Developer',
      Description: 'current working tool Java',
    },
    {
      PostId: 3,
      Active: 1,
      No_of_Likes: 3,
      Category_Type: 'article',
      First_Name: 'ram',
      Last_Name: 'ponnana',
      Title: 'Backend Developer',
      Description: 'Current working tool Nodejs, mongodb ',
    },
  ];

  useEffect(() => {
    setArticles(dummyData);
  }, []);

  // const renderFooter = () => {
  //   if (!loading) {
  //     return null;
  //   }
  //   return <ActivityIndicator size="large" color="#376eb3" />;
  // };

  const renderItem = ({item}) => (
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
      {articles.length ? (
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
