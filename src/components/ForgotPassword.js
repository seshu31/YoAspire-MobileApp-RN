import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AccountImage from './AccountImage';

const ForgotPassword = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const [emailAdd, setEmailAdd] = useState(() => '');
  const [loading, setLoading] = useState(() => false);

  const validateEmail = async value => {
    // const response = await axios.get(`${backend_url}/auth/checkemail/${value}`);
    // if (response.data.statuscode !== 1) {
    //   return true;
    // }
    // return false;
  };

  const handleOTP = data => {
    // setLoading(true);
    // axios
    //   .post(
    //     `${backend_url}/auth/forgot`,
    //     {
    //       email: emailAdd,
    //     },
    //     {
    //       headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //       },
    //     },
    //   )
    //   .then(response => {
    //     setLoading(false);
    //     if (response.data.statuscode === 1)
    //       reset({
    //         email: '',
    //       });
    //     navigation.navigate('otp-verification', {
    //       email: emailAdd,
    //       reset: true,
    //     });
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     alert('Something went wrong. Please, try again.');
    //   });

    console.log(data);
    navigation.navigate('otp-verification', {
      email: data.email,
      reset: true,
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
            // validate: validateEmail,
          }}
        />
        {errors.email && errors.email.type === 'required' && (
          <Text style={{color: 'red'}}>Email Field is required.</Text>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <Text style={{color: 'red'}}>Enter valid EmailID</Text>
        )}
        <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit(handleOTP)}>
          <View
            style={[
              styles.sendotpButton,
              {
                backgroundColor: loading ? '#cce4f7' : '#2196f3',
              },
            ]}>
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
            <Text style={[styles.sendotpText, {opacity: loading ? 0 : 1}]}>
              SEND OTP
            </Text>
          </View>
        </TouchableOpacity>
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
  loginCard: {
    width: '85%',
    marginBottom: 100,
    marginTop: -20,
  },
  emailText: {
    color: 'orange',
    fontSize: 16,
    paddingBottom: 10,
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
  sendotpButton: {
    height: 50,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
  },
  sendotpText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
