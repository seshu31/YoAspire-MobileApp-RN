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

const Stack = createStackNavigator();

const App = () => {
  // const [loggedIn, setLoggedIn] = useState(() => null);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="edit-profile"
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
