import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AccountImage from './AccountImage';
import {useForm, Controller} from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import backend_url from '../../config';
import Loader from '../reusables/Loader';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const Login = ({navigation, route}) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
    setError,
    reset,
  } = useForm();
  const message = route.params?.message ? route.params.message : '';
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [emailAdd, setEmailAdd] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordType = () => {
    setIsSecureEntry(prevIsSecureEntry => !prevIsSecureEntry);
  };

  const verifyPassword = async (email, password) => {
    setLoading(true);
    try {
      if (email && password) {
        const response = await axios.post(
          `${backend_url}/auth/login`,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8', // Use 'Content-Type' instead of 'Content-type'
            },
          },
        );
        console.log('ya');

        if (response.data.token) {
          await AsyncStorage.setItem('userToken', response.data.token);
          await AsyncStorage.setItem('userId', response.data.userid.toString());
          setLoading(false);
          navigation.navigate('index');
          return true;
        } else if (response.data.statuscode === 0) {
          setLoading(false);
          navigation.navigate('otp-verification', {
            email: email,
          });
        } else if (response.data.statuscode === -1) {
          setError('email', {
            type: 'EmailNotFound',
            message: response.data.status,
          });
        } else {
          setError('email', {
            type: 'incorrectPassword',
            message: 'Incorrect password',
          });
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong. Try again later.');
    }

    setLoading(false);
    return false;
  };

  const hasSpace = async value => {
    if (value.includes(' ')) {
      return 'No spaces allowed';
    }
    return true;
  };

  const handleLogin = async data => {
    setIsSecureEntry(true);
    setEmailAdd('');
    navigation.setParams({message: null});
    await verifyPassword(data.email, data.password);
    // route.params.loginHandler(true);
  };

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : null}
      <AccountImage />
      <View style={styles.loginCard}>
        {message != null ? (
          <Text style={styles.infoText}>{message}</Text>
        ) : null}
        <Controller
          control={control}
          name="email"
          defaultValue={null}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            validate: hasSpace,
            pattern:
              /^\s*(?:[a-z0-9!#$%&'*+\/=?^_`{|}~\s-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~\s-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))\s*$/,
          }}
        />
        {errors.email && errors.email.type === 'validate' && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
        {errors.email && errors.email.type === 'required' && (
          <Text style={styles.errorText}>Email Field is required.</Text>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <Text style={styles.errorText}>Enter valid EmailID</Text>
        )}
        {errors.email && errors.email.type === 'EmailNotFound' && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
        <View style={styles.passwordField}>
          <Controller
            control={control}
            name="password"
            defaultValue={null}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Password"
                autoCapitalize="none"
                contextMenuHidden={true}
                style={styles.inputField}
                secureTextEntry={isSecureEntry}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={theme.colors.placeholdercolor}
              />
            )}
            rules={{
              required: true,
              minLength: 8,
              validate: hasSpace,
            }}
          />
          {isSecureEntry ? (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={togglePasswordType}
              activeOpacity={0.5}>
              <Entypo
                name="eye"
                size={normalize(theme.iconSizes.mediumLarge)}
                color={theme.colors.grey}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={togglePasswordType}
              activeOpacity={0.5}>
              <Entypo
                name="eye-with-line"
                size={normalize(theme.iconSizes.mediumLarge)}
                color={theme.colors.grey}
              />
            </TouchableOpacity>
          )}
          {errors.password && errors.password.type === 'required' && (
            <Text style={styles.errorText}>Password Field is required.</Text>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <Text style={styles.errorText}>
              Password should consists of minimum 8 characters.
            </Text>
          )}
          {errors.password && errors.password.type === 'validate' && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
          {errors.email && errors.email.type === 'incorrectPassword' && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>
        <View style={styles.registerBlock}>
          <TouchableOpacity
            onPress={() => navigation.navigate('forgot-password')}
            activeOpacity={0.5}>
            <Text style={styles.forgotText}>forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.loginButton]}
          onPress={handleSubmit(handleLogin)}
          activeOpacity={0.5}>
          <Text style={[styles.loginText]}>LOGIN</Text>
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
  errorText: {color: theme.colors.red},
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: normalize(70),
    alignItems: 'center',
  },
  loginCard: {
    width: '85%',
  },
  infoText: {
    color: 'green',
    fontSize: normalize(theme.fontSizes.medium),
    marginBottom: normalize(theme.spacing.small),
  },
  inputField: {
    width: '100%',
    paddingRight: normalize(40),
    height: normalize(50),
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginBottom: normalize(theme.spacing.small),
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
  },
  passwordField: {
    position: 'relative',
    marginVertical: normalize(theme.spacing.small),
  },
  eyeIcon: {
    position: 'absolute',
    right: normalize(theme.spacing.small),
    top: normalize(theme.spacing.small),
  },
  loginButton: {
    height: normalize(50),
    marginVertical: normalize(theme.spacing.large),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  loginText: {
    color: theme.colors.white,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    letterSpacing: 2,
    width: '100%',
    textAlign: 'center',
    fontWeight: theme.fontWeight.bold,
  },
  signInBlock: {
    width: '100%',
  },
  registerText: {
    width: '100%',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  forgotText: {
    width: '100%',
    color: theme.colors.primary,
    textAlign: 'right',
  },
});

export default Login;
