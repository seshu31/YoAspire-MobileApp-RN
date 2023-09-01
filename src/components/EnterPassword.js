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

const EnterPassword = ({navigation, route}) => {
  const {code} = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      password: '',
      cnfPassword: '',
    },
  });

  const [isSecureEntry, setIsSecureEntry] = useState(() => true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(() => true);

  const togglePasswordType = () => {
    setIsSecureEntry(prevIsSecureEntry => !prevIsSecureEntry);
  };

  const toggleConfirmPasswordType = () => {
    setIsSecureEntryConfirm(
      prevIsSecureEntryConfirm => !prevIsSecureEntryConfirm,
    );
  };

  const updateHandler = data => {
    // axios
    //   .post(
    //     `${backend_url}/auth/reset/${code}`,
    //     {
    //       password,
    //     },
    //     {
    //       headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //       },
    //     },
    //   )
    //   .then(response => {
    //     if (response.data.statuscode === 1)
    //       navigation.navigate('login', {
    //         message: 'Password updated successfully. Please, Login to continue',
    //       });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     alert('Somthing went wrong. Please, try again.');
    //   });
    console.log(data);
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
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
            <Text style={{color: 'red'}}>Password Field is required.</Text>
          )}
          {errors.cnfPassword && errors.cnfPassword.type === 'minLength' && (
            <Text style={{color: 'red'}}>
              Password should consists of minimum 8 characters.
            </Text>
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
  updateButton: {
    height: 50,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
  },
  updateText: {
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
});

export default EnterPassword;
