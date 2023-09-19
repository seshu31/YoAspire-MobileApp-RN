import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ChatList from '../shared/ChatList';
import Loader from '../reusables/Loader';
import theme from '../../theme';
import normalize from 'react-native-normalize';
import {ChatListData} from '../staticData';

const Chat = () => {
  const [chatList, setChatList] = useState(ChatListData);
  const navigation = useNavigation();
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mount = navigation.addListener('focus', () => {
      fetchChats();
    });
    return mount;
  }, []);

  const getToken = async () => {
    try {
      return {
        userid: await AsyncStorage.getItem('userId'),
        token: await AsyncStorage.getItem('userToken'),
      };
    } catch (error) {
      Alert.alert('Something went wrong', 'user Id, token not found');
    }
  };

  const fetchChats = () => {
    console.log(
      'fetchChats function, method:get, url:${backend_url}/feed/chat/${userid}',
    );
  };

  const renderitem = ({item}) => (
    <ChatList item={item} navigation={navigation} />
  );

  const onRefresh = () => {
    setFetching(true);
    fetchChats();
  };

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : null}
      {chatList.length ? (
        <FlatList
          data={chatList}
          keyExtractor={item => item.UserId.toString()}
          renderItem={renderitem}
          refreshing={fetching}
          onRefresh={onRefresh}
        />
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('message-list')}
          activeOpacity={0.5}
          style={styles.messageButtonStyle}>
          <Text style={styles.messageButton}>Start Messaging</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  messageButtonStyle: {
    alignItems: 'center',
  },
  messageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#376eb3',
    borderColor: '#376eb3',
    borderWidth: 1,
    color: '#fff',
    fontSize: 18,
    borderRadius: 30,
  },
});

export default Chat;
