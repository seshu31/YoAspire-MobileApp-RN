import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import GroupCard from '../shared/GroupCard';
import {useNavigation} from '@react-navigation/native';
import Loader from '../reusables/Loader';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const Groups = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [allGroupsLoading, setAllGroupsLoading] = useState(false);
  const [groupsFetching, setGroupsFetching] = useState(false);
  const [allGroupsFetching, setAllGroupsFetching] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setGroups([
        // Replace this with your static data
        {groupid: 1, name: 'Group 1'},
        {groupid: 2, name: 'Group 2'},
        {groupid: 3, name: 'Group 3'},
      ]);

      setSuggestions([
        // Replace this with your static data
        {groupid: 4, name: 'Suggestion 1'},
        {groupid: 5, name: 'Suggestion 2'},
        {groupid: 6, name: 'Suggestion 3'},
      ]);
      setLoading(false);
    }, 2000); // Simulated delay for fetching data
  }, []);

  const onRefresh = () => {
    setLoading(true);
    // Simulate fetching data again
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulated delay for fetching data
  };

  const renderitem = ({item}) => (
    <GroupCard item={item} navigation={navigation} />
  );

  const renderFlatlist = () => {
    return (
      <>
        {suggestions.length ? (
          <FlatList
            data={suggestions}
            keyExtractor={item => item.groupid.toString()}
            renderItem={renderitem}
            ListHeaderComponent={renderheader}
          />
        ) : null}
        <TouchableOpacity onPress={() => navigation.navigate('create-group')}>
          <Text style={styles.createButton}>Create a Group</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderheader = () => (
    <Text style={styles.suggestionsButton}>Suggestions</Text>
  );

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <FlatList
        data={groups}
        keyExtractor={item => item.groupid.toString()}
        renderItem={renderitem}
        ListFooterComponent={renderFlatlist}
        refreshing={groupsFetching || allGroupsFetching}
        onRefresh={onRefresh}
        style={{opacity: groupsLoading || allGroupsLoading ? 0 : 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  suggestionsButton: {
    alignSelf: 'center',
    color: theme.colors.primary,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.small),
  },
  createButton: {
    alignSelf: 'center',
    color: theme.colors.primary,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.small),
  },
});

export default Groups;
