import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Provider} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GroupMemberCard from './GroupMemberCard';
import Loader from '../reusables/Loader';
import {groupMembers} from '../PostProfileData';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const GroupMembers = ({navigation, route}) => {
  const {id, admin, creator} = route.params;
  const [profiles, setProfiles] = useState(groupMembers);
  const [user, setUser] = useState(() => 0);
  const [fetching, setFetching] = useState(() => false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const mount = navigation.addListener('focus', () => {
      fetchProfiles();
    });
    return mount;
  });

  const onRefresh = () => {
    setFetching(true);
    fetchProfiles();
  };

  const fetchProfiles = () => {
    console.log('method: GET, ${backend_url}/group/getmembers/${id}');
  };

  const fetchHandler = () => {
    fetchProfiles();
  };

  const renderitem = ({item}) => (
    <GroupMemberCard
      item={item}
      navigation={navigation}
      owner={item.UserId === user}
      admin={admin}
      creator={creator === item.UserId}
      id={id}
      fetchHandler={fetchHandler}
    />
  );

  return (
    <Provider>
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
          <Text style={styles.headerTitle}>Members</Text>
        </View>
        {loading ? <Loader /> : null}
        <FlatList
          data={profiles}
          renderItem={renderitem}
          keyExtractor={item => item.UserId}
          refreshing={fetching}
          onRefresh={onRefresh}
        />
      </View>
    </Provider>
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

export default GroupMembers;
