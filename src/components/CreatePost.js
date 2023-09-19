import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Textarea from 'react-native-textarea';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import normalize from 'react-native-normalize';
import theme from '../../theme';

const CreatePost = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  var post = false;
  const [category, setCategory] = useState(() =>
    post ? post.Category_Type : 'article',
  );
  const [visibility, setVisibility] = useState(() =>
    post ? post.Visibility : 0,
  );
  const [image, setImage] = useState(() => (post ? post.Image : null));

  const handleSubmitPost = data => {
    console.log(data, visibility, category);
  };

  const handeleVisibility = data => {
    setVisibility(data);
  };

  const handleCategory = data => {
    setCategory(data);
  };

  const deleteHandler = () => {
    // setLoading(true);
    // getToken().then(token => {
    //   axios
    //     .delete(`${backend_url}/post/${post.PostId}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then(response => {
    //       setLoading(false);
    //       alert('Post deleted successfully');
    //       navigation.navigate('Home');
    //     })
    //     .catch(err => {
    //       setLoading(false);
    //       alert('Something went wrong. Please, Try again');
    //       navigation.navigate('Home');
    //     });
    // });
    console.log('deleted');
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <MaterialIcons
            name="arrow-back-ios"
            size={normalize(26)}
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
      <ScrollView
        contentContainerStyle={[
          styles.postForm,
          // {opacity: loading ? 0.25 : 1},
        ]}>
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
              placeholderTextColor={'lightgrey'}
            />
          )}
          rules={{
            required: true,
            maxLength: 500,
          }}
        />
        {errors.description && errors.description.type === 'required' && (
          <Text style={{color: 'red'}}>Description field is required.</Text>
        )}
        {errors.description && errors.description.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
            Description should consists maximum of 500 characters.
          </Text>
        )}
        <Text style={styles.dropdownLabel}>Visibility</Text>
        <Picker
          selectedValue={visibility}
          onValueChange={handeleVisibility}
          prompt="Visibility Status"
          style={styles.picker}
          dropdownIconColor={'#000'}>
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Connections" value="Connections" />
        </Picker>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.dropdownLabel}>Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={handleCategory}
          prompt="Category"
          style={styles.picker}
          dropdownIconColor={'#000'}>
          <Picker.Item label="Article" value="article" />
          <Picker.Item label="Webinar" value="webinar" />
          <Picker.Item label="Job" value="job" />
        </Picker>
        <View style={styles.horizontalLine}></View>
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
              placeholderTextColor={'lightgrey'}
            />
          )}
          rules={{
            required: true,
            maxLength: 30,
          }}
        />
        {errors.title && errors.title.type === 'required' && (
          <Text style={{color: 'red'}}>Title field is required.</Text>
        )}
        {errors.title && errors.title.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
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
              placeholderTextColor={'lightgrey'}
            />
          )}
          rules={{
            required: category !== 'article' ? true : false,
            maxLength: 50,
          }}
        />
        {errors.brief && errors.brief.type === 'required' && (
          <Text style={{color: 'red'}}>Brief field is required.</Text>
        )}
        {errors.brief && errors.brief.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
            Brief should consists maximum of 50 characters.
          </Text>
        )}
        {/* {category !== 'article' ? ( */}
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
              placeholderTextColor={'lightgrey'}
            />
          )}
          rules={{
            required: true,
            maxLength: 200,
          }}
        />
        {/* ) : null} */}
        {errors.link && errors.link.type === 'required' && (
          <Text style={{color: 'red'}}>Link field is required.</Text>
        )}
        {errors.link && errors.link.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
            Link should consists maximum of 200 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="hashtags"
          defaultValue={post ? post.Hashtags : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Multiple Hash Tags should be seperated by comma"
              style={styles.textField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={'lightgrey'}
            />
          )}
          rules={{
            maxLength: 100,
          }}
        />
        {errors.hashtags && errors.hashtags.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
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
          <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
            <Text style={styles.imageButton}>Upload an image</Text>
          </TouchableOpacity>
        )}
        {post ? (
          <TouchableOpacity onPress={dialogHandler} activeOpacity={0.5}>
            <Text style={styles.deleteButton}>Delete the Post</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    borderBottomWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    paddingLeft: '5%',
    color: '#376eb3',
  },
  postButton: {
    backgroundColor: '#376eb3',
    fontSize: 18,
    color: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  postForm: {
    flexGrow: 1,
    paddingHorizontal: '5%',
  },
  groupText: {
    color: 'orange',
    fontSize: 17,
    paddingTop: 15,
    alignSelf: 'center',
  },
  textareaContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textareaField: {
    textAlignVertical: 'top', // hack android
    paddingVertical: 10,
    fontSize: 17,
    color: 'black',
  },
  dropdownLabel: {
    paddingTop: '5%',
    fontSize: 14,
    color: '#376eb3',
  },
  picker: {
    borderWidth: 1,
    borderColor: 'red',
    color: '#000',
  },
  textField: {
    marginTop: '3%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    color: '#000',
  },
  date: {
    marginTop: '7%',
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '5%',
  },
  dateTimeText: {
    fontSize: 16,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  imageButton: {
    alignSelf: 'center',
    color: '#376eb3',
    fontSize: 18,
    marginTop: 20,
  },
  deleteButton: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 18,
    marginVertical: 20,
  },
  horizontalLine: {
    width: '100%',
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
  },
});

export default CreatePost;
