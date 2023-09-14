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
import DetailedArticle from './src/shared/DetailedArticle';
import GroupDetailsCard from './src/shared/GroupDetailsCard.js';
import CreateGroup from './src/components/CreateGroup.js';
import theme from './theme';
import EditProfile from './src/shared/EditProfile';
import UserProject from './src/shared/UserProject';
import UserPublication from './src/shared/UserPublication';
import UserSkill from './src/shared/UserSkill';
import UserEducation from './src/shared/UserEducation';
import UserExperience from './src/shared/UserExperience';
import UserDetails from './src/shared/UserDetails';
import UserCourse from './src/shared/UserCourse';
import EditSkill from './src/shared/EditSkill';
import EditProject from './src/shared/EditProject';
import EditCourse from './src/shared/EditCource';
import EditPublication from './src/shared/EditPublications';
import GroupMembers from './src/shared/GroupMembers.js';
import GroupRequests from './src/shared/GroupRequests.js';

const Stack = createStackNavigator();

const App = () => {
  // const [loggedIn, setLoggedIn] = useState(() => null);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="user-publication"
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
          <Stack.Screen name="article" component={DetailedArticle} />
          <Stack.Screen name="group" component={GroupDetailsCard} />
          <Stack.Screen name="create-group" component={CreateGroup} />
          <Stack.Screen
            name="edit-profile"
            component={EditProfile}
            initialParams={{user: {}}}
          />
          <Stack.Screen
            name="user-project"
            component={UserProject}
            initialParams={{user: 213}}
          />
          <Stack.Screen
            name="edit-project"
            component={EditProject}
            initialParams={{user: 213}}
          />
          <Stack.Screen
            name="user-publication"
            component={UserPublication}
            initialParams={{user: 213}}
          /> 
          <Stack.Screen
            name="edit-publication"
            component={EditPublication}
            initialParams={{user: 213}}
          />
          <Stack.Screen
            name="user-skill"
            component={UserSkill}
            initialParams={{skills: []}}
          />
          <Stack.Screen name="user-education" component={UserEducation} />
          <Stack.Screen name="user-experience" component={UserExperience} />
          <Stack.Screen
            name="user-details"
            component={UserDetails}
            initialParams={{user: 213}}
          />
          <Stack.Screen
            name="user-course"
            component={UserCourse}
            initialParams={{user: 213}}
          />
          <Stack.Screen name="edit-course" component={EditCourse} />
          <Stack.Screen name="edit-skill" component={EditSkill} />
          <Stack.Screen name="group-members" component={GroupMembers} />
          <Stack.Screen name="manage-requests" component={GroupRequests} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export default App;
