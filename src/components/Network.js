import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../reusables/Loader';
import {useNavigation} from '@react-navigation/native';
import theme from '../../theme';
import normalize from 'react-native-normalize';
import {Profiles} from '../staticData';
import ProfileCard from '../shared/ProfileCard';

const Network = () => {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => fetchProfiles(), []);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      Alert.alert('Something went wrong', 'user token not found');
    }
  };

  const fetchProfiles = () => {
    console.log('fetch profiles function');
    try {
      setProfiles(Profiles);
      setFetching(false);
    } catch (err) {
      Alert.alert('something went wrong', err);
    }
  };

  const loadTopPosts = () => {
    setFetching(true);
    fetchProfiles();
  };

  const loadEndPosts = () => {
    if (!allLoaded) setLoading(true);
    if (loading) fetchProfiles();
  };

  const renderItem = ({item}) => (
    <ProfileCard item={item} navigation={navigation} />
  );

  const renderFooter = () => {
    {
      !isLoading ? <Loader /> : null;
    }
  };

  const renderHeader = () => {
    return (
      <TouchableOpacity
        style={styles.manageItem}
        onPress={() => console.log('navigate to manage network screen')}
        activeOpacity={0.5}>
        <Text style={styles.manageText}>Manage my network</Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={normalize(24)}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={item => item.UserId}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        refreshing={fetching}
        onRefresh={loadTopPosts}
        onEndReachedThreshold={0.1}
        onEndReached={loadEndPosts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  manageItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '6.5%',
    paddingVertical: normalize(theme.spacing.medium),
  },
  manageText: {
    fontSize: normalize(theme.fontSizes.large),
    color: theme.colors.primary,
  },
});

export default Network;
