import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../theme';
import normalize from 'react-native-normalize';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CameraOptionsModal = ({showCameraOptions, setShowCameraOptions}) => {
  // const [showCameraOptions, setShowCameraOptions] = useState(showModel);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [disableGalleryClick, setDisableGalleryClick] = useState(false);

  console.log('cameraoptin model', showCameraOptions);
  // Function to handle image selection

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

  const deleteHandler = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Handle the delete action here
            console.log('Delete Pressed');
          },
        },
      ],
      {cancelable: false},
    );
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

  return (
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
              <Ionicons
                name="close"
                size={normalize(theme.iconSizes.medium)}
                color={theme.colors.black}
              />
            </TouchableOpacity>
            <View style={styles.editContainer}>
              <TouchableOpacity onPress={picFromCam} style={styles.option}>
                <View style={styles.iconWithText}>
                  <FontAwesome
                    name="camera"
                    size={normalize(theme.iconSizes.medium)}
                    color={theme.colors.primary}
                  />
                </View>
                <Text style={styles.optionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={picFromGallery} style={styles.option}>
                <View style={styles.iconWithText}>
                  <FontAwesome
                    name="image"
                    size={normalize(theme.iconSizes.medium)}
                    color={theme.colors.primary}
                  />
                </View>
                <Text style={styles.optionText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteHandler} style={styles.option}>
                <View style={styles.iconWithText}>
                  <MaterialIcons
                    name="delete"
                    size={normalize(theme.iconSizes.medium)}
                    color={theme.colors.primary}
                  />
                </View>
                <Text style={styles.optionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    borderWidth: 2,
    paddingVertical: normalize(theme.spacing.medium),
    paddingHorizontal: normalize(theme.spacing.medium),
    borderRadius: normalize(50),
    marginVertical: normalize(theme.spacing.small),
    width: '100%',
  },
  chooseOption: {
    fontSize: normalize(theme.fontSizes.mediumLarge),
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.level2,
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

export default CameraOptionsModal;
