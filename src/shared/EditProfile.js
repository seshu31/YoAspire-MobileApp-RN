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
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import normalize from 'react-native-normalize';

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
    console.log('check date', route.params?.user?.profile?.DOB);

    const currentDate = new Date(selectedDate);
    console.log('current date', currentDate);
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

  // const saveHandler = data => {
  //   console.log(data);
  // };

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
            size={normalize(24)}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Edit Profile</Text>
        <TouchableOpacity
          onPress={handleSubmit(saveHandler)}
          activeOpacity={0.5}>
          <Ionicons name="save-outline" size={24} color="#fff" />
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
              color="#376eb3"
            />
            <TouchableOpacity
              style={styles.photoEdit}
              onPress={() => {}}
              activeOpacity={0.5}>
              <AntDesign name="edit" size={18} color="#376eb3" />
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
              placeholderTextColor={'lightgrey'}
            />
          )}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 30,
          }}
        />
        {errors.username && errors.username.type === 'required' && (
          <Text style={{color: 'red'}}>username Field is required.</Text>
        )}
        {errors.username && errors.username.type === 'minLength' && (
          <Text style={{color: 'red'}}>
            username should consists minimum of 3 characters.
          </Text>
        )}
        {errors.username && errors.username.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
            username should consists maximum of 30 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="firstname"
          defaultValue={user.profile.First_Name}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="First Name"
              placeholderTextColor={'lightgrey'}
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
          defaultValue={user.profile.Last_Name}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Last Name"
              placeholderTextColor={'lightgrey'}
            />
          )}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 30,
          }}
        />
        {errors.lastname && errors.lastname.type === 'required' && (
          <Text style={{color: 'red'}}>lastname Field is required.</Text>
        )}
        {errors.lastname && errors.lastname.type === 'minLength' && (
          <Text style={{color: 'red'}}>
            lastname should consists minimum of 3 characters.
          </Text>
        )}
        {errors.lastname && errors.lastname.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
            lastname should consists maximum of 30 characters.
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
              placeholderTextColor={'lightgrey'}
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
          <Text style={{color: 'red'}}>Email Field is required.</Text>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <Text style={{color: 'red'}}>Enter valid EmailID</Text>
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
              placeholderTextColor={'lightgrey'}
              placeholder="Phone"
            />
          )}
          rules={{
            required: true,
            pattern: /^[0][1-9]\d{9}$|^[1-9]\d{9}$/,
          }}
        />
        {errors.phone && errors.phone.type === 'required' && (
          <Text style={{color: 'red'}}>Phone Field is required.</Text>
        )}
        {errors.phone && errors.phone.type === 'pattern' && (
          <Text style={{color: 'red'}}>Enter valid Phone number</Text>
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
            placeholderTextColor={'lightgrey'}
            placeholder="DOB"
            editable={false}
          />
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={showDatepicker}
            activeOpacity={0.5}>
            <Ionicons name="calendar" size={30} color="#999" />
          </TouchableOpacity>
        </View>
        <DatePicker
          date={date ? date : new Date()}
          format="MM/DD/YYYY"
          androidVariant="nativeAndroid"
          value={date}
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
              placeholderTextColor={'lightgrey'}
              placeholder="Location"
            />
          )}
          rules={{
            required: true,
          }}
        />
        {errors.location && errors.location.type === 'required' && (
          <Text style={{color: 'red'}}>Location Field is required.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#376eb3',
    alignItems: 'center',
  },
  body: {
    padding: 20,
  },
  profileTitle: {
    fontSize: 24,
    color: '#fff',
  },
  photoSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  photoText: {
    fontSize: 18,
    color: '#376eb3',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#376eb3',
    marginVertical: 10,
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
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 8,
    paddingVertical: 7,
  },
  inputSection: {
    // borderColor: '#376eb3',
    // borderBottomWidth: 1,
  },
  inputField: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    borderColor: '#376eb3',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTimeText: {
    fontSize: 16,
  },
  popup: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageButton: {
    color: '#376eb3',
    fontSize: 18,
    marginTop: 20,
  },
  deleteButton: {
    color: 'red',
    fontSize: 18,
    marginBottom: 20,
  },
  inputLabel: {
    color: '#376eb3',
    fontSize: 16,
  },
  calendarButton: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  picker: {},
});

export default EditProfile;
