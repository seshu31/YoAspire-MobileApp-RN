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
  const [publicationDate, setPublicationDate] = useState(() =>
    publication?.date ? new Date(publication.date) : null,
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
    const currentDate = selectedDate || publicationDate;
    setShow(Platform.OS === 'ios');
    setPublicationDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const publicationHandler = data => {
    if (publicationDate == null) {
      setIsLoading(false);
      setDateErr(true);
    }
    if (publicationDate != null) {
      const payload = {
        title: data.title,
        Link: data.link,
        Journal: data.journal,
        Year: publicationDate.toISOString(),
      };
      if (publication) {
        console.log(
          'publicationHandler function, method:put, url:${backend_url}/profiles/publications/${publication.Pub_id}, payload:',
          payload,
        );
      }
    }
  };

  const deleteHandler = () => {
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
          <MaterialIcons
            name="arrow-back-ios"
            size={normalize(theme.iconSizes.mediumLarge)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>
          {publication ? 'Edit Publication' : 'Add Publication'}
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(publicationHandler)}
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
            style={[styles.inputField, styles.projectDuration]}
            onPress={showDatepicker}>
            {publicationDate != null ? (
              `${
                publicationDate.getDate().toString().length === 1
                  ? '0' + publicationDate.getDate()
                  : publicationDate.getDate()
              } - ${
                (publicationDate.getMonth() + 1).toString().length === 1
                  ? '0' + (publicationDate.getMonth() + 1)
                  : publicationDate.getMonth() + 1
              } - ${publicationDate.getFullYear()}`
            ) : (
              <Text style={styles.projectDurationPlaceholder}>Date</Text>
            )}
          </Text>
          {show && (
            <DatePicker
              modal={true}
              open={show}
              date={publicationDate ? publicationDate : new Date()}
              mode="date"
              format="DD/MM/YYYY"
              androidVariant="nativeAndroid"
              onConfirm={onChange}
              onCancel={onChange}
              maximumDate={new Date()}
            />
          )}
          {dateErr && publicationDate == null ? (
            <Text style={styles.errorText}>Date Field is required</Text>
          ) : null}
        </View>
        <Controller
          control={control}
          name="description"
          defaultValue={publication ? publication.Description : ''}
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
        {publication ? (
          <TouchableOpacity
            style={styles.deleteButtonContainer}
            onPress={deleteHandler}>
            <Text style={styles.deleteButton}>Delete this publication</Text>
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
  yearField: {
    width: '100%',
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
});
export default EditPublication;
