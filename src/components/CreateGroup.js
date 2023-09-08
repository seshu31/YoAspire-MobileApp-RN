import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../reusables/Loader';
import {useForm, Controller} from 'react-hook-form';
import Textarea from 'react-native-textarea';
import {Picker} from '@react-native-picker/picker';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const CreateGroup = ({navigation, route}) => {
  // Initialize variables and states
  var group = false;
  const [loading, setLoading] = useState(() => false);
  const [image, setImage] = useState(() => (group ? group.image : null));
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [visibility, setVisibility] = useState(() =>
    group ? group.group_type.toString() : 0,
  );

  // Function to handle visibility change
  const handeleVisibility = data => {
    setVisibility(data);
  };

  // Function to handle image selection
  const imageHandler = async () => {
    console.log('imageHandler');
  };

  // Function to handle group deletion confirmation dialog
  const dialogHandler = () =>
    Alert.alert(
      'Are you sure?',
      'You want to delete this group',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: deleteHandler},
      ],
      {cancelable: false},
    );

  // Function to handle group deletion
  const deleteHandler = () => {
    console.log('deleteHandler');
  };

  // Function to handle form submission
  const handleSubmitPost = data => {
    console.log('handleSubmitPost', data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {group ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.5}>
              <Ionicons name="arrow-back" size={32} color="#376eb3" />
            </TouchableOpacity>
            <Text style={styles.title}>Edit Group </Text>
            <Text
              style={styles.postButton}
              onPress={handleSubmit(handleSubmitPost)}>
              Save
            </Text>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.5}>
              <Ionicons name="arrow-back" size={32} color="#376eb3" />
            </TouchableOpacity>
            <Text style={styles.title}>Create New Group </Text>
            <Text
              style={styles.postButton}
              onPress={handleSubmit(handleSubmitPost)}>
              Create
            </Text>
          </>
        )}
      </View>
      {/* <Loader /> */}
      <View style={[styles.postForm, {opacity: loading ? 0.25 : 1}]}>
        <View style={styles.photoSection}>
          <Text style={styles.photoText}>Group Photo</Text>
          <View style={styles.photoDiv}>
            <Image
              style={styles.photo}
              source={image ? {uri: image} : require('../../assets/male.png')}
            />
            <TouchableOpacity
              onPress={imageHandler}
              style={styles.photoEdit}
              activeOpacity={0.5}>
              <Ionicons name="create" size={18} color="#376eb3" />
            </TouchableOpacity>
          </View>
        </View>
        <Controller
          control={control}
          name="name"
          defaultValue={group ? group.name : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="name"
              style={[styles.textField, {marginTop: 0}]}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 50,
          }}
        />
        {errors.name && errors.name.type === 'required' && (
          <Text style={styles.textFieldError}>Title field is required.</Text>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <Text style={styles.textFieldError}>
            Title should consists maximum of 50 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="description"
          defaultValue={group ? group.description : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textareaField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'Say Something'}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 500,
          }}
        />
        {errors.description && errors.description.type === 'required' && (
          <Text style={styles.textFieldError}>
            Description field is required.
          </Text>
        )}
        {errors.description && errors.description.type === 'maxLength' && (
          <Text style={styles.textFieldError}>
            Description should consists maximum of 500 characters.
          </Text>
        )}
        <Text style={styles.dropdownLabel}>Visibility</Text>
        <Picker
          selectedValue={visibility}
          onValueChange={handeleVisibility}
          prompt="Visibility Status"
          style={styles.picker}>
          <Picker.Item label="Public" value="0" />
          <Picker.Item label="Private" value="1" />
        </Picker>
        {group ? (
          <TouchableOpacity onPress={dialogHandler} activeOpacity={0.5}>
            <Text style={styles.groupDelete}>Delete the Group</Text>
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
  header: {
    borderBottomWidth: normalize(3),
    height: normalize(50),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.border,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: normalize(theme.fontSizes.large),
    paddingLeft: '10%',
  },
  postButton: {
    color: theme.colors.primary,
    fontSize: normalize(theme.fontSizes.large),
  },
  postForm: {
    paddingHorizontal: '5%',
  },

  photoSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(theme.spacing.small),
  },
  photoText: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.small),
  },
  photo: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    borderWidth: normalize(5),
    borderColor: theme.colors.primary,
    marginVertical: normalize(theme.spacing.small),
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
    right: normalize(-8),
    bottom: normalize(25),
    backgroundColor: theme.colors.white,
    elevation: normalize(5),
    borderRadius: normalize(50),
    paddingLeft: normalize(theme.spacing.small),
    paddingRight: normalize(8),
    paddingVertical: normalize(8),
  },
  textareaContainer: {
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.grey,
  },
  textareaField: {
    textAlignVertical: 'top', // hack android
    paddingVertical: normalize(theme.spacing.small),
    fontSize: normalize(theme.fontSizes.mediumLarge),
    color: theme.colors.black,
  },
  dropdownLabel: {
    paddingTop: '5%',
    fontSize: normalize(theme.fontSizes.small),
  },
  picker: {
    marginLeft: '-2%',
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.grey,
  },
  textField: {
    marginTop: '3%',
    paddingVertical: normalize(theme.spacing.small),
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.grey,
    fontSize: normalize(theme.fontSizes.medium),
  },
  groupDelete: {
    color: theme.colors.red,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    alignSelf: 'center',
    marginVertical: normalize(11),
  },
  textFieldError: {
    color: theme.colors.red,
  },
});

export default CreateGroup;
