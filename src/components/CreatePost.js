import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Textarea from 'react-native-textarea';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import normalize from 'react-native-normalize';
import theme from '../../theme';
import CameraOptionsModal from '../reusables/CameraOptionsModal';
import backend_url from '../../config';
import DatePicker from 'react-native-date-picker';
import {tokens} from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import Loader from '../reusables/Loader';
import {articlesData} from '../PostProfileData';

const CreatePost = ({handleFetch, handleCreatePost}) => {
  const navigation = useNavigation();
  const route = useRoute();
  var post = false;
  if (route.params && route.params.post) {
    post = route.params.post;
    var dateofevent = new Date(route.params.post.Date_of_Event);
    var timeofevent = new Date(route.params.post.Time_of_Event);
    let [hours, minutes, seconds] = route.params.post.Time_of_Event.split(':');
    dateofevent.setHours(+hours);
    dateofevent.setMinutes(minutes);
    dateofevent.setSeconds(seconds);
  }
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [visibility, setVisibility] = useState(() =>
    post ? post.Visibility : 0,
  );
  const [category, setCategory] = useState(() =>
    post ? post.Category_Type : 'article',
  );
  const [date, setDate] = useState(post ? new Date(dateofevent) : null);
  const [time, setTime] = useState(post ? new Date(timeofevent) : null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(() => (post ? post.Image : null));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateErr, setDateErr] = useState(false);
  const [timeErr, setTimeErr] = useState(false);

  useEffect(() => {
    // handleCreatePost(true);
    const unmount = () => {
      navigation.setParams({group: null, id: null, post: null});
      // handleCreatePost(false);
    };
    return unmount;
  }, []);

  const getToken = async () => {
    try {
      const au = await AsyncStorage.getItem('userToken');
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  const handleSubmitPost = async data => {
    if (date == null || time == null) {
      date == null ? setDateErr(true) : setTimeErr(true);
      setLoading(false);
      return;
    }
    const user_id = await AsyncStorage.getItem('userId');
    setLoading(true);
    let payload = {};
    payload.timestamp = new Date().toISOString();
    payload.description = data.description;
    payload.visibility = visibility;
    payload.category_type = category;
    payload.brief = data.brief;
    payload.heading = data.title;
    payload.by = user_id;

    if (data.brief) {
      payload.brief = data.brief;
    }
    if (data.hashtags) {
      payload.hashtags = [data.hashtags];
    }
    if (category !== 'article') {
      payload.organiser = data.organiser;
      payload.link = data.link;
    }
    if (category === 'job') {
      payload.job_type = data.job_type;
      payload.location = data.location;
    }
    if (image) {
      let filename = image.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      payload.image = {
        uri: image,
        name: filename.slice(-10),
        type,
      };
    }
    if (route.params && route.params.id) {
      payload.groupid = route.params.id;
    }

    getToken().then(token => {
      post
        ? axios
            .put(`${backend_url}/post/${post.PostId}`, payload, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'multipart/form-data',
              },
            })
            .then(response => {
              if (response.data.statuscode === 1) {
                setLoading(false);
                handleFetch();
                navigation.navigate('article', {
                  PostId: post.PostId,
                });
              }
            })
            .catch(err => {
              setLoading(false);
              alert('Something went wrong. Please, Try again');
            })
        : axios
            .post(`${backend_url}/post`, payload, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'multipart/form-data',
              },
            })
            .then(response => {
              if (response.data.statuscode === 1) {
                setLoading(false);
                alert('Post Created Successfully');
                handleFetch();
                route.params && route.params.id
                  ? navigation.navigate('group', {
                      id: route.params.id,
                    })
                  : navigation.navigate('Home');
              }
            })
            .catch(err => {
              setLoading(false);
              alert('Something went wrong. Please, Try again');
            });
    });
  };

  const handeleVisibility = data => {
    setVisibility(data);
  };

  const handleCategory = data => {
    setCategory(data);
  };

  const onDateChange = selectedDate => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onTimeChange = selectedTime => {
    const currentTime = selectedTime || date;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const deleteHandler = () => {
    setLoading(true);
    getToken().then(token => {
      axios
        .delete(`${backend_url}/post/${post.PostId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setLoading(false);
          alert('Post deleted successfully');
          navigation.navigate('Home');
        })
        .catch(err => {
          setLoading(false);
          alert('Something went wrong. Please, Try again');
          navigation.navigate('Home');
        });
    });
  };

  const dialogHandler = () =>
    Alert.alert(
      'Are you sure?',
      'You want to delete this post',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: deleteHandler},
      ],
      {cancelable: false},
    );

  // Function to handle image selection
  const imageHandler = async () => {
    // setShowCameraOptions(true);
    console.log('image handler');
  };

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : null}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <MaterialIcons
            name="arrow-back-ios"
            size={normalize(theme.iconSizes.medium)}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        {post ? (
          <>
            <Text style={styles.title}>Edit Post </Text>
            <Text
              style={styles.postButton}
              onPress={handleSubmit(handleSubmitPost)}>
              Save
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Create New Post </Text>
            <Text
              style={styles.postButton}
              onPress={handleSubmit(handleSubmitPost)}>
              Post
            </Text>
          </>
        )}
      </View>
      <ScrollView contentContainerStyle={[styles.postForm]}>
        {route.params && route.params.group && !post ? (
          <Text style={styles.groupText}>
            You're creating posts in {route.params.group} group
          </Text>
        ) : null}
        {post && post.groupid ? (
          <Text style={styles.groupText}>
            You're editing posts in {post.group_name} group
          </Text>
        ) : null}

        <Controller
          control={control}
          name="description"
          defaultValue={post ? post.Description : ''}
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
          <Text style={styles.errorText}>Description field is required.</Text>
        )}
        {errors.description && errors.description.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Description should consists maximum of 500 characters.
          </Text>
        )}
        <Text style={styles.dropdownLabel}>Visibility</Text>
        <Picker
          selectedValue={visibility}
          onValueChange={handeleVisibility}
          prompt="Visibility Status"
          style={styles.picker}
          dropdownIconColor={theme.colors.black}>
          <Picker.Item label="Public" value="0" />
          <Picker.Item label="Connections" value="1" />
        </Picker>
        <View style={styles.horizontalLine} />
        <Text style={styles.dropdownLabel}>Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={handleCategory}
          prompt="Category"
          style={styles.picker}
          dropdownIconColor={theme.colors.black}>
          <Picker.Item label="Article" value="article" />
          <Picker.Item label="Webinar" value="webinar" />
          <Picker.Item label="Job" value="job" />
        </Picker>
        <View style={styles.horizontalLine} />
        <Controller
          control={control}
          name="title"
          defaultValue={post ? post.Title : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Title"
              style={styles.textField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 30,
          }}
        />
        {errors.title && errors.title.type === 'required' && (
          <Text style={styles.errorText}>Title field is required.</Text>
        )}
        {errors.title && errors.title.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Title should consists maximum of 30 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="brief"
          defaultValue={post ? post.Brief : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Brief"
              style={styles.textField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: category !== 'article' ? true : false,
            maxLength: 50,
          }}
        />
        {errors.brief && errors.brief.type === 'required' && (
          <Text style={styles.errorText}>Brief field is required.</Text>
        )}
        {errors.brief && errors.brief.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Brief should consists maximum of 50 characters.
          </Text>
        )}

        <View style={styles.datePicker}>
          <View style={styles.date}>
            <View style={styles.dateTime}>
              <Text style={styles.dateTimeText}>
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
                  <Text style={styles.placeholderText}>Select Date*</Text>
                )}
              </Text>
              {showDatePicker && (
                <DatePicker
                  modal={true}
                  open={showDatePicker}
                  date={date ? date : new Date()}
                  format="DD/MM/YYYY"
                  mode="date"
                  androidVariant="nativeAndroid"
                  onConfirm={onDateChange}
                  onCancel={onDateChange}
                  minimumDate={new Date()}
                />
              )}
              <TouchableOpacity onPress={showDatepicker} activeOpacity={0.5}>
                <Ionicons
                  name="calendar-outline"
                  size={normalize(theme.iconSizes.large)}
                  color={theme.colors.darkgrey}
                />
              </TouchableOpacity>
            </View>
          </View>
          {dateErr && date == null ? (
            <Text style={styles.errorText}>Date Field is required</Text>
          ) : null}
          <View style={styles.time}>
            <View style={styles.dateTime}>
              <Text style={styles.dateTimeText}>
                {time != null ? (
                  `${
                    time.getHours().toString().length === 1
                      ? '0' + time.getHours()
                      : time.getHours()
                  } : ${
                    time.getMinutes().toString().length === 1
                      ? '0' + time.getMinutes()
                      : time.getMinutes()
                  }`
                ) : (
                  <Text style={styles.placeholderText}>Select Time*</Text>
                )}
              </Text>
              <TouchableOpacity onPress={showTimepicker} activeOpacity={0.5}>
                <Ionicons
                  name="time-outline"
                  size={normalize(theme.iconSizes.large)}
                  color={theme.colors.darkgrey}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {timeErr && time == null ? (
          <Text style={styles.errorText}>Time Field is required</Text>
        ) : null}
        {showTimePicker && (
          <DatePicker
            modal={true}
            open={showTimePicker}
            date={date ? date : new Date()}
            format="DD/MM/YYYY"
            is24hourSource="locale"
            locale={'en_GB'}
            mode="time"
            androidVariant="nativeAndroid"
            onConfirm={onTimeChange}
            onCancel={onTimeChange}
            minimumDate={new Date()}
          />
        )}

        {category !== 'article' ? (
          <Controller
            control={control}
            name="organiser"
            defaultValue={post ? post.Organiser : ''}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Organiser"
                style={[styles.textField, {marginTop: 0}]}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholderTextColor={theme.colors.placeholdercolor}
              />
            )}
            rules={{
              required: true,
              maxLength: 40,
            }}
          />
        ) : null}
        {errors.organiser && errors.organiser.type === 'required' && (
          <Text style={styles.errorText}>Organiser field is required.</Text>
        )}
        {errors.organiser && errors.organiser.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Organiser should consists maximum of 40 characters.
          </Text>
        )}
        {category === 'job' ? (
          <Controller
            control={control}
            name="jobtype"
            defaultValue={post ? post.Job_Type : ''}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Job Type"
                style={styles.textField}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholderTextColor={theme.colors.placeholdercolor}
              />
            )}
            rules={{
              required: true,
              maxLength: 20,
            }}
          />
        ) : null}
        {errors.jobtype && errors.jobtype.type === 'required' && (
          <Text style={styles.errorText}>Job Type field is required.</Text>
        )}
        {errors.jobtype && errors.jobtype.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Job Type should consists maximum of 20 characters.
          </Text>
        )}
        {category === 'job' ? (
          <Controller
            control={control}
            name="location"
            defaultValue={post ? post.Location : ''}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Location"
                style={styles.textField}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholderTextColor={theme.colors.placeholdercolor}
              />
            )}
            rules={{
              required: true,
            }}
          />
        ) : null}
        {errors.location && errors.location.type === 'required' && (
          <Text style={styles.errorText}>Location field is required.</Text>
        )}
        {category !== 'article' ? (
          <Controller
            control={control}
            name="link"
            defaultValue={post ? post.Link : ''}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Link"
                style={styles.textField}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholderTextColor={theme.colors.placeholdercolor}
              />
            )}
            rules={{
              required: true,
              maxLength: 200,
            }}
          />
        ) : null}
        {errors.link && errors.link.type === 'required' && (
          <Text style={styles.errorText}>Link field is required.</Text>
        )}
        {errors.link && errors.link.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Link should consists maximum of 200 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="hashtags"
          defaultValue={post ? post.Hashtags : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Multiple Hash Tags(seperated by comma)"
              style={styles.textField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            maxLength: 100,
          }}
        />
        {errors.hashtags && errors.hashtags.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Hash Tags should consists maximum of 100 characters.
          </Text>
        )}
        {image ? (
          <>
            <Image source={{uri: image}} style={styles.uploadedImage} />
            <TouchableOpacity
              onPress={() => setImage(null)}
              activeOpacity={0.5}>
              <Text style={styles.imageButton}>Remove the image</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => imageHandler()} activeOpacity={0.5}>
            {/* <Text style={styles.imageButton}>Upload an image</Text> */}
          </TouchableOpacity>
        )}
        {post ? (
          <TouchableOpacity onPress={dialogHandler} activeOpacity={0.5}>
            <Text style={styles.deleteButton}>Delete the Post</Text>
          </TouchableOpacity>
        ) : null}
        {/* <CameraOptionsModal
          showCameraOptions={showCameraOptions}
          setShowCameraOptions={setShowCameraOptions}
        /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  date: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: normalize(theme.spacing.small),
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  errorText: {
    color: theme.colors.red,
  },
  placeholderText: {
    color: theme.colors.placeholdercolor,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingBottom: theme.spacing.small,
  },
  header: {
    borderBottomWidth: 1,
    height: normalize(50),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.grey,
    justifyContent: 'space-between',
    paddingHorizontal: normalize(theme.spacing.small),
  },
  title: {
    fontSize: normalize(theme.fontSizes.large),
    paddingLeft: normalize(theme.spacing.large),
    color: theme.colors.primary,
  },
  postButton: {
    backgroundColor: theme.colors.primary,
    fontSize: normalize(theme.fontSizes.large),
    color: theme.colors.white,
    paddingHorizontal: normalize(theme.spacing.small),
    paddingVertical: normalize(theme.spacing.small),
    borderRadius: normalize(theme.spacing.small),
  },
  postForm: {
    flexGrow: 1,
    paddingHorizontal: '5%',
  },
  groupText: {
    color: '#FFA500',
    fontSize: normalize(theme.fontSizes.medium),
    paddingTop: normalize(theme.spacing.medium),
    alignSelf: 'center',
  },
  textareaContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  textareaField: {
    textAlignVertical: 'top',
    paddingVertical: normalize(theme.spacing.small),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  dropdownLabel: {
    paddingTop: normalize(theme.spacing.large),
    fontSize: normalize(theme.fontSizes.small),
    color: theme.colors.primary,
  },
  picker: {
    borderWidth: 1,
    borderColor: theme.colors.red,
    color: theme.colors.black,
  },
  textField: {
    paddingVertical: normalize(theme.spacing.small),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  uploadedImage: {
    backgroundColor: 'red',
    width: normalize(200),
    height: normalize(200),
    marginTop: normalize(theme.spacing.small),
  },
  imageButton: {
    alignSelf: 'center',
    color: theme.colors.primary,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.small),
  },
  deleteButton: {
    alignSelf: 'center',
    color: theme.colors.red,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.large),
  },
  horizontalLine: {
    width: '100%',
    borderTopColor: theme.colors.grey,
    borderTopWidth: 1,
  },
});

export default CreatePost;
