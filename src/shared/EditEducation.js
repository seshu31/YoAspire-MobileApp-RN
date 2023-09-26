import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import {useForm, Controller} from 'react-hook-form';
import Loader from '../reusables/Loader';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const EditEducation = ({navigation, route}) => {
  const education = route.params?.education ? route.params.education : null;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(
    education ? (education.To ? false : true) : false,
  );
  const [educationStartDate, setEducationStartDate] = useState(
    education?.From ? new Date(education.From) : null,
  );
  const [educationEndDate, setEducationEndDate] = useState(
    education?.To ? new Date(education.To) : null,
  );
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const onChangeFromDate = selectedDate => {
    const currentDate = selectedDate || educationStartDate;
    setShowFromDatePicker(Platform.OS === 'ios');
    setEducationStartDate(currentDate);
  };
  const onChangeToDate = selectedDate => {
    console.log('experience', selectedDate);
    const currentDate = selectedDate || educationEndDate;
    setShowToDatePicker(Platform.OS === 'ios');
    setEducationEndDate(currentDate);
  };
  const [dateErr, setDateErr] = useState(() => false);

  const educationHandler = data => {
    console.log('educationHandler');
    if (educationStartDate == null || educationEndDate == null) {
      setIsLoading(false);
      setDateErr(true);
    }
  };

  const showDatepicker = value => {
    if (value === 1) {
      setShowFromDatePicker(true);
    } else {
      setShowToDatePicker(true);
    }
  };
  const toggleCheckbox = () => {
    setIsChecked(prevIsChecked => !prevIsChecked);
  };
  const deleteHanlder = () => {
    console.log('deleteHanlder');
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
          {education ? 'Edit Education' : 'Add Education'}
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(educationHandler)}
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
          name="college"
          defaultValue={education ? education.college_name : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Institution"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 50,
          }}
        />
        {errors.college && errors.college.type === 'required' && (
          <Text style={styles.errorText}>Institution Field is required.</Text>
        )}
        {errors.college && errors.college.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Institution should consists maximum of 50 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="degree"
          defaultValue={education ? education.Degree : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Degree"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 50,
          }}
        />
        {errors.degree && errors.degree.type === 'required' && (
          <Text style={styles.errorText}>Degree Field is required.</Text>
        )}
        {errors.degree && errors.degree.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Degree should consists maximum of 50 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="branch"
          defaultValue={education ? education.Branch : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Branch"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 50,
          }}
        />
        {errors.branch && errors.branch.type === 'required' && (
          <Text style={styles.errorText}>Branch Field is required.</Text>
        )}
        {errors.branch && errors.branch.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Branch should consists maximum of 50 characters.
          </Text>
        )}
        <View style={styles.termsRow}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={toggleCheckbox}
            activeOpacity={0.5}>
            {isChecked ? (
              <Ionicons
                style={styles.checkMark}
                name="checkmark"
                size={normalize(theme.iconSizes.extraSmall)}
                color={theme.colors.primary}
              />
            ) : null}
          </TouchableOpacity>
          <View style={styles.textRow}>
            <Text style={styles.checkboxText}>
              I'm currently studying in this institution
            </Text>
          </View>
        </View>
        <View style={styles.yearRow}>
          <View style={styles.yearField}>
            <Text
              style={[styles.yearInputField]}
              onPress={() => showDatepicker(1)}>
              {educationStartDate != null ? (
                `${
                  educationStartDate.getDate().toString().length === 1
                    ? '0' + educationStartDate.getDate()
                    : educationStartDate.getDate()
                } - ${
                  (educationStartDate.getMonth() + 1).toString().length === 1
                    ? '0' + (educationStartDate.getMonth() + 1)
                    : educationStartDate.getMonth() + 1
                } - ${educationStartDate.getFullYear()}`
              ) : (
                <Text style={styles.projectDurationPlaceholder}>
                  Start Date
                </Text>
              )}
            </Text>
            {showFromDatePicker && (
              <DatePicker
                modal={true}
                open={showFromDatePicker}
                date={educationStartDate ? educationStartDate : new Date()}
                format="DD/MM/YYYY"
                mode="date"
                androidVariant="nativeAndroid"
                onConfirm={onChangeFromDate}
                onCancel={onChangeFromDate}
                maximumDate={new Date()}
              />
            )}
            {dateErr && educationStartDate == null ? (
              <Text style={styles.errorText}>Start Date Field is required</Text>
            ) : null}
          </View>
          <Text style={styles.hyphen}>-</Text>
          <View style={styles.yearField}>
            {isChecked ? (
              <Text style={[styles.yearInputField]}>Present</Text>
            ) : (
              <Text
                style={[styles.yearInputField]}
                onPress={() => showDatepicker(2)}>
                {educationEndDate != null ? (
                  `${
                    educationEndDate.getDate().toString().length === 1
                      ? '0' + educationEndDate.getDate()
                      : educationEndDate.getDate()
                  } - ${
                    (educationEndDate.getMonth() + 1).toString().length === 1
                      ? '0' + (educationEndDate.getMonth() + 1)
                      : educationEndDate.getMonth() + 1
                  } - ${educationEndDate.getFullYear()}`
                ) : (
                  <Text style={styles.projectDurationPlaceholder}>
                    Final Date
                  </Text>
                )}
              </Text>
            )}
            {showToDatePicker && (
              <DatePicker
                modal={true}
                open={showToDatePicker}
                date={educationEndDate ? educationEndDate : new Date()}
                mode="date"
                format="DD/MM/YYYY"
                androidVariant="nativeAndroid"
                onConfirm={onChangeToDate}
                onCancel={onChangeToDate}
                maximumDate={new Date()}
              />
            )}
            {dateErr && educationEndDate == null && !isChecked ? (
              <Text style={styles.errorText}>Final Date Field is required</Text>
            ) : null}
          </View>
        </View>

        {education ? (
          <TouchableOpacity
            style={styles.deleteButtonContainer}
            onPress={deleteHanlder}>
            <Text style={styles.deleteButton}>Delete this education</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: normalize(theme.fontSizes.large),
    color: theme.colors.black,
  },
  yearInputField: {
    width: '100%',
    height: normalize(50),
    marginBottom: normalize(theme.spacing.large),
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.white,
    fontSize: normalize(theme.fontSizes.medium),
    paddingTop: normalize(theme.spacing.medium),
    color: theme.colors.black,
    textAlign: 'center',
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
  projectDurationPlaceholder: {
    color: theme.colors.placeholdercolor,
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
    width: normalize(theme.spacing.large),
    height: normalize(theme.spacing.large),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    color: theme.colors.white,
    alignSelf: 'center',
    fontSize: normalize(theme.fontSizes.large),
    marginVertical: normalize(theme.spacing.small),
  },
  deleteButtonContainer: {
    backgroundColor: theme.colors.red,
    borderRadius: 6,
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  errorText: {
    color: theme.colors.red,
  },
  checkboxText: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  hyphen: {
    color: theme.colors.black,
    fontSize: normalize(theme.fontSizes.extraLarge),
    marginTop: normalize(theme.spacing.small),
    marginHorizontal: normalize(theme.spacing.small),
  },
});

export default EditEducation;
