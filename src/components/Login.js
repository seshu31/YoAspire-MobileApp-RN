import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AccountImage from './AccountImage';
import {useForm, Controller} from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';

const Login = ({navigation, route}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [emailAdd, setEmailAdd] = useState(() => '');
  const [emailErr, setEmailErr] = useState(() => true);
  const [loading, setLoading] = useState(() => false);

  const togglePasswordType = () => {
    setIsSecureEntry(prevIsSecureEntry => !prevIsSecureEntry);
  };

  // const handleLogin = () => {
  //   setIsSecureEntry(true);
  //   setEmailErr(true);
  //   navigation.setParams({message: null});
  //   route.params.loginHandler(true); // Assuming this function exists in the parent component
  // };

  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <AccountImage />
      <View style={styles.loginCard}>
        {/* {message != null ? (
          <Text style={styles.infoText}>{message}</Text>
        ) : null} */}
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
              placeholderTextColor={'lightgrey'}
            />
          )}
          rules={{
            required: true,
            pattern:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            // validate: validateEmail,
          }}
        />
        {errors.email && errors.email.type === 'required' && (
          <Text style={{color: 'red'}}>Email Field is required.</Text>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <Text style={{color: 'red'}}>Enter valid EmailID</Text>
        )}
        {/* {errors.email && errors.email.type === 'validate' && (
          <Text style={{color: 'red'}}>Email doesn't exists!</Text>
        )} */}
        <View style={styles.passwordField}>
          <Controller
            control={control}
            name="password"
            defaultValue={null}
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
              // validate: validatePassword,
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
            <Text style={{color: 'red'}}>Password Field is required.</Text>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <Text style={{color: 'red'}}>
              Password should consists of minimum 8 characters.
            </Text>
          )}
          {/* {emailErr
            ? errors.password &&
              errors.password.type === 'validate' && (
                <Text style={{color: 'red'}}>Password is incorrect.</Text>
              )
            : null} */}
        </View>
        <View style={styles.registerBlock}>
          <TouchableOpacity
            onPress={() => navigation.navigate('forgot-password')}
            activeOpacity={0.5}>
            <Text style={styles.forgotText}>forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.loginButton,
            {backgroundColor: loading ? '#cce4f7' : '#2196f3'},
          ]}
          onPress={handleSubmit(onSubmit)}
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
    color: '#000',
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
  forgotText: {
    width: '100%',
    color: '#2196f3',
    textAlign: 'right',
  },
});

export default Login;
