import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import normalize from 'react-native-normalize';
import theme from '../../theme';
import ConnectionCard from './ConnectionCard';
import Loader from '../reusables/Loader';
import {Followees} from '../staticData';

const ManageNetwork = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [connections, setConnections] = useState(Followees);
  const [loading, setLoading] = useState(false);

  useEffect(() => fetchConnections(), []);

  const getToken = async () => {
    try {
      return {
        userid: await AsyncStorage.getItem('userId'),
        token: await AsyncStorage.getItem('userToken'),
      };
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  const fetchConnections = () => {
    console.log(
      'fetchCnonections function, method:get, url:${backend_url}/follow/getfollowers/${userid}',
    );
  };

  const fetchFollowees = () => {
    fetchConnections();
  };

  const renderItem = ({item}) => (
    <ConnectionCard
      item={item}
      fetchConnections={fetchConnections}
      navigation={navigation}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.connectionHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <MaterialIcons
            name="arrow-back-ios"
            size={normalize(theme.iconSizes.mediumLarge)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.connectionTitle}>Connections</Text>
      </View>
      {isLoading ? <Loader /> : null}
      {connections.length ? (
        <FlatList
          data={connections}
          keyExtractor={item =>
            item.FolloweeId
              ? item.FolloweeId.toString()
              : item.FollowerId.toString()
          }
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={fetchFollowees}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    position: 'relative',
  },
  connectionHeader: {
    height: normalize(60),
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingHorizontal: normalize(theme.spacing.large),
  },
  connectionTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
    paddingLeft: '25%',
  },
});

export default ManageNetwork;
