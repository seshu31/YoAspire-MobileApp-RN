import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AccountImage from './AccountImage';
import Loader from '../reusables/Loader';
import axios from 'axios';
import backend_url from '../../config';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const ForgotPassword = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const [loading, setLoading] = useState(() => false);

  const validateEmail = async value => {
    const response = await axios.get(`${backend_url}/auth/checkemail/${value}`);
    if (response.data.statuscode !== 1) {
      return true;
    }
    return false;
  };

  const handleOTP = data => {
    setLoading(true);
    axios
      .post(
        `${backend_url}/auth/forgot`,
        {
          email: data.email,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .then(response => {
        setLoading(false);
        if (response.data.statuscode === 1)
          reset({
            email: '',
          });
        navigation.navigate('otp-verification', {
          email: data.email,
          reset: true,
        });
      })
      .catch(err => {
        setLoading(false);
        alert('Something went wrong. Please, try again.');
      });
  };

  return (
    <View style={styles.container}>
      <AccountImage />
      <View style={styles.loginCard}>
        <Text style={styles.emailText}>Enter email to reset the password</Text>
        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={'lightgrey'}
            />
          )}
          rules={{
            required: true,
            pattern:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            validate: validateEmail,
          }}
        />
        {errors.email && errors.email.type === 'required' && (
          <Text style={{color: 'red'}}>Email Field is required.</Text>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <Text style={{color: 'red'}}>Enter valid EmailID</Text>
        )}
        <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit(handleOTP)}>
          <View style={styles.sendotpButton}>
            <Text style={[styles.sendotpText, {opacity: loading ? 0 : 1}]}>
              SEND OTP
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {loading ? <Loader /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCard: {
    width: '85%',
    marginBottom: normalize(100),
    marginTop: normalize(-20),
  },
  emailText: {
    color: '#FFA500',
    fontSize: normalize(theme.fontSizes.medium),
    paddingBottom: normalize(theme.spacing.small),
  },
  inputField: {
    width: '100%',
    height: normalize(50),
    fontSize: normalize(theme.fontSizes.medium),
    marginBottom: normalize(theme.spacing.small),
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
  },
  sendotpButton: {
    height: normalize(50),
    marginVertical: normalize(theme.spacing.large),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  sendotpText: {
    color: theme.colors.white,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    letterSpacing: 2,
    width: '100%',
    textAlign: 'center',
    fontWeight: theme.fontWeight.bold,
  },
});

export default ForgotPassword;
