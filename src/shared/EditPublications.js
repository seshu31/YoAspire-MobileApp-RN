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

const EditPublication = ({navigation, route}) => {
  const publication = route.params?.publication
    ? route.params.publication
    : null;

  const [isLoading, setIsLoading] = useState(() => false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [dateErr, setDateErr] = useState(() => false);
  const [date, setDate] = useState(() =>
    publication?.year ? new Date(publication.year) : null,
  );
  const [show, setShow] = useState(false);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      Alert.alert('Something went wrong', 'user token not found');
    }
  };

  const onChange = selectedDate => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setDate(new Date());
    setShow(true);
  };

  const publicationHandler = data => {
    if (date == null) {
      setIsLoading(false);
      setDateErr(true);
    }
    if (date != null) {
      const payload = {
        title: data.title,
        Link: data.link,
        Journal: data.journal,
        Year: date.toISOString(),
      };
      if (publication) {
        console.log(
          'publicationHandler function, method:put, url:${backend_url}/profiles/publications/${publication.Pub_id}, payload:',
          payload,
        );
      }
    }
  };

  const deleteHanlder = () => {
    console.log(
      'deleteHandler function, method:delete, url:${backend_url}/profiles/publications/${publication.Pub_id}',
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <Ionicons name="arrow-back" size={normalize(24)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>
          {publication ? 'Edit Publication' : 'Add Publication'}
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(publicationHandler)}
          activeOpacity={0.5}>
          <Ionicons name="save" size={normalize(24)} color="#fff" />
        </TouchableOpacity>
      </View>
      {isLoading ? <Loader /> : null}
      <View style={[styles.body, {opacity: isLoading ? 0.25 : 1}]}>
        <Controller
          control={control}
          name="title"
          defaultValue={publication ? publication.title : ''}
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
          defaultValue={publication ? publication.Link : ''}
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
        <Controller
          control={control}
          name="journal"
          defaultValue={publication ? publication.Journal : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Journal"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 50,
          }}
        />
        {errors.journal && errors.journal.type === 'required' && (
          <Text style={styles.errorText}>Link Field is required.</Text>
        )}
        {errors.journal && errors.journal.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Link should consists maximum of 50 characters.
          </Text>
        )}
        <View style={styles.yearField}>
          <Text
            style={[styles.inputField, {paddingTop: 15}]}
            onPress={showDatepicker}>
            {date != null ? (
              `${
                date.getDate().toString().length === 1
                  ? '0' + date.getDate()
                  : date.getDate()
              } - ${
                (date.getMonth() + 1).toString().length === 1
                  ? '0' + (date.getMonth() + 1)
                  : date.getMonth() + 1
              } - ${date.getFullYear()}`
            ) : (
              <Text style={styles.projectDurationPlaceholder}>Year</Text>
            )}
          </Text>
          {show && (
            <DatePicker
              modal={true}
              open={show}
              date={date ? date : new Date()}
              mode="date"
              format="DD/MM/YYYY"
              androidVariant="nativeAndroid"
              value={date}
              onConfirm={onChange}
              onCancel={onChange}
              maximumDate={new Date()}
            />
          )}
          {dateErr && date == null ? (
            <Text style={styles.errorText}>Year Field is required</Text>
          ) : null}
        </View>
        <Controller
          control={control}
          name="description"
          defaultValue={publication ? publication.Description : ''}
          render={({onChange, onBlur, value}) => (
            <Textarea
              containerStyle={styles.initialBody}
              style={styles.textarea}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'Description'}
              placeholderTextColor={'#999'}
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
        {publication ? (
          <Text style={styles.deleteButton} onPress={deleteHanlder}>
            Delete this publication
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
    color: theme.colors.black,
  },
  body: {
    padding: 20,
  },
  yearField: {
    width: '100%',
  },
  textarea: {
    textAlignVertical: 'top',
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
export default EditPublication;
