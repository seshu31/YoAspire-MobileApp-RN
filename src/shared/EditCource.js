import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
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

const EditCourse = ({navigation, route}) => {
  const course = route.params?.course ? route.params.course : null;
  const [isLoading, setIsLoading] = useState(() => false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [dateErr, setDateErr] = useState(() => false);
  const [courseStartDate, setCourseStartDate] = useState(() =>
    course?.From ? new Date(course.From) : null,
  );
  const [courseEndDate, setCourseEndDate] = useState(() =>
    course?.To ? new Date(course.To) : null,
  );
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const getToken = async () => {
    console.log('get token function');
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  const onChange1 = selectedDate => {
    const currentDate = selectedDate || courseStartDate;
    setShowFromDatePicker(Platform.OS === 'ios');
    setCourseStartDate(currentDate);
  };
  const onChange2 = selectedDate => {
    const currentDate = selectedDate || courseEndDate;
    setShowToDatePicker(Platform.OS === 'ios');
    setCourseEndDate(currentDate);
  };

  const showDatepicker = value => {
    if (value === 1) {
      setShowFromDatePicker(true);
    } else {
      setShowToDatePicker(true);
    }
  };

  const courseHandler = data => {
    if (courseStartDate == null || courseEndDate == null) {
      setIsLoading(false);
      setDateErr(true);
    }

    if (courseStartDate != null && courseEndDate != null) {
      const payload = {
        title: data.title,
        From: courseStartDate.toISOString(),
        To: courseEndDate.toISOString(),
      };
      if (data.description) payload['Description'] = data.description;
      if (course) {
        console.log(
          'courseHandler function, method:put , url:${backend_url}/profiles/courses/${course.Cou_id}, payload:',
          payload,
        );
      } else {
        console.log(
          'courseHandler function, method:post , url:${backend_url}/profiles/courses, payload:',
          payload,
        );
      }
    }
  };

  const deleteHandler = () => {
    console.log(
      'deleteHandler function , method:delete , url:${backend_url}/profiles/courses/${course.Cou_id}',
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
          {course ? 'Edit Course' : 'Add Course'}
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(courseHandler)}
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
          name="title"
          defaultValue={course ? course.title : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Title"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.title && errors.title.type === 'required' && (
          <Text style={styles.errorText}>Title Field is required.</Text>
        )}
        {errors.title && errors.title.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Title should consists maximum of 100 characters.
          </Text>
        )}
        <View style={styles.yearRow}>
          <View style={styles.yearField}>
            <Text
              style={[styles.inputField, styles.projectDuration]}
              onPress={() => showDatepicker(1)}>
              {courseStartDate != null ? (
                `${
                  courseStartDate.getDate().toString().length === 1
                    ? '0' + courseStartDate.getDate()
                    : courseStartDate.getDate()
                } - ${
                  (courseStartDate.getMonth() + 1).toString().length === 1
                    ? '0' + (courseStartDate.getMonth() + 1)
                    : courseStartDate.getMonth() + 1
                } - ${courseStartDate.getFullYear()}`
              ) : (
                <Text style={styles.projectDurationPlaceholder}>
                  Start Year
                </Text>
              )}
            </Text>
            {showFromDatePicker && (
              <DatePicker
                modal={true}
                open={showFromDatePicker}
                date={courseStartDate ? courseStartDate : new Date()}
                format="DD/MM/YYYY"
                mode="date"
                androidVariant="nativeAndroid"
                value={courseStartDate}
                onConfirm={onChange1}
                onCancel={onChange1}
                maximumDate={new Date()}
              />
            )}
            {dateErr && courseStartDate == null ? (
              <Text style={styles.errorText}>Start Year Field is required</Text>
            ) : null}
          </View>
          <View style={styles.yearField}>
            <Text
              style={[styles.inputField, styles.projectDuration]}
              onPress={() => showDatepicker(2)}>
              {courseEndDate != null ? (
                `${
                  courseEndDate.getDate().toString().length === 1
                    ? '0' + courseEndDate.getDate()
                    : courseEndDate.getDate()
                } - ${
                  (courseEndDate.getMonth() + 1).toString().length === 1
                    ? '0' + (courseEndDate.getMonth() + 1)
                    : courseEndDate.getMonth() + 1
                } - ${courseEndDate.getFullYear()}`
              ) : (
                <Text style={styles.projectDurationPlaceholder}>
                  Final Year
                </Text>
              )}
            </Text>
            {showToDatePicker && (
              <DatePicker
                modal={true}
                open={showToDatePicker}
                date={courseEndDate ? courseEndDate : new Date()}
                mode="date"
                format="DD/MM/YYYY"
                androidVariant="nativeAndroid"
                value={courseEndDate}
                onConfirm={onChange2}
                onCancel={onChange2}
                maximumDate={new Date()}
              />
            )}
            {dateErr && courseEndDate == null ? (
              <Text style={styles.errorText}>Final Year Field is required</Text>
            ) : null}
          </View>
        </View>
        <Controller
          control={control}
          name="description"
          defaultValue={course ? course.Description : ''}
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
        {course ? (
          <Text style={styles.deleteButton} onPress={deleteHandler}>
            Delete this course
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
    fontSize: normalize(theme.fontSizes.large),
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
    width: '49%',
  },
  textarea: {
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  initialBody: {
    paddingVertical: normalize(theme.spacing.extraSmall),
    borderColor: theme.colors.primary,
    marginBottom: normalize(theme.spacing.small),
    borderBottomWidth: 1,
  },
  deleteButton: {
    color: theme.colors.red,
    alignSelf: 'center',
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.small),
  },
});
export default EditCourse;
