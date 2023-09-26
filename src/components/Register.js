import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
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
  } = useForm();

  const hasSpace = async value => {
    if (value.includes(' ')) {
      return 'No spaces allowed';
    }
    return true;
  };

  const handleRegister = async ({
    email,
    password,
    firstName,
    lastName,
    username,
  }) => {
    setLoading(true);
    const payload = {
      email: email.trim(),
      password: password.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      username: username.trim(),
      role: 'user',
    };
    console.log(JSON.stringify(payload), 'handleRegister function');

    try {
      const response = await axios.post(
        `${backend_url}/auth/register`,
        payload,
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );

      console.log('register response', response.data);
      setLoading(false);

      if (response.data.statuscode === 1 || response.data.statuscode === -2) {
        navigation.navigate('otp-verification', {
          email: email,
        });
        reset({
          email: '',
          password: '',
          cnfmPassword: '',
          firstName: '',
          lastName: '',
          username: '',
        });
      } else if (response.data.statuscode === -1) {
        Alert.alert('Account exists', response.data.status);
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Something went wrong. Please, try again.', err.message);
    }
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

  const validateUsername = async value => {
    const response = await axios.get(
      `${backend_url}/auth/checkusername/${value}`,
    );
    if (response.data.statuscode !== -1) return true;
    return false;
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
                placeholderTextColor={theme.colors.placeholdercolor}
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
                placeholderTextColor={theme.colors.placeholdercolor}
              />
            )}
            name="firstName"
          />
          {errors.firstName && errors.firstName.type === 'required' && (
            <Text style={styles.errorText}>FirstName Field is required.</Text>
          )}
          {errors.firstName && errors.firstName.type === 'minLength' && (
            <Text style={styles.errorText}>
              FirstName should consists minimum of 3 characters.
            </Text>
          )}
          {errors.firstName && errors.firstName.type === 'maxLength' && (
            <Text style={styles.errorText}>
              FirstName should consists maximum of 30 characters.
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
                placeholderTextColor={theme.colors.placeholdercolor}
              />
            )}
            name="lastName"
          />
          {errors.lastName && errors.lastName.type === 'required' && (
            <Text style={styles.errorText}>LastName Field is required.</Text>
          )}
          {errors.lastName && errors.lastName.type === 'minLength' && (
            <Text style={styles.errorText}>
              LastName should consists minimum of 3 characters.
            </Text>
          )}
          {errors.lastName && errors.lastName.type === 'maxLength' && (
            <Text style={styles.errorText}>
              LastName should consists maximum of 30 characters.
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
                placeholderTextColor={theme.colors.placeholdercolor}
              />
            )}
            rules={{
              required: true,
              pattern:
                /^\s*(?:[a-z0-9!#$%&'*+\/=?^_`{|}~\s-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~\s-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))\s*$/,
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
                  contextMenuHidden={true}
                  style={styles.inputField}
                  secureTextEntry={isSecureEntry}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={theme.colors.placeholdercolor}
                />
              )}
              rules={{required: true, minLength: 8, validate: hasSpace}}
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
              name="cnfmPassword"
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  contextMenuHidden={true}
                  placeholder="Confirm Password"
                  autoCapitalize="none"
                  style={styles.inputField}
                  secureTextEntry={isSecureEntryConfirm}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={theme.colors.placeholdercolor}
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
                <Entypo
                  name="eye"
                  size={normalize(theme.iconSizes.mediumLarge)}
                  color={theme.colors.grey}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={toggleConfirmPasswordType}
                activeOpacity={0.5}>
                <Entypo
                  name="eye-with-line"
                  size={normalize(theme.iconSizes.mediumLarge)}
                  color={theme.colors.grey}
                />
              </TouchableOpacity>
            )}
            {errors.cnfmPassword && errors.cnfmPassword.type === 'required' && (
              <Text style={styles.errorText}>Password Field is required.</Text>
            )}
            {errors.cnfmPassword && errors.cnfmPassword.type === 'validate' && (
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
                  size={normalize(theme.iconSizes.extraSmall)}
                  color={theme.colors.primary}
                />
              ) : null}
            </TouchableOpacity>
            <View style={styles.textRow}>
              <Text style={styles.agreeText}> I agree with Yo!Aspire </Text>
              <Text style={styles.termsText}> Terms and Conditions </Text>
            </View>
          </View>
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
  container: {
    flexGrow: 1,
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
    paddingRight: normalize(40),
    marginVertical: normalize(theme.spacing.small),
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderBottomWidth: normalize(3),
    backgroundColor: theme.colors.white,
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  signInBlock: {
    width: '100%',
  },
  signinText: {
    width: '100%',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  signupButton: {
    height: normalize(50),
    marginVertical: normalize(theme.spacing.large),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: theme.colors.primary,
  },
  signupText: {
    color: theme.colors.white,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    letterSpacing: normalize(2),
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(theme.spacing.small),
  },
  textRow: {
    flexDirection: 'row',
    marginTop: normalize(theme.spacing.small),
  },
  termsText: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  checkbox: {
    width: normalize(theme.spacing.large),
    height: normalize(theme.spacing.large),
    borderWidth: normalize(3),
    marginTop: normalize(theme.spacing.small),
    marginHorizontal: normalize(theme.spacing.extraSmall),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontWeight: theme.fontWeight.bold,
  },
  agreeText: {color: theme.colors.black},
  errorText: {color: theme.colors.red},
});

export default Register;
