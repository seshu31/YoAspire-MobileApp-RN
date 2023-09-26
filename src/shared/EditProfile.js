import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  LogBox,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useForm, Controller} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import normalize from 'react-native-normalize';
import theme from '../../theme';

const EditProfile = ({navigation, route}) => {
  const user = route.params?.user ? route.params.user : null;
  const [photoLoaded, setPhotoLoaded] = useState(() => true);
  const [date, setDate] = useState(
    route.params?.user?.profile?.DOB
      ? new Date(route.params.user.profile.DOB)
      : null,
  );
  const [dob, setDob] = useState('');

  useEffect(() => {
    if (route.params.user.profile.DOB) {
      onChange(route.params.user.profile.DOB);
    }
  }, []);

  const onDateChange = selectedDate => {
    const currentDate = new Date(selectedDate);
    const requiredDate =
      currentDate.getDate().toString().length === 1
        ? '0' + currentDate.getDate()
        : currentDate.getDate();
    const requiredMonth =
      (currentDate.getMonth() + 1).toString().length === 1
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1;
    const requiredYear = currentDate.getFullYear();
    setDob(requiredDate + '-' + requiredMonth + '-' + requiredYear);
    setDate(selectedDate);
    setShow(false);
  };

  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const saveHandler = data => {
    console.log(data);
  };

  const onChange = selectedDate => {
    const currentDate = new Date(selectedDate);
    const requiredDate =
      currentDate.getDate().toString().length === 1
        ? '0' + currentDate.getDate()
        : currentDate.getDate();
    const requiredMonth =
      (currentDate.getMonth() + 1).toString().length === 1
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1;
    const requiredYear = currentDate.getFullYear();
    setDob(requiredDate + '-' + requiredMonth + '-' + requiredYear);
    setShow(false);
  };

  const deltaDate = (input, days, months, years) => {
    return new Date(
      input.getFullYear() + years,
      input.getMonth() + months,
      Math.min(
        input.getDate() + days,
        new Date(
          input.getFullYear() + years,
          input.getMonth() + months + 1,
          0,
        ).getDate(),
      ),
    );
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const maximumDOB = deltaDate(new Date(), 0, 0, 0);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <MaterialIcons
            name="arrow-back-ios"
            size={normalize(theme.iconSizes.mediumLarge)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Edit Profile</Text>
        <TouchableOpacity
          onPress={handleSubmit(saveHandler)}
          activeOpacity={0.5}>
          <Ionicons
            name="save-outline"
            size={normalize(theme.iconSizes.mediumLarge)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.photoSection}>
          <Text style={styles.photoText}>Profile Photo</Text>
          <View style={styles.photoDiv}>
            <Image
              style={styles.photo}
              source={require('../../assets/male.png')}
              onLoadStart={() => setPhotoLoaded(true)}
              onLoadEnd={() => setPhotoLoaded(false)}
            />
            <ActivityIndicator
              style={styles.photoIndicator}
              animating={photoLoaded}
              size="large"
              color={theme.colors.primary}
            />
            <TouchableOpacity
              style={styles.photoEdit}
              onPress={() => {}}
              activeOpacity={0.5}>
              <AntDesign
                name="edit"
                size={normalize(18)}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Controller
          control={control}
          name="username"
          defaultValue={user.profile.User_Name}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="User Name"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 30,
          }}
        />
        {errors.username && errors.username.type === 'required' && (
          <Text style={styles.errorText}>username Field is required.</Text>
        )}
        {errors.username && errors.username.type === 'minLength' && (
          <Text style={styles.errorText}>
            username should consists minimum of 3 characters.
          </Text>
        )}
        {errors.username && errors.username.type === 'maxLength' && (
          <Text style={styles.errorText}>
            username should consists maximum of 30 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="firstName"
          defaultValue={user.profile.First_Name}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="First Name"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 30,
          }}
        />
        {errors.firstName && errors.firstName.type === 'required' && (
          <Text style={styles.errorText}>firstName Field is required.</Text>
        )}
        {errors.firstName && errors.firstName.type === 'minLength' && (
          <Text style={styles.errorText}>
            firstName should consists minimum of 3 characters.
          </Text>
        )}
        {errors.firstName && errors.firstName.type === 'maxLength' && (
          <Text style={styles.errorText}>
            firstName should consists maximum of 30 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="lastName"
          defaultValue={user.profile.Last_Name}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Last Name"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 30,
          }}
        />
        {errors.lastName && errors.lastName.type === 'required' && (
          <Text style={styles.errorText}>lastName Field is required.</Text>
        )}
        {errors.lastName && errors.lastName.type === 'minLength' && (
          <Text style={styles.errorText}>
            lastName should consists minimum of 3 characters.
          </Text>
        )}
        {errors.lastName && errors.lastName.type === 'maxLength' && (
          <Text style={styles.errorText}>
            lastName should consists maximum of 30 characters.
          </Text>
        )}

        <Controller
          control={control}
          name="email"
          defaultValue={user.profile.Email}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
              placeholder="Email"
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
          <Text style={styles.errorText}>Email Field is required.</Text>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <Text style={styles.errorText}>Enter valid EmailID</Text>
        )}
        <Controller
          control={control}
          name="phone"
          defaultValue={user.profile.phone_no}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              autoCapitalize="none"
              keyboardType="numeric"
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
              placeholder="Phone"
            />
          )}
          rules={{
            required: true,
            pattern: /^[0][1-9]\d{9}$|^[1-9]\d{9}$/,
          }}
        />
        {errors.phone && errors.phone.type === 'required' && (
          <Text style={styles.errorText}>Phone Field is required.</Text>
        )}
        {errors.phone && errors.phone.type === 'pattern' && (
          <Text style={styles.errorText}>Enter valid Phone number</Text>
        )}
        <View style={styles.dateTime}>
          {/* <Text style={styles.dateTimeText}>
              {`${
                date.getDate().toString().length === 1
                  ? '0' + date.getDate()
                  : date.getDate()
              } - ${
                (date.getMonth() + 1).toString().length === 1
                  ? '0' + (date.getMonth() + 1)
                  : date.getMonth() + 1
              } - ${date.getFullYear()}`}
            </Text> */}
          <TextInput
            autoCapitalize="none"
            style={styles.inputField}
            value={dob}
            placeholderTextColor={theme.colors.placeholdercolor}
            placeholder="DOB"
            editable={false}
          />
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={showDatepicker}
            activeOpacity={0.5}>
            <Ionicons
              name="calendar"
              size={normalize(theme.iconSizes.large)}
              color={theme.colors.darkgrey}
            />
          </TouchableOpacity>
        </View>
        <DatePicker
          date={date ? date : new Date()}
          format="MM/DD/YYYY"
          androidVariant="nativeAndroid"
          mode="date"
          style={styles.picker}
          maximumDate={maximumDOB}
          modal={true}
          open={show}
          onConfirm={onDateChange}
          onCancel={() => setShow(false)}
        />
        <Controller
          control={control}
          name="location"
          defaultValue={user.profile.Location}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
              placeholder="Location"
            />
          )}
          rules={{
            required: true,
          }}
        />
        {errors.location && errors.location.type === 'required' && (
          <Text style={styles.errorText}>Location Field is required.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.red,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  profileHeader: {
    height: normalize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(theme.spacing.large),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  body: {
    padding: normalize(theme.spacing.large),
  },
  profileTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
  },
  photoSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(theme.spacing.small),
  },
  photoText: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    color: theme.colors.primary,
  },
  photo: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginVertical: normalize(theme.spacing.small),
  },

  photoDiv: {
    position: 'relative',
  },
  photoIndicator: {
    position: 'absolute',
    top: '35%',
    left: '9%',
  },
  photoEdit: {
    position: 'absolute',
    right: -10,
    bottom: 25,
    backgroundColor: theme.colors.white,
    elevation: 5,
    borderRadius: normalize(50),
    paddingLeft: normalize(theme.spacing.small),
    paddingRight: normalize(theme.spacing.small),
    paddingVertical: normalize(theme.spacing.small),
  },
  inputField: {
    width: '100%',
    height: normalize(50),
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.white,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    color: theme.colors.black,
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTimeText: {
    fontSize: normalize(theme.fontSizes.medium),
  },
  popup: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageButton: {
    color: theme.colors.primary,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginTop: normalize(theme.spacing.large),
  },
  deleteButton: {
    color: theme.colors.red,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginBottom: normalize(theme.spacing.large),
  },
  inputLabel: {
    color: theme.colors.primary,
    fontSize: normalize(theme.fontSizes.medium),
  },
  calendarButton: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
});

export default EditProfile;
