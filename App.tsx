import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './src/components/Register';
import Login from './src/components/Login';
import Dashboard from './src/components/Dashboard';
import DetailedArticle from './src/shared/DetailedArticle';
import theme from './theme';
import CommentCard from './src/shared/CommentCard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="comment"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="comment" component={CommentCard} />
          <Stack.Screen name="article" component={DetailedArticle} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen
            name="login"
            component={Login}
            // initialParams={{loginHandler: loginHandler}}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
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
