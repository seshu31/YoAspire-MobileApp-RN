import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './src/components/Register';
import Login from './src/components/Login';
import Index from './src/components/Index';
import OTP from './src/components/OTP';
import ForgotPassword from './src/components/ForgotPassword';
import EnterPassword from './src/components/EnterPassword';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Index from './src/components/Index';
// import OTP from './src/components/OTP';
// import ForgotPassword from './src/components/ForgotPassword';
// import EnterPassword from './src/components/EnterPassword';
// import Notification from './src/components/Notification';
// import ChatSection from './src/shared/ChatSection';
// import DetailedArticle from './src/shared/DetailedArticle';
// import GroupDetailsCard from './src/shared/GroupDetailsCard';
// import GroupMembers from './src/shared/GroupMembers';
// import CreateGroup from './src/components/CreateGroup';
// import GroupRequests from './src/shared/GroupRequests';
// import SearchBar from './src/components/SearchBar';
// import Profile from './src/components/Profile';
// import EditProfile from './src/shared/EditProfile';
// import UserDetails from './src/shared/UserDetails';
// import UserExperience from './src/shared/UserExperience';
// import EditExperience from './src/shared/EditExperience';
// import UserEducation from './src/shared/UserEducation';
// import EditEducation from './src/shared/EditEducation';
// import UserSkill from './src/shared/UserSkill';
// import EditSkill from './src/shared/EditSkill';
// import UserProject from './src/shared/UserProject';
// import EditProject from './src/shared/EditProject';
// import UserCourse from './src/shared/UserCourse';
// import EditCourse from './src/shared/EditCourse';
// import UserPublication from './src/shared/UserPublication';
// import EditPublication from './src/shared/EditPublication';
// import ManageNetwork from './src/shared/ManageNetwork';
// import MessageList from './src/shared/MessageList';
// import MessageCard from './src/shared/MessageCard';

const Stack = createStackNavigator();

const App = () => {
  // const [loggedIn, setLoggedIn] = useState(() => null);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="index" component={Index} />
          <Stack.Screen
            name="login"
            component={Login}
            // initialParams={{loginHandler: loginHandler}}
          />
          <Stack.Screen name="otp-verification" component={OTP} />
          <Stack.Screen name="forgot-password" component={ForgotPassword} />
          <Stack.Screen name="enter-password" component={EnterPassword} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* {loggedIn != null ? (
        <NavigationContainer>
          <Stack.Navigator>
            {loggedIn ? (
              <>
                <Stack.Screen name="register" component={Register} />
              </>
            ) : (
              <></>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <></>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
