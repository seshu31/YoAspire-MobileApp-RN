import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AccountImage from './AccountImage';
import {Ionicons} from '@expo/vector-icons';

const Login = ({navigation, route}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [emailErr, setEmailErr] = useState(true);
  const [loading, setLoading] = useState(false);

  const togglePasswordType = () => {
    setIsSecureEntry(prevIsSecureEntry => !prevIsSecureEntry);
  };

  const handleLogin = () => {
    setIsSecureEntry(true);
    setEmailErr(true);
    navigation.setParams({message: null});
    route.params.loginHandler(true); // Assuming this function exists in the parent component
  };

  return (
    <View style={styles.container}>
      <AccountImage />
      <View style={styles.loginCard}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.inputField}
          value="static@example.com"
        />
        <Text style={{color: 'red'}}>Email Field is required.</Text>
        <View style={styles.passwordField}>
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            style={styles.inputField}
            secureTextEntry={isSecureEntry}
            value="staticPassword"
          />
          {isSecureEntry ? (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={togglePasswordType}
              activeOpacity={0.5}>
              <Text>Show</Text>
              {/* <Ionicons name="ios-eye" size={28} color="lightgrey" /> */}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={togglePasswordType}
              activeOpacity={0.5}>
              <Text>Hide</Text>
            </TouchableOpacity>
          )}
          {emailErr ? (
            <Text style={{color: 'red'}}>Password Field is required.</Text>
          ) : null}
        </View>
        <TouchableOpacity
          style={[
            styles.loginButton,
            {backgroundColor: loading ? '#cce4f7' : '#2196f3'},
          ]}
          onPress={handleLogin}
          activeOpacity={0.5}>
          <Text style={[styles.loginText, {opacity: loading ? 0 : 1}]}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <View style={styles.signInBlock}>
          <TouchableOpacity
            onPress={() => navigation.navigate('register')}
            activeOpacity={0.5}>
            <Text style={styles.registerText}>
              Not yet registered? register here!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // Image styles go here
  },
  loginCard: {
    width: '85%',
    marginBottom: 100,
    marginTop: -20,
  },
  infoText: {
    color: 'green',
    fontSize: 16,
    marginBottom: 10,
  },
  inputField: {
    width: '100%',
    height: 50,
    fontSize: 16,
    marginBottom: 10,
    alignItems: 'center',
    borderColor: '#376eb3',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  passwordField: {
    position: 'relative',
    marginVertical: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  loginButton: {
    height: 50,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signInBlock: {
    width: '100%',
  },
  registerText: {
    width: '100%',
    color: '#376eb3',
    textAlign: 'center',
  },
});

export default Login;
