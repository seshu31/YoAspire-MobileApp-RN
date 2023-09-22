import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import AccountImage from './AccountImage';
import {useForm, Controller} from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import backend_url from '../../config';
import Loader from '../reusables/Loader';
import normalize from 'react-native-normalize';
import theme from '../../theme';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(() => false);
  const [isSecureEntry, setIsSecureEntry] = useState(() => true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(() => true);
  const [isChecked, setIsChecked] = useState(() => false);

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cnfmpassword: '',
    },
  });

  const hasSpace = async value => {
    if (value.includes(' ')) {
      return 'No spaces allowed';
    }
    return true;
  };

  const handleRegister = ({email, password, firstName, lastName, username}) => {
    setLoading(true);
    const payload = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      username,
      role: 'user',
    };
    console.log(JSON.stringify(payload), 'handleregister function');

    axios
      .post(`${backend_url}/auth/register`, payload, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(response => {
        console.log('register response', response.data);
        setLoading(false);
        if (response.data.statuscode === 1 || response.data.statuscode === -2) {
          navigation.navigate('otp-verification', {
            email: email,
          });
          reset({
            email: '',
            password: '',
            cnfmpassword: '',
            firstName: '',
            lastName: '',
            username: '',
          });
        } else if (response.data.statuscode === -1) {
          Alert.alert('Account exists', response.data.status);
        } else {
          navigation.navigate('otp-verification', {
            email: email,
          });
        }
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Something went wrong. Please, try again.', err);
      });
  };

  const togglePasswordType = () => {
    setIsSecureEntry(prevIsSecureEntry => !prevIsSecureEntry);
  };

  const toggleConfirmPasswordType = () => {
    setIsSecureEntryConfirm(
      prevIsSecureEntryConfirm => !prevIsSecureEntryConfirm,
    );
  };

  const toggleCheckbox = () => {
    setIsChecked(prevIsChecked => !prevIsChecked);
  };

  const onSubmit = data => {
    console.log(data);
    navigation.navigate('otp-verification', {
      email: data.email,
    });
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <ScrollView contentContainerStyle={styles.container}>
        <AccountImage />
        <View style={styles.loginCard}>
          <Controller
            control={control}
            name="username"
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Username"
                style={styles.inputField}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={'lightgrey'}
              />
            )}
            rules={{
              required: true,
              minLength: 6,
              maxLength: 30,
              // validate: validateUsername,
            }}
          />
          {errors.username && errors.username.type === 'required' && (
            <Text style={styles.errorText}>Username Field is required.</Text>
          )}
          {errors.username && errors.username.type === 'minLength' && (
            <Text style={styles.errorText}>
              Username should consists minimum of 6 characters.
            </Text>
          )}
          {errors.username && errors.username.type === 'maxLength' && (
            <Text style={styles.errorText}>
              Username should consists maximum of 30 characters.
            </Text>
          )}
          {errors.username && errors.username.type === 'validate' && (
            <Text style={styles.errorText}>Username already exists!</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 3,
              maxLength: 30,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.inputField}
                placeholderTextColor={'lightgrey'}
              />
            )}
            name="firstName"
          />
          {errors.firstName && errors.firstName.type === 'required' && (
            <Text style={styles.errorText}>Firstname Field is required.</Text>
          )}
          {errors.firstName && errors.firstName.type === 'minLength' && (
            <Text style={styles.errorText}>
              Firstname should consists minimum of 3 characters.
            </Text>
          )}
          {errors.firstName && errors.firstName.type === 'maxLength' && (
            <Text style={styles.errorText}>
              Firstname should consists maximum of 30 characters.
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 3,
              maxLength: 30,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.inputField}
                placeholderTextColor={'lightgrey'}
              />
            )}
            name="lastName"
          />
          {errors.lastName && errors.lastName.type === 'required' && (
            <Text style={styles.errorText}>Lastname Field is required.</Text>
          )}
          {errors.lastName && errors.lastName.type === 'minLength' && (
            <Text style={styles.errorText}>
              Lastname should consists minimum of 3 characters.
            </Text>
          )}
          {errors.lastName && errors.lastName.type === 'maxLength' && (
            <Text style={styles.errorText}>
              Lastname should consists maximum of 30 characters.
            </Text>
          )}
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
                /^\s*(?:[a-z0-9!#$%&'*+\/=?^_`{|}~\s-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~\s-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))\s*$/,
              // pattern:
              // /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              // validate: validateEmail,
              validate: hasSpace,
            }}
          />
          {errors.email && errors.email.type === 'required' && (
            <Text style={styles.errorText}>Email Field is required.</Text>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <Text style={styles.errorText}>Enter valid EmailID</Text>
          )}
          {errors.email && errors.email.type === 'validate' && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
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
              rules={{required: true, minLength: 8, validate: hasSpace}}
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
              <Text style={styles.errorText}>Password Field is required.</Text>
            )}
            {errors.password && errors.password.type === 'validate' && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <Text style={styles.errorText}>
                Password should consists of minimum 8 characters.
              </Text>
            )}
          </View>
          <View style={styles.passwordField}>
            <Controller
              control={control}
              name="cnfmpassword"
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
            {errors.cnfmpassword && errors.cnfmpassword.type === 'required' && (
              <Text style={styles.errorText}>Password Field is required.</Text>
            )}
            {errors.cnfmpassword && errors.cnfmpassword.type === 'validate' && (
              <Text style={styles.errorText}>Passwords didn't matched.</Text>
            )}
          </View>
          <View style={styles.termsRow}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={toggleCheckbox}
              activeOpacity={0.5}>
              {isChecked ? (
                <Entypo
                  style={styles.checkMark}
                  name="check"
                  size={20}
                  color="#2196f3"
                />
              ) : // <Text>checkMark</Text>
              null}
            </TouchableOpacity>
            <View style={styles.textRow}>
              <Text style={{color: '#000'}}> I agree with Yo!Aspire </Text>
              <Text style={styles.termsText}> Terms and Conditions </Text>
            </View>
          </View>
          {/* <View style={styles.termsRow}>
          {isChecked ? null : (
            <Text style={{color: '#000', marginLeft: 5}}>
              Please check the box to proceed.
            </Text>
          )}
        </View> */}
          <TouchableOpacity
            style={[
              styles.signupButton,
              {
                opacity: isChecked ? 1 : 0.8,
              },
            ]}
            onPress={handleSubmit(handleRegister)}
            disabled={!isChecked}
            activeOpacity={0.5}>
            <Text style={[styles.signupText]}>Register</Text>
          </TouchableOpacity>
          <View style={styles.signInBlock}>
            <TouchableOpacity
              onPress={() => navigation.navigate('login')}
              activeOpacity={0.5}>
              <Text style={styles.signinText}>
                Already have an account? Sign in!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {color: 'red'},
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginCard: {
    width: '85%',
    marginTop: -50,
    marginBottom: 50,
  },
  inputField: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#376eb3',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
  },
  signInBlock: {
    width: '100%',
  },
  signinText: {
    width: '100%',
    color: '#376eb3',
    textAlign: 'center',
  },
  signupButton: {
    height: 50,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#2196f3',
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  passwordField: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  termsText: {
    fontWeight: 'bold',
    color: '#2196f3',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontWeight: 'bold',
  },
});

export default Register;
