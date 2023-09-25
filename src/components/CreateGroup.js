import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../reusables/Loader';
import {useForm, Controller} from 'react-hook-form';
import Textarea from 'react-native-textarea';
import {Picker} from '@react-native-picker/picker';
import theme from '../../theme';
import normalize from 'react-native-normalize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';

const CreateGroup = ({navigation, route}) => {
  // Initialize variables and states
  var group = false;
  const [loading, setLoading] = useState(() => false);
  const [photo, setPhoto] = useState(null);
  const [disableGalleryClick, setDisableGalleryClick] = useState(false);
  const [showCameraOptions, setShowCameraOptions] = useState(false);
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
    if (data === '0') {
      console.log('Visibility label: Public');
    } else {
      console.log('Visibility label: Private');
    }
    setVisibility(data);
  };

  // Function to handle image selection
  const imageHandler = async () => {
    console.log('imageHandler');
    setShowCameraOptions(true);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          return true;
        } else {
          console.log('Camera permission denied');
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      console.log('Platform is not Android');
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'storage Permission',
            message: 'App needs external storage permission',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('storage permission granted');
          return true;
        } else {
          console.log('Camera permission denied');
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      console.log('Platform is not Android');
      return true;
    }
    // if (Platform.OS === 'android') {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //       {
    //         title: 'External Storage Write Permission',
    //         message: 'App needs write permission',
    //       },
    //     );
    //     console.log(granted, 'permissions granted');
    //     // If WRITE_EXTERNAL_STORAGE Permission is granted
    //     return granted === PermissionsAndroid.RESULTS.GRANTED;
    //   } catch (err) {
    //     console.log(err);
    //     Alert.alert('Write permission err', err);
    //   }
    //   return false;
    // } else {
    //   return true;
    // }
  };

  const picFromGallery = async () => {
    setLoading(true);
    const options = {
      maxHeight: 500,
      maxWidth: 500,
    };
    let isStoragePermitted = await requestExternalWritePermission();

    if (isStoragePermitted) {
      setLoading(false);
      launchImageLibrary(options, response => {
        console.log(response);
        if (
          response.assets &&
          response.assets.length > 0 &&
          response.assets[0].uri
        ) {
          if (
            response.assets[0].type === 'image/jpeg' ||
            response.assets[0].type === 'image/jpg' ||
            response.assets[0].type === 'image/png'
          ) {
            setShowCameraOptions(false);
            setPhoto(response.assets[0]);
          } else {
            Alert.alert('You should upload only JPG or PNG files');
          }
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          setShowCameraOptions(false);
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert(response.errorMessage);
          setShowCameraOptions(false);
          return;
        }
        setDisableGalleryClick(false);
      });
    } else {
      setLoading(false);
      Alert.alert('You need to give storage permissions');
    }
  };

  const picFromCam = async () => {
    const options = {
      maxWidth: 500,
      maxHeight: 500,
    };

    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (
          response.assets &&
          response.assets.length > 0 &&
          response.assets[0].uri
        ) {
          setShowCameraOptions(false);
          setPhoto(response.assets[0]);
        } else if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          setShowCameraOptions(false);
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          setShowCameraOptions(false);
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          setShowCameraOptions(false);
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert(response.errorMessage);
          setShowCameraOptions(false);
          return;
        }
      });
    } else {
      Alert.alert('You need to give camera and storage permissions');
      setShowCameraOptions(false);
    }
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
              <MaterialIcons
                name="arrow-back-ios"
                size={normalize(26)}
                color={theme.colors.primary}
              />
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
      {loading ? <Loader /> : null}
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
              <AntDesign name="edit" size={24} color="#376eb3" />
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
          dropdownIconColor={theme.colors.black}
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
      <Modal
        visible={showCameraOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCameraOptions(false)}>
        <TouchableWithoutFeedback onPress={() => setShowCameraOptions(false)}>
          <View style={styles.cameraOptions}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.chooseOption}>Choose Profile Pic</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowCameraOptions(false)}
                style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
              <View style={styles.editContainer}>
                <TouchableOpacity onPress={picFromCam} style={styles.option}>
                  <View style={styles.iconWithText}>
                    <FontAwesome name="camera" size={24} color="#376eb3" />
                  </View>
                  <Text style={styles.optionText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={picFromGallery}
                  style={styles.option}>
                  <View style={styles.iconWithText}>
                    <FontAwesome name="image" size={24} color="#376eb3" />
                  </View>
                  <Text style={styles.optionText}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={picFromGallery}
                  style={styles.option}>
                  <View style={styles.iconWithText}>
                    <MaterialIcons name="delete" size={24} color="#376eb3" />
                  </View>
                  <Text style={styles.optionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    paddingHorizontal: normalize(theme.spacing.large),
  },
  title: {
    fontSize: normalize(theme.fontSizes.large),
    paddingLeft: '10%',
    color: theme.colors.level2,
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
    color: theme.colors.level2,
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
  photoEdit: {
    position: 'absolute',
    right: normalize(-8),
    bottom: normalize(25),
    backgroundColor: theme.colors.white,
    elevation: normalize(5),
    borderRadius: normalize(50),
    padding: normalize(8),
  },
  textareaContainer: {
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.grey,
  },
  textareaField: {
    textAlignVertical: 'top',
    paddingVertical: normalize(theme.spacing.small),
    fontSize: normalize(theme.fontSizes.mediumLarge),
    color: theme.colors.black,
  },
  dropdownLabel: {
    paddingTop: '5%',
    fontSize: normalize(theme.fontSizes.small),
    color: theme.colors.level2,
  },
  picker: {
    marginLeft: '-2%',
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.grey,
    color: theme.colors.black,
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
  cameraOptions: {
    flex: 1,
    backgroundColor: theme.colors.darkgrey,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.85,
  },
  option: {
    alignItems: 'center',
    marginVertical: normalize(theme.spacing.small),
  },
  optionText: {
    color: theme.colors.primary,
    fontSize: normalize(theme.fontSizes.mediumLarge),
  },
  deleteButton: {
    position: 'absolute',
    top: normalize(theme.spacing.large),
    right: normalize(theme.spacing.large),
  },
  closeButton: {
    position: 'absolute',
    top: normalize(theme.spacing.large),
    right: normalize(theme.spacing.large),
  },
  modalView: {
    backgroundColor: theme.colors.white,
    borderRadius: normalize(theme.spacing.large),
    paddingVertical: normalize(30),
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '80%',
  },
  iconWithText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderWidth: normalize(4),
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(18),
    borderRadius: normalize(100),
    marginVertical: normalize(theme.spacing.small),
    width: '100%',
  },
  deleteOption: {
    alignItems: 'center',
    marginVertical: normalize(theme.spacing.small),
    flexDirection: 'column',
  },
  chooseOption: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    fontWeight: 'bold',
    color: theme.colors.level2,
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

export default CreateGroup;
