import React, {useState, useRef, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import AccountImage from './AccountImage';
import backend_url from '../../config';
import axios from 'axios';
import Loader from '../reusables/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTP = ({route, navigation}) => {
  if (route.params && route.params.email) {
    var email = route.params.email;
  }
  const [otpArray, setOtpArray] = useState(() => ['', '', '', '']);
  const [timer, setTimer] = useState(() => 120);
  const [intervalId, setIntervalId] = useState(() => null);
  const [resend, setResend] = useState(() => false);
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const [loading, setLoading] = useState(() => false);

  useEffect(() => {
    const timerInterval = setInterval(
      () => setTimer(prevTimer => prevTimer - 1),
      1000,
    );
    setIntervalId(timerInterval);
    return () => clearInterval(timerInterval);
  }, [resend]);

  if (timer === 0) {
    clearInterval(intervalId);
  }
  const onOtpChange = index => {
    return value => {
      if (isNaN(value) || value === ' ') {
        // do nothing when a non digit or space is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);
      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        }
      }
    };
  };

  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: keyValue}}) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (keyValue === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        }
        // clear the focused text box as well only on Android
        if (Platform.OS === 'android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  const resendOtp = () => {
    // if (route.params && route.params.reset) {
    //   axios
    //     .post(
    //       `${backend_url}/auth/forgot`,
    //       {
    //         email: route.params.email,
    //       },
    //       {
    //         headers: {
    //           'Content-type': 'application/json; charset=UTF-8',
    //         },
    //       },
    //     )
    //     .then(response => {
    //       if (response.data.statuscode === 1) {
    //         setTimer(120);
    //         setResend(prevResend => !prevResend);
    //       }
    //     })
    //     .catch(err => {
    //       alert('Something went wrong. Please, try again');
    //     });
    // } else {
    //   axios
    //     .post(
    //       `${backend_url}/auth/register/resend`,
    //       {
    //         email,
    //       },
    //       {
    //         headers: {
    //           'Content-type': 'application/json; charset=UTF-8',
    //         },
    //       },
    //     )
    //     .then(response => {
    //       if (response.data.statuscode === 1) {
    //         setTimer(120);
    //         setResend(prevResend => !prevResend);
    //       }
    //     })
    //     .catch(err => {
    //       alert('User already validated');
    //     });
    // }
  };

  const verifyOtp = async () => {
    console.log('1');
    setLoading(true);
    const otp = `${otpArray[0]}${otpArray[1]}${otpArray[2]}${otpArray[3]}`;

    try {
      const payload = {email: email, otp: otp};

      const url =
        route.params && route.params.reset
          ? `${backend_url}/auth/getresetdata/${otp}`
          : `${backend_url}/auth/verify_otp`;

      const response = await (route.params && route.params.reset
        ? axios.get(url)
        : axios.post(url, payload, {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }));

      console.log(response.data, 'response for verifyotp');

      if (response.data) {
        setLoading(false);
        navigation.setParams({email: null});
        if (route.params && route.params.reset) {
          navigation.navigate('enter-password', {
            message:
              'Verification successful. Please, Set a new password to continue',
            code: otp,
          });
        } else {
          response.data.token
            ? AsyncStorage.setItem('token', response.data.token)
            : Alert.alert('no token found');
          navigation.navigate('login', {
            message: 'Verification successful. Please, Login to continue',
          });
        }
      } else {
        setLoading(false);
        Alert.alert('Invalid OTP. Please, Try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      Alert.alert('An error occurred. Please, try again later.');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <AccountImage />
      {email != null ? (
        <Text style={styles.infoText}>
          Enter verification code which was sent to {email}
        </Text>
      ) : null}
      <View style={styles.otpCard}>
        {[
          firstTextInputRef,
          secondTextInputRef,
          thirdTextInputRef,
          fourthTextInputRef,
        ].map((textInputRef, index) => (
          <TextInput
            value={otpArray[index]}
            style={styles.inputField}
            onKeyPress={onOtpKeyPress(index)}
            onChangeText={onOtpChange(index)}
            keyboardType={'numeric'}
            maxLength={1}
            autoFocus={index === 0 ? true : undefined}
            ref={textInputRef}
            key={index}
          />
        ))}
      </View>
      <TouchableOpacity
        onPress={resendOtp}
        disabled={timer !== 0}
        style={{marginTop: 10}}
        activeOpacity={0.5}>
        {timer === 0 ? (
          <Text style={{color: '#376eb3', fontSize: 16}}>Resend otp</Text>
        ) : (
          <Text style={{color: 'black', fontSize: 16}}>
            Resend otp in {timer} seconds
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={verifyOtp}
        disabled={!otpArray.every(item => item > 0)}
        activeOpacity={0.5}>
        <View
          style={[
            styles.submitButton,
            {
              opacity: otpArray.every(item => item) > 0 ? 1 : 0.8,
              backgroundColor: loading ? '#cce4f7' : '#2196f3',
            },
          ]}>
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: '15%',
              left: '55%',
            }}
            animating={loading}
            size="large"
            color="#376eb3"
          />
          <Text style={[styles.submitText, {opacity: loading ? 0 : 1}]}>
            SUBMIT
          </Text>
        </View>
      </TouchableOpacity>
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
  infoText: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: '10%',
  },
  otpCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputField: {
    height: 50,
    fontSize: 20,
    marginBottom: 10,
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 2,
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    textAlign: 'center',
    color: '#000',
  },
  submitButton: {
    height: 50,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
    paddingHorizontal: '5%',
    borderRadius: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default OTP;
