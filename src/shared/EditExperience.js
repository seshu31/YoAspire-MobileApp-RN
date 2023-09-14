import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import Textarea from 'react-native-textarea';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useForm, Controller} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import normalize from 'react-native-normalize';
import theme from '../../theme';
import Loader from '../reusables/Loader';

const EditExperience = ({navigation, route}) => {
  const experience = route.params?.experience ? route.params.experience : null;
  const [isLoading, setIsLoading] = useState(() => false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [isChecked, setIsChecked] = useState(() =>
    experience ? (experience.To ? false : true) : false,
  );
  const [dateErr, setDateErr] = useState(() => false);
  const [date1, setDate1] = useState(() =>
    experience?.From ? new Date(experience.From) : null,
  );
  const [date2, setDate2] = useState(() =>
    experience?.To ? new Date(experience.To) : null,
  );
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  const toggleCheckbox = () => {
    setIsChecked(prevIsChecked => !prevIsChecked);
  };

  const onChange1 = selectedDate => {
    const currentDate = selectedDate || date1;
    setShow1(Platform.OS === 'ios');
    setDate1(currentDate);
  };
  const onChange2 = selectedDate => {
    const currentDate = selectedDate || date2;
    setShow2(Platform.OS === 'ios');
    setDate2(currentDate);
  };

  const showDatepicker = value => {
    if (value === 1) {
      setShow1(true);
    } else {
      setShow2(true);
    }
  };

  const experienceHandler = data => {
    if (date1 == null || date2 == null) {
      setIsLoading(false);
      setDateErr(true);
    }
    if (date1 != null && (date2 != null || isChecked)) {
      const payload = {
        role: data.role,
        Company_name: data.company,
        From: date1.toISOString(),
        City: data.city,
        State: data.state,
      };
      if (!isChecked) payload['To'] = date2.toISOString();
      if (data.description) payload['Description'] = data.description;
      if (experience) {
        console.log(
          'experienceHandler function, method:put, url:${backend_url}/profiles/experience/${experience.Exp_id}, payload:',
          payload,
        );
      } else {
        console.log(
          'experienceHandler function, method:post, url:${backend_url}/profiles/experience:payload',
          payload,
        );
      }
    }
  };

  const deleteHanlder = () => {
    console.log(
      'deleteHandler function, method:delete, url:${backend_url}/profiles/experience/${experience.Exp_id}',
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <Ionicons
            name="arrow-back"
            size={normalize(24)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>
          {experience ? 'Edit Experience' : 'Add Experience'}
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(experienceHandler)}
          activeOpacity={0.5}>
          <Ionicons
            name="save"
            size={normalize(24)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
      {isLoading ? <Loader /> : null}
      <View style={[styles.body, {opacity: isLoading ? 0.25 : 1}]}>
        <Controller
          control={control}
          name="company"
          defaultValue={experience ? experience.Company_name : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Company"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 50,
          }}
        />
        {errors.company && errors.company.type === 'required' && (
          <Text style={styles.errorText}>Company Field is required.</Text>
        )}
        {errors.company && errors.company.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Company should consists maximum of 50 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="role"
          defaultValue={experience ? experience.role : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Role"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 40,
          }}
        />
        {errors.role && errors.role.type === 'required' && (
          <Text style={styles.errorText}>Role Field is required.</Text>
        )}
        {errors.role && errors.role.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Role should consists maximum of 40 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="city"
          defaultValue={experience ? experience.City : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="City"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
          }}
        />
        {errors.city && errors.city.type === 'required' && (
          <Text style={styles.errorText}>City Field is required.</Text>
        )}
        <Controller
          control={control}
          name="state"
          defaultValue={experience ? experience.State : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="State"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
          }}
        />
        {errors.state && errors.state.type === 'required' && (
          <Text style={styles.errorText}>State Field is required.</Text>
        )}
        <View style={styles.termsRow}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={toggleCheckbox}
            activeOpacity={0.5}>
            {isChecked ? (
              <Ionicons
                name="checkmark"
                size={normalize(15)}
                color={theme.colors.primary}
              />
            ) : null}
          </TouchableOpacity>
          <View style={styles.textRow}>
            <Text style={styles.checkBoxText}>
              I'm currently work in this role
            </Text>
          </View>
        </View>
        <View style={styles.yearRow}>
          <View style={styles.yearField}>
            <Text
              style={[styles.inputField, styles.projectDuration]}
              onPress={() => showDatepicker(1)}>
              {date1 != null ? (
                `${
                  date1.getDate().toString().length === 1
                    ? '0' + date1.getDate()
                    : date1.getDate()
                } - ${
                  (date1.getMonth() + 1).toString().length === 1
                    ? '0' + (date1.getMonth() + 1)
                    : date1.getMonth() + 1
                } - ${date1.getFullYear()}`
              ) : (
                <Text style={styles.projectDurationPlaceholder}>
                  Start Year
                </Text>
              )}
            </Text>
            {show1 && (
              <DatePicker
                modal={true}
                open={show1}
                date={date1 ? date1 : new Date()}
                mode="date"
                format="DD/MM/YYYY"
                androidVariant="nativeAndroid"
                value={date1}
                onConfirm={onChange1}
                onCancel={onChange1}
                maximumDate={new Date()}
              />
            )}
            {dateErr && date1 == null ? (
              <Text style={styles.errorText}>Start Year Field is required</Text>
            ) : null}
          </View>
          <View style={styles.yearField}>
            {isChecked ? (
              <Text style={[styles.inputField, styles.projectDuration]}>
                Present
              </Text>
            ) : (
              <Text
                style={[styles.inputField, styles.projectDuration]}
                onPress={() => showDatepicker(2)}>
                {date2 != null ? (
                  `${
                    date2.getDate().toString().length === 1
                      ? '0' + date2.getDate()
                      : date2.getDate()
                  } - ${
                    (date2.getMonth() + 1).toString().length === 1
                      ? '0' + (date2.getMonth() + 1)
                      : date2.getMonth() + 1
                  } - ${date2.getFullYear()}`
                ) : (
                  <Text style={styles.projectDurationPlaceholder}>
                    Final Year
                  </Text>
                )}
              </Text>
            )}
            {show2 && (
              <DatePicker
                modal={true}
                open={show2}
                date={date2 ? date2 : new Date()}
                mode="date"
                format="DD/MM/YYYY"
                androidVariant="nativeAndroid"
                value={date2}
                onConfirm={onChange2}
                onCancel={onChange2}
                maximumDate={new Date()}
              />
            )}
            {dateErr && date2 == null && !isChecked ? (
              <Text style={styles.errorText}>Final Year Field is required</Text>
            ) : null}
          </View>
        </View>
        <Controller
          control={control}
          name="description"
          defaultValue={experience ? experience.Description : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <Textarea
              containerStyle={styles.initialBody}
              style={styles.textarea}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'Description'}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            maxLength: 500,
          }}
        />
        {errors.description && errors.description.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Description should consists maximum of 500 characters.
          </Text>
        )}
        {experience ? (
          <Text style={styles.deleteButton} onPress={deleteHanlder}>
            Delete this experience
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.red,
  },
  projectDurationPlaceholder: {
    color: theme.colors.placeholdercolor,
  },
  projectDuration: {
    paddingTop: normalize(theme.spacing.medium),
  },
  checkBoxText: {
    fontSize: 16,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  profileHeader: {
    height: normalize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingHorizontal: normalize(theme.spacing.large),
  },
  profileTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
  },
  inputField: {
    width: '100%',
    height: normalize(50),
    marginBottom: normalize(theme.spacing.large),
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.white,
    fontSize: normalize(theme.fontSizes.medium),
  },
  body: {
    padding: normalize(theme.spacing.large),
  },
  yearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearField: {
    width: '49%',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    fontSize: 16,
    color: theme.colors.black,
  },
  initialBody: {
    paddingVertical: 5,
    borderColor: theme.colors.primary,
    marginBottom: normalize(theme.spacing.small),
    borderBottomWidth: 1,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(theme.spacing.small),
  },
  textRow: {
    flexDirection: 'row',
    marginLeft: normalize(theme.spacing.small),
  },
  checkbox: {
    width: normalize(20),
    height: normalize(20),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    color: theme.colors.red,
    alignSelf: 'center',
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.small),
  },
});

export default EditExperience;
