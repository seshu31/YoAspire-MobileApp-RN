import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../components/Dashboard';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Network from '../components/Network';
import CreatePost from '../components/CreatePost';
import Groups from '../components/Groups';
import Chat from '../components/Chat';
import normalize from 'react-native-normalize';
import theme from '../../theme';

const Tab = createBottomTabNavigator();

const Navigator = ({handleCreatePost}) => {
  const [fetch, setFetch] = useState(() => false);

  const handleFetch = () => {
    setFetch(prevFetch => !prevFetch);
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {backgroundColor: theme.colors.white},
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
      }}>
      <Tab.Screen
        name="Home"
        children={() => <Dashboard fetch={fetch} />}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Entypo name="home" color={color} size={normalize(26)} />
          ),
        }}
      />
      <Tab.Screen
        name="Network"
        component={Network}
        options={{
          tabBarLabel: 'Network',
          tabBarIcon: ({color}) => (
            <Ionicons name="people" size={normalize(26)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        children={() => (
          <CreatePost
            handleFetch={handleFetch}
            handleCreatePost={handleCreatePost}
          />
        )}
        options={{
          tabBarLabel: 'Create Post',
          tabBarVisible: false,
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <Ionicons name="create" size={normalize(26)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-group"
              size={normalize(26)}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="textsms" size={normalize(26)} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
