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
  const [date1, setDate1] = useState(() =>
    course.From ? new Date(course.From) : null,
  );
  const [date2, setDate2] = useState(() =>
    course.To ? new Date(course.To) : null,
  );
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const getToken = async () => {
    console.log('get token function');
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      Alert.alert('Something went wrong');
    }
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

  const courseHandler = data => {
    if (date1 == null || date2 == null) {
      setIsLoading(false);
      setDateErr(true);
    }

    if (date1 != null && date2 != null) {
      const payload = {
        title: data.title,
        From: date1.toISOString(),
        To: date2.toISOString(),
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
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>
          {course ? 'Edit Course' : 'Add Course'}
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(courseHandler)}
          activeOpacity={0.5}>
          <Ionicons name="save" size={24} color="#fff" />
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
                <Text style={styles.projectDurationText}>Start Year</Text>
              )}
            </Text>
            {show1 && (
              <DatePicker
                modal={true}
                open={show1}
                date={date1}
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
                <Text style={styles.projectDurationText}>Final Year</Text>
              )}
            </Text>
            {show2 && (
              <DatePicker
                value={date2}
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={onChange2}
                minimumDate={date1}
                maximumDate={new Date()}
              />
            )}
            {dateErr && date2 == null ? (
              <Text style={styles.errorText}>Final Year Field is required</Text>
            ) : null}
          </View>
        </View>
        <Controller
          control={control}
          name="description"
          defaultValue={course ? course.Description : ''}
          render={({onChange, onBlur, value}) => (
            <Textarea
              containerStyle={styles.initialBody}
              style={styles.textarea}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'Description'}
              placeholderTextColor={styles.projectDurationText}
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
  projectDurationText: {
    color: theme.colors.placeholdercolor,
  },
  projectDuration: {
    paddingTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#376eb3',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileTitle: {
    fontSize: 24,
    color: '#fff',
  },
  inputField: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#376eb3',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    fontSize: 16,
    color: 'black',
  },
  body: {
    padding: 20,
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
    color: '#333',
  },
  initialBody: {
    paddingVertical: 5,
    borderColor: '#376eb3',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  deleteButton: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
});
export default EditCourse;
