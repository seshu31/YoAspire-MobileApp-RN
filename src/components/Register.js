import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
// import axios from 'axios';
// import backend_url from '../config';
import AccountImage from './AccountImage';
// import {Ionicons} from '@expo/vector-icons';
import {useForm, Controller} from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      cnfmpassword: '',
      firstname: '',
      lastname: '',
      username: '',
    },
  });
  const [loading, setLoading] = useState(() => false);
  const [isSecureEntry, setIsSecureEntry] = useState(() => true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(() => true);
  const [isChecked, setIsChecked] = useState(() => false);

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

  const validateUsername = async value => {
    // const response = await axios.get(
    //   `${backend_url}/auth/checkusername/${value}`,
    // );
    // if (response.data.statuscode !== -1) return true;
    // return false;
  };

  const validateEmail = async value => {
    // const response = await axios.get(`${backend_url}/auth/checkemail/${value}`);
    // console.log(value);
    // if (response.data.statuscode !== -1) return true;
    // return false;
  };

  const handleRegister = ({email, password, firstname, lastname, username}) => {
    setLoading(true);
    const payload = {
      email,
      password,
      first_name: firstname,
      last_name: lastname,
      username,
    };
    // axios
    //   .post(`${backend_url}/auth/register`, payload, {
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //     },
    //   })
    //   .then(response => {
    //     setLoading(false);
    //     if (response.data.statuscode === 1) {
    //       navigation.navigate('otp-verification', {
    //         email: email,
    //       });
    //       reset({
    //         email: '',
    //         password: '',
    //         cnfmpassword: '',
    //         firstname: '',
    //         lastname: '',
    //         username: '',
    //       });
    //     } else if (response.data.statuscode === -2) {
    //       navigation.navigate('otp-verification', {
    //         email: email,
    //       });
    //       reset({
    //         email: '',
    //         password: '',
    //         cnfmpassword: '',
    //         firstname: '',
    //         lastname: '',
    //         username: '',
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     alert('Somthing went wrong. Please, try again.');
    //   });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AccountImage />
      <View style={styles.loginCard}>
        <Controller
          control={control}
          name="username"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              placeholder="Username"
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: true,
            minLength: 6,
            maxLength: 30,
            validate: validateUsername,
          }}
        />
        {errors.username && errors.username.type === 'required' && (
          <Text style={{color: 'red'}}>Username Field is required.</Text>
        )}
        {errors.username && errors.username.type === 'minLength' && (
          <Text style={{color: 'red'}}>
            Username should consists minimum of 6 characters.
          </Text>
        )}
        {errors.username && errors.username.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
            Username should consists maximum of 30 characters.
          </Text>
        )}
        {errors.username && errors.username.type === 'validate' && (
          <Text style={{color: 'red'}}>Username already exists!</Text>
        )}
        <Controller
          control={control}
          name="firstname"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              placeholder="Firstname"
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 30,
          }}
        />
        {errors.firstname && errors.firstname.type === 'required' && (
          <Text style={{color: 'red'}}>Firstname Field is required.</Text>
        )}
        {errors.firstname && errors.firstname.type === 'minLength' && (
          <Text style={{color: 'red'}}>
            Firstname should consists minimum of 3 characters.
          </Text>
        )}
        {errors.firstname && errors.firstname.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
            Firstname should consists maximum of 30 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="lastname"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              placeholder="Lastname"
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 30,
          }}
        />
        {errors.lastname && errors.lastname.type === 'required' && (
          <Text style={{color: 'red'}}>Lastname Field is required.</Text>
        )}
        {errors.lastname && errors.lastname.type === 'minLength' && (
          <Text style={{color: 'red'}}>
            Lastname should consists minimum of 3 characters.
          </Text>
        )}
        {errors.lastname && errors.lastname.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
            Lastname should consists maximum of 30 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
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
        {errors.email && errors.email.type === 'validate' && (
          <Text style={{color: 'red'}}>Email already exists!</Text>
        )}
        <View style={styles.passwordField}>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                placeholder="Password"
                autoCapitalize="none"
                style={styles.inputField}
                secureTextEntry={isSecureEntry}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            rules={{required: true, minLength: 8}}
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
            <Text style={{color: 'red'}}>Password Field is required.</Text>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <Text style={{color: 'red'}}>
              Password should consists of minimum 8 characters.
            </Text>
          )}
        </View>
        <View style={styles.passwordField}>
          <Controller
            control={control}
            name="cnfmpassword"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                placeholder="Confirm Password"
                autoCapitalize="none"
                style={styles.inputField}
                secureTextEntry={isSecureEntryConfirm}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            rules={{
              required: true,
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
            <Text style={{color: 'red'}}>Password Field is required.</Text>
          )}
          {errors.cnfmpassword && errors.cnfmpassword.type === 'validate' && (
            <Text style={{color: 'red'}}>Passwords didn't matched.</Text>
          )}
        </View>
        <View style={styles.termsRow}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={toggleCheckbox}
            activeOpacity={0.5}>
            {isChecked ? (
              <Ionicons
                style={styles.checkMark}
                name="checkmark"
                size={18}
                color="#2196f3"
              />
            ) : // <Text>checkMark</Text>
            null}
          </TouchableOpacity>
          <View style={styles.textRow}>
            <Text> I agree with Yo!Aspire </Text>
            <Text style={styles.termsText}> Terms and Conditions </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.signupButton,
            {
              opacity: isChecked ? 1 : 0.8,
              backgroundColor: loading ? '#cce4f7' : '#2196f3',
            },
          ]}
          onPress={handleSubmit(handleRegister)}
          disabled={!isChecked}
          activeOpacity={0.5}>
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: '15%',
              left: '45%',
            }}
            animating={loading}
            size="large"
            color="#376eb3"
          />
          <Text style={[styles.signupText, {opacity: loading ? 0 : 1}]}>
            Register
          </Text>
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
  );
};

const styles = StyleSheet.create({
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
});

export default Register;
