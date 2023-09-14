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
  const [isLoading, setIsLoading] = useState(() => false);
  const [isChecked, setIsChecked] = useState(() =>
    education ? (education.To ? false : true) : false,
  );
  const [educationStartDate, setEducationStartDate] = useState(() =>
    education.From ? new Date(education.From) : null,
  );
  const [educationEndDate, setEducationEndDate] = useState(() =>
    education.To ? new Date(education.To) : null,
  );
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [show2, setShow2] = useState(false);

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || educationStartDate;
    setShowFromDatePicker(Platform.OS === 'ios');
    setEducationStartDate(currentDate);
  };
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || educationEndDate;
    setShow2(Platform.OS === 'ios');
    setEducationEndDate(currentDate);
  };
  const [dateErr, setDateErr] = useState(() => false);

  const educationHandler = data => {
    console.log('educationHandler');
  };
  const showDatepicker = value => {
    if (value === 1) {
      setShowFromDatePicker(true);
    } else {
      setShow2(true);
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
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>
          {education ? 'Edit Education' : 'Edit Education'}
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(educationHandler)}
          activeOpacity={0.5}>
          <Ionicons name="save" size={24} color="#fff" />
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
                size={16}
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
                  Start Year
                </Text>
              )}
            </Text>
            {showFromDatePicker && (
              <DatePicker
                value={educationStartDate}
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={onChange1}
                maximumDate={new Date()}
              />
            )}
            {dateErr && educationStartDate == null ? (
              <Text style={styles.errorText}>Start Year Field is required</Text>
            ) : null}
          </View>
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
                    Final Year
                  </Text>
                )}
              </Text>
            )}
            {show2 && (
              <DatePicker
                value={educationEndDate}
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={onChange2}
                minimumDate={educationStartDate}
                maximumDate={new Date()}
              />
            )}
            {dateErr && educationEndDate == null && !isChecked ? (
              <Text style={styles.errorText}>Final Year Field is required</Text>
            ) : null}
          </View>
        </View>

        {education ? (
          <TouchableOpacity style={styles.deleteButtonContainer}>
            <Text style={styles.deleteButton} onPress={deleteHanlder}>
              Delete this education
            </Text>
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
    paddingHorizontal: normalize(20),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: normalize(24),
    color: theme.colors.white,
  },
  inputField: {
    width: '100%',
    height: normalize(50),
    marginBottom: normalize(theme.spacing.large),
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderBottomWidth: normalize(3),
    backgroundColor: theme.colors.white,
    fontSize: normalize(17),
  },
  yearInputField: {
    width: '100%',
    height: normalize(50),
    marginBottom: normalize(20),
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderBottomWidth: normalize(3),
    backgroundColor: theme.colors.white,
    fontSize: normalize(17),
    paddingTop: normalize(15),
  },
  body: {
    padding: normalize(20),
  },
  yearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearField: {
    width: '49%',
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
    borderWidth: normalize(3),
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
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 6,
  },
  errorText: {
    color: theme.colors.red,
  },
  checkboxText: {
    fontSize: normalize(theme.fontSizes.medium),
  },
});

export default EditEducation;
