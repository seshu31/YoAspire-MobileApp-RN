import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatCard from './ChatCard';
import normalize from 'react-native-normalize';
import theme from '../../theme';
import {chatArray} from '../staticData';

const ChatSection = ({navigation, route}) => {
  const [profile, setProfile] = useState([]);
  const [chatMsg, setChatMsg] = useState('');
  const [chatArray, setChatArray] = useState(chatArray);
  const {name, id} = route.params ? route.params : null;

  // useEffect(() => {
  //   AsyncStorage.getItem('userId').then(userid => {
  //     fetchData(userid);
  //     socket.emit('user_connected', userid);
  //   });
  //   return () => socket.disconnect();
  // }, []);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  const fetchData = userid => {
    console.log(
      'fetchData function, method:get, url:${backend_url}/feed/chat/${userid}/${id}',
    );
  };

  const messageHandler = value => {
    setChatMsg(value);
  };

  const renderItem = ({item}) => console.log(item);

  const sendMessage = async () => {
    let msg = {
      // msgid: uuidv4(),
      senderid: Number(await AsyncStorage.getItem('userId')),
      message: chatMsg,
      receiverid: id,
      Timestamp: new Date().toISOString(),
    };
    msg['First_Name'] = profile.First_Name;
    msg['Last_Name'] = profile.Last_Name;
    msg['img_file_name'] = profile.img_file_name;
    // socket.emit('send_message', msg);
    setChatArray([msg, ...chatArray]);
    setChatMsg('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <MaterialIcons
            name="arrow-back-ios"
            size={normalize(26)}
            color="#376eb3"
          />
        </TouchableOpacity>
        <Text style={styles.profileTitle} numberOfLines={1}>
          {name}
        </Text>
      </View>
      <FlatList
        // inverted={-1}
        data={chatArray}
        keyExtractor={item => item.msgid.toString()}
        renderItem={renderItem}
      />
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Write a message..."
          value={chatMsg}
          onChangeText={messageHandler}
          style={styles.inputField}
          placeholderTextColor={theme.colors.placeholdercolor}
        />
        <TouchableOpacity
          disabled={!chatMsg}
          onPress={sendMessage}
          activeOpacity={0.5}>
          <Ionicons
            name="send"
            color="#376eb3"
            size={normalize(34)}
            style={{opacity: chatMsg ? 1 : 0.7}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingVertical: 50,
  },
  profileHeader: {
    position: 'absolute',
    top: 0,
    height: normalize(50),
    width: '100%',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderColor: '#376eb3',
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: normalize(24),
    color: '#376eb3',
    paddingLeft: '10%',
    textTransform: 'capitalize',
  },
  inputRow: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    backgroundColor: theme.colors.white,
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputField: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: normalize(5),
    height: 40,
    fontSize: 16,
    color: 'black',
  },
});

export default ChatSection;
