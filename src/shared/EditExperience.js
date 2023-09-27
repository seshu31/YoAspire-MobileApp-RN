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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
  const [isChecked, setIsChecked] = useState(
    experience ? (experience.To ? false : true) : false,
  );
  const [dateErr, setDateErr] = useState(false);
  const [experienceFromDate, setExperienceFromDate] = useState(
    experience?.From ? new Date(experience.From) : null,
  );
  const [experienceToDate, setExperienceToDate] = useState(
    experience?.To ? new Date(experience.To) : null,
  );
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

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

  const onFromDateChange = selectedDate => {
    const currentDate = selectedDate || experienceFromDate;
    setShowFromDatePicker(Platform.OS === 'ios');
    setExperienceFromDate(currentDate);
  };
  const onToDateChange = selectedDate => {
    const currentDate = selectedDate || experienceToDate;
    setShowToDatePicker(Platform.OS === 'ios');
    setExperienceToDate(currentDate);
  };

  const showDatepicker = value => {
    if (value === 1) {
      setShowFromDatePicker(true);
    } else {
      setShowToDatePicker(true);
    }
  };

  const experienceHandler = data => {
    if (experienceFromDate == null || experienceToDate == null) {
      setIsLoading(false);
      setDateErr(true);
    }
    if (experienceFromDate != null && (experienceToDate != null || isChecked)) {
      const payload = {
        role: data.role,
        Company_name: data.company,
        From: experienceFromDate.toISOString(),
        City: data.city,
        State: data.state,
      };
      if (!isChecked) payload['To'] = experienceToDate.toISOString();
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
          <MaterialIcons
            name="arrow-back-ios"
            size={normalize(theme.iconSizes.mediumLarge)}
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
            name="save-outline"
            size={normalize(theme.iconSizes.mediumLarge)}
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
              placeholder="Company*"
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
          defaultValue={experience ? experience.Role : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Role*"
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
              placeholder="City*"
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
              placeholder="State*"
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
                size={normalize(theme.iconSizes.extraSmall)}
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
              {experienceFromDate != null ? (
                `${
                  experienceFromDate.getDate().toString().length === 1
                    ? '0' + experienceFromDate.getDate()
                    : experienceFromDate.getDate()
                } - ${
                  (experienceFromDate.getMonth() + 1).toString().length === 1
                    ? '0' + (experienceFromDate.getMonth() + 1)
                    : experienceFromDate.getMonth() + 1
                } - ${experienceFromDate.getFullYear()}`
              ) : (
                <Text style={styles.projectDurationPlaceholder}>
                  Start Date*
                </Text>
              )}
            </Text>
            {showFromDatePicker && (
              <DatePicker
                modal={true}
                open={showFromDatePicker}
                date={experienceFromDate ? experienceFromDate : new Date()}
                mode="date"
                format="DD/MM/YYYY"
                androidVariant="nativeAndroid"
                value={experienceFromDate}
                onConfirm={onFromDateChange}
                onCancel={onFromDateChange}
                maximumDate={new Date()}
              />
            )}
            {dateErr && experienceFromDate == null ? (
              <Text style={styles.errorText}>Start Date Field is required</Text>
            ) : null}
          </View>
          <Text style={styles.hyphen}>-</Text>
          <View style={styles.yearField}>
            {isChecked ? (
              <Text style={[styles.inputField, styles.projectDuration]}>
                Present
              </Text>
            ) : (
              <Text
                style={[styles.inputField, styles.projectDuration]}
                onPress={() => showDatepicker(2)}>
                {experienceToDate != null ? (
                  `${
                    experienceToDate.getDate().toString().length === 1
                      ? '0' + experienceToDate.getDate()
                      : experienceToDate.getDate()
                  } - ${
                    (experienceToDate.getMonth() + 1).toString().length === 1
                      ? '0' + (experienceToDate.getMonth() + 1)
                      : experienceToDate.getMonth() + 1
                  } - ${experienceToDate.getFullYear()}`
                ) : (
                  <Text style={styles.projectDurationPlaceholder}>
                    Final Date*
                  </Text>
                )}
              </Text>
            )}
            {showToDatePicker && (
              <DatePicker
                modal={true}
                open={showToDatePicker}
                date={experienceToDate ? experienceToDate : new Date()}
                mode="date"
                format="DD/MM/YYYY"
                androidVariant="nativeAndroid"
                value={experienceToDate}
                onConfirm={onToDateChange}
                onCancel={onToDateChange}
                maximumDate={new Date()}
              />
            )}
            {dateErr && experienceToDate == null && !isChecked ? (
              <Text style={styles.errorText}>Final Date Field is required</Text>
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
          <TouchableOpacity
            style={styles.deleteButtonContainer}
            onPress={deleteHanlder}>
            <Text style={styles.deleteButton}>Delete this experience</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    color: theme.colors.white,
    alignSelf: 'center',
    fontSize: normalize(theme.fontSizes.large),
    marginVertical: normalize(theme.spacing.small),
  },
  deleteButtonContainer: {
    backgroundColor: theme.colors.red,
    borderRadius: 6,
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 6,
  },
  errorText: {
    color: theme.colors.red,
  },
  projectDurationPlaceholder: {
    color: theme.colors.placeholdercolor,
  },
  projectDuration: {
    paddingTop: normalize(theme.spacing.medium),
    textAlign: 'center',
  },
  checkBoxText: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
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
    color: theme.colors.black,
  },
  body: {
    padding: normalize(theme.spacing.large),
  },
  yearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearField: {
    width: '46%',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  initialBody: {
    paddingVertical: normalize(theme.spacing.extraSmall),
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
  hyphen: {
    color: theme.colors.black,
    fontSize: normalize(theme.fontSizes.extraLarge),
    marginTop: normalize(theme.spacing.small),
    marginHorizontal: normalize(theme.spacing.small),
  },
});

export default EditExperience;
