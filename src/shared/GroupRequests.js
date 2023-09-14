import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import theme from '../../theme';
import normalize from 'react-native-normalize';
import GroupRequestCard from './GroupRequestCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../reusables/Loader';
import Profiles from '../PostProfileData';

const GroupRequests = ({navigation, route}) => {
  const {id} = route.params;
  const [profiles, setProfiles] = useState(Profiles);
  const [fetching, setFetching] = useState(() => false);
  const [fetch, setFetch] = useState(() => false);

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
          <Ionicons name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Requests</Text>
      </View>
      {/* <Loader /> */}
      <FlatList
        data={profiles}
        keyExtractor={item => item.userid}
        renderItem={renderitem}
        refreshing={fetching}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  connectionHeader: {
    height: normalize(60),
    flexDirection: 'row',
    paddingHorizontal: normalize(10),
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
