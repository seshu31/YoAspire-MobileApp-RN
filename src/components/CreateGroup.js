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

const CreatePost = ({navigation, route}) => {
  const staticGroup = {
    groupid: 1,
    name: 'Sample Group',
    image: null, // Replace with an image URL or null
  };
  var group = false;
  const [loading, setLoading] = useState(() => false);
  const [image, setImage] = useState(() => (group ? group.image : null));
  const {control, handleSubmit, errors} = useForm();
  const [visibility, setVisibility] = useState(() =>
    group ? group.group_type.toString() : 0,
  );

  const handeleVisibility = data => {
    setVisibility(data);
  };

  const imageHandler = async () => {
    console.log('imageHandler');
  };

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

  const deleteHandler = () => {
    console.log('deleteHandler');
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
              // onPress={handleSubmit(handleSubmitPost)}
            >
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
              // onPress={handleSubmit(handleSubmitPost)}
            >
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
          render={({onChange, onBlur, value}) => (
            <TextInput
              placeholder="Name"
              style={[styles.textField, {marginTop: 0}]}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          rules={{
            required: true,
            maxLength: 50,
          }}
        />
        {/* {errors.name && errors.name.type === 'required' && (
          <Text style={{color: 'red'}}>Title field is required.</Text>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
            Title should consists maximum of 50 characters.
          </Text>
        )} */}
        <Controller
          control={control}
          name="description"
          defaultValue={group ? group.description : ''}
          render={({onChange, onBlur, value}) => (
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textareaField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'Say Something'}
              placeholderTextColor={'#c7c7c7'}
            />
          )}
          rules={{
            required: true,
            maxLength: 500,
          }}
        />
        {/* {errors.description && errors.description.type === 'required' && (
          <Text style={{color: 'red'}}>Description field is required.</Text>
        )}
        {errors.description && errors.description.type === 'maxLength' && (
          <Text style={{color: 'red'}}>
            Description should consists maximum of 500 characters.
          </Text>
        )} */}
        <Text style={styles.dropdownLabel}>Visibility</Text>
        <Picker
          // selectedValue={visibility}
          // onValueChange={handeleVisibility}
          prompt="Visibility Status"
          style={styles.picker}>
          <Picker.Item label="Public" value="0" />
          <Picker.Item label="Private" value="1" />
        </Picker>
        <TouchableOpacity onPress={dialogHandler} activeOpacity={0.5}>
          <Text style={styles.groupDelete}>Delete the Group</Text>
        </TouchableOpacity>
        {/* {group ? (
        ) : null} */}
      </View>
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
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 20,
    paddingLeft: '10%',
  },
  postButton: {
    color: '#376eb3',
    fontSize: 20,
  },
  postForm: {
    paddingHorizontal: '5%',
  },

  photoSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  photoText: {
    fontSize: 18,
    marginVertical: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#376eb3',
    marginVertical: 10,
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
    right: -10,
    bottom: 25,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 8,
    paddingVertical: 7,
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
  },
  picker: {
    marginLeft: '-2%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textField: {
    marginTop: '3%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
  },
  groupDelete: {
    color: 'red',
    fontSize: 17,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default CreatePost;
