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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../reusables/Loader';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Textarea from 'react-native-textarea';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const EditProject = ({navigation, route}) => {
  const project = route.params.project ? route.params.project : null;
  const [isLoading, setIsLoading] = useState(() => false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [dateErr, setDateErr] = useState(() => false);
  const [projectStartDate, setProjectStartDate] = useState(() =>
    project ? new Date(project.From) : null,
  );
  const [projectEndDate, setprojectEndDate] = useState(() =>
    project ? new Date(project.To) : null,
  );
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const getToken = async () => {
    console.log('get token function');
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      Alert.alert('Something went wrong', 'userToken not found ');
    }
  };

  const onFromDateChange = selectedDate => {
    const currentDate = selectedDate || projectStartDate;
    setShowFromDatePicker(Platform.OS === 'ios');
    setProjectStartDate(currentDate);
  };

  const onToDateChange = selectedDate => {
    const currentDate = selectedDate || projectEndDate;
    setShowToDatePicker(Platform.OS === 'ios');
    setprojectEndDate(currentDate);
  };

  const showDatepicker = value => {
    if (value === 1) {
      setShowFromDatePicker(true);
    } else {
      setShowToDatePicker(true);
    }
  };

  const projectHandler = data => {
    if (projectStartDate == null || projectEndDate == null) {
      setIsLoading(false);
      setDateErr(true);
    }
    getToken();
    const payload = {
      title: data.title,
      Link: data.link,
      From: projectStartDate.toISOString(),
      To: projectEndDate.toISOString(),
    };
    if (data.description) payload['Description'] = data.description;
    if (project) {
      console.log(
        'projectHandler function , method:put, url:${backend_url}/profiles/projects/${project.Pro_id}  , payload:',
        payload,
      );
    } else {
      console.log(
        'projectHandler function , method:post, url:${backend_url}/profiles/projects  , payload:',
        payload,
      );
    }
  };

  const deleteHanlder = () => {
    console.log(
      'deleteHanlder function method:delete , url:${backend_url}/profiles/projects/${project.Pro_id}',
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loader /> : null}
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
          {project ? 'Edit Project' : 'Add Project'}
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(projectHandler)}
          activeOpacity={0.5}>
          <Ionicons
            name="save-outline"
            size={normalize(theme.iconSizes.mediumLarge)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.body, {opacity: isLoading ? 0.25 : 1}]}>
        <Controller
          control={control}
          name="title"
          defaultValue={project?.title}
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
        <Controller
          control={control}
          name="link"
          defaultValue={project ? project.Link : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Link"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 100,
          }}
        />
        {errors.link && errors.link.type === 'required' && (
          <Text style={styles.errorText}>Link Field is required.</Text>
        )}
        {errors.link && errors.link.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Link should consists maximum of 100 characters.
          </Text>
        )}
        <View style={styles.yearRow}>
          <View style={styles.yearField}>
            <Text
              style={[styles.inputField, styles.projectDuration]}
              onPress={() => showDatepicker(1)}>
              {projectStartDate != null ? (
                `${
                  projectStartDate.getDate().toString().length === 1
                    ? '0' + projectStartDate.getDate()
                    : projectStartDate.getDate()
                } - ${
                  (projectStartDate.getMonth() + 1).toString().length === 1
                    ? '0' + (projectStartDate.getMonth() + 1)
                    : projectStartDate.getMonth() + 1
                } - ${projectStartDate.getFullYear()}`
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
                date={projectStartDate ? projectStartDate : new Date()}
                format="DD/MM/YYYY"
                mode="date"
                androidVariant="nativeAndroid"
                onConfirm={onFromDateChange}
                onCancel={onFromDateChange}
                maximumDate={new Date()}
              />
            )}
            {dateErr && projectStartDate == null ? (
              <Text style={styles.errorText}>Start Date Field is required</Text>
            ) : null}
          </View>
          <Text style={styles.hyphen}>-</Text>
          <View style={styles.yearField}>
            <Text
              style={[styles.inputField, styles.projectDuration]}
              onPress={() => showDatepicker(2)}>
              {projectEndDate != null ? (
                `${
                  projectEndDate.getDate().toString().length === 1
                    ? '0' + projectEndDate.getDate()
                    : projectEndDate.getDate()
                } - ${
                  (projectEndDate.getMonth() + 1).toString().length === 1
                    ? '0' + (projectEndDate.getMonth() + 1)
                    : projectEndDate.getMonth() + 1
                } - ${projectEndDate.getFullYear()}`
              ) : (
                <Text style={styles.projectDurationPlaceholder}>
                  Final Date
                </Text>
              )}
            </Text>
            {showToDatePicker && (
              <DatePicker
                modal={true}
                open={showToDatePicker}
                date={projectEndDate ? projectEndDate : new Date()}
                mode="date"
                format="DD/MM/YYYY"
                androidVariant="nativeAndroid"
                onConfirm={onToDateChange}
                onCancel={onToDateChange}
                maximumDate={new Date()}
              />
            )}
            {dateErr && projectEndDate == null ? (
              <Text style={styles.errorText}>Final Date Field is required</Text>
            ) : null}
          </View>
        </View>
        <Controller
          control={control}
          name="description"
          defaultValue={project ? project.Description : ''}
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
        {project ? (
          <TouchableOpacity
            onPress={deleteHanlder}
            style={styles.deleteButtonContainer}>
            <Text style={styles.deleteButton} onPress={deleteHanlder}>
              Delete this project
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  projectDuration: {
    paddingTop: normalize(theme.spacing.medium),
    textAlign: 'center',
  },
  projectDurationText: {
    color: theme.colors.placeholdercolor,
  },
  projectDurationPlaceholder: {
    color: theme.colors.placeholdercolor,
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
    paddingHorizontal: normalize(theme.spacing.medium),
  },
  profileTitle: {
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.white,
  },
  inputField: {
    width: '100%',
    height: normalize(50),
    marginBottom: theme.spacing.large,
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
    textAlignVertical: 'top',
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  initialBody: {
    paddingVertical: normalize(theme.spacing.extraSmall),
    borderColor: theme.colors.primary,
    marginBottom: normalize(theme.spacing.small),
    borderBottomWidth: 1,
  },
  deleteButton: {
    color: theme.colors.white,
    alignSelf: 'center',
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.small),
  },
  hyphen: {
    color: theme.colors.black,
    fontSize: normalize(theme.fontSizes.extraLarge),
    marginTop: normalize(theme.spacing.small),
    marginHorizontal: normalize(theme.spacing.small),
  },
});

export default EditProject;
