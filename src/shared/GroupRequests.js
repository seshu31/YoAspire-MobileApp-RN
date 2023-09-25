import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import theme from '../../theme';
import normalize from 'react-native-normalize';
import GroupRequestCard from './GroupRequestCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../reusables/Loader';
import {Profiles} from '../staticData';

const GroupRequests = ({navigation, route}) => {
  const {id} = route.params;
  const [profiles, setProfiles] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRequests = () => {
    console.log('method: GET, ${backend_url}/group/getreq/${id}');
  };

  const fetchHandler = () => {
    setFetch(prevValue => !prevValue);
  };

  const onRefresh = () => {
    setFetching(true);
    fetchRequests();
  };

  const renderitem = ({item}) => (
    <GroupRequestCard
      item={item}
      navigation={navigation}
      fetchHandler={fetchHandler}
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
            size={normalize(26)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Requests</Text>
      </View>
      {loading ? <Loader /> : null}
      {profiles && profiles.length ? (
        <FlatList
          data={profiles}
          keyExtractor={item => item.UserId}
          renderItem={renderitem}
          refreshing={fetching}
          onRefresh={onRefresh}
        />
      ) : (
        <View style={styles.NoProjectContainer}>
          <Text style={styles.NoProject}>No requests to display</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  NoProjectContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  NoProject: {
    fontSize: normalize(theme.fontSizes.small),
    color: theme.colors.black,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  connectionHeader: {
    height: normalize(60),
    flexDirection: 'row',
    paddingHorizontal: normalize(theme.spacing.large),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
    paddingLeft: '30%',
  },
});

export default GroupRequests;
