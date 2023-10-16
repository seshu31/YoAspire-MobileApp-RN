import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AccountImage from './AccountImage';
import Entypo from 'react-native-vector-icons/Entypo';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import backend_url from '../../config';
import Loader from '../reusables/Loader';
import theme from '../../theme';
import normalize from 'react-native-normalize';
const EnterPassword = ({navigation, route}) => {
  const {code, email} = route.params;
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      cnfPassword: '',
    },
  });
  const [isSecureEntry, setIsSecureEntry] = useState(() => true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(() => true);
  const [loading, setLoading] = useState(() => false);
  const togglePasswordType = () => {
    setIsSecureEntry(prevIsSecureEntry => !prevIsSecureEntry);
  };
  const toggleConfirmPasswordType = () => {
    setIsSecureEntryConfirm(
      prevIsSecureEntryConfirm => !prevIsSecureEntryConfirm,
    );
  };

  const updateHandler = data => {
    setLoading(true);
    axios
      .post(
        `${backend_url}/auth/reset/${code}`,
        {
          email: email,
          password: data.password,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .then(response => {
        console.log(response.data);
        if (response.data.statuscode === 1) {
          setLoading(false);
          navigation.navigate('login', {
            message: 'Password updated successfully. Please, Login to continue',
          });
        }
      })
      .catch(err => {
        alert('Somthing went wrong. Please, try again.');
      });
  };
  return (
    <View style={styles.container}>
      {loading ? <Loader /> : null}
      <AccountImage />
      <View style={styles.loginCard}>
        <View style={styles.passwordField}>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Password"
                autoCapitalize="none"
                style={styles.inputField}
                secureTextEntry={isSecureEntry}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={'lightgrey'}
              />
            )}
            rules={{
              required: true,
              minLength: 8,
            }}
          />
          {isSecureEntry ? (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={togglePasswordType}
              activeOpacity={0.5}>
              <Entypo name="eye" size={28} color="lightgrey" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={togglePasswordType}
              activeOpacity={0.5}>
              <Entypo name="eye-with-line" size={28} color="lightgrey" />
            </TouchableOpacity>
          )}
          {errors.password && errors.password.type === 'required' && (
            <Text style={styles.error}>Password Field is required.</Text>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <Text style={styles.error}>
              Password should consists of minimum 8 characters.
            </Text>
          )}
        </View>
        <View style={styles.passwordField}>
          <Controller
            control={control}
            name="cnfPassword"
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Confirm Password"
                autoCapitalize="none"
                style={styles.inputField}
                secureTextEntry={isSecureEntryConfirm}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={'lightgrey'}
              />
            )}
            rules={{
              required: true,
              minLength: 8,
              validate: value => value === watch('password'),
            }}
          />
          {isSecureEntryConfirm ? (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleConfirmPasswordType}
              activeOpacity={0.5}>
              <Entypo name="eye" size={28} color="lightgrey" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleConfirmPasswordType}
              activeOpacity={0.5}>
              <Entypo name="eye-with-line" size={28} color="lightgrey" />
            </TouchableOpacity>
          )}
          {errors.cnfPassword && errors.cnfPassword.type === 'required' && (
            <Text style={styles.error}>Password Field is required.</Text>
          )}
          {errors.cnfPassword && errors.cnfPassword.type === 'minLength' && (
            <Text style={styles.error}>
              Password should consists of minimum 8 characters.
            </Text>
          )}
          {errors.cnfPassword && errors.cnfPassword.type === 'validate' && (
            <Text style={styles.error}>Passwords didn't matched.</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={handleSubmit(updateHandler)}
          activeOpacity={0.5}>
          <View style={styles.updateButton}>
            <Text style={styles.updateText}>UPDATE PASSWORD</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  loginCard: {
    width: '85%',
    marginTop: normalize(-50),
    marginBottom: normalize(50),
  },
  inputField: {
    width: '100%',
    height: normalize(50),
    marginVertical: normalize(theme.spacing.small),
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.white,
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  updateButton: {
    height: normalize(50),
    marginVertical: normalize(theme.spacing.large),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  updateText: {
    color: theme.colors.white,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    letterSpacing: 2,
    width: '100%',
    textAlign: 'center',
    fontWeight: theme.fontWeight.bold,
    textTransform: 'uppercase',
  },
  passwordField: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: normalize(theme.spacing.small),
    top: normalize(theme.spacing.large),
  },
  error: {
    color: theme.colors.red,
  },
});
export default EnterPassword;
