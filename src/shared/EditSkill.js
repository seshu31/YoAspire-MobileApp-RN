import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useForm, Controller} from 'react-hook-form';
import Loader from '../reusables/Loader';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const EditSkill = ({navigation, route}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [skill, setSkill] = useState(
    route.params?.skill ? route.params.skill : null,
  );

  const skillHandler = async data => {
    // setIsLoading(true);
    // getToken().then(async ({userid, token}) => {
    //   skills.map((el, index) => {
    //     if (el === skill) skills[index] = data.skill;
    //     else skills.push(data.skill);
    //   });
    //   const skillArr = [...new Set(skills)];
    //   const response = await axios.put(
    //     `${backend_url}/profiles/${userid}`,
    //     {Skills: skillArr.length ? skillArr.join(',') : data.skill},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-type': 'application/json; charset=UTF-8',
    //       },
    //     },
    //   );
    //   if (response.data.statuscode === 1) {
    //     setIsLoading(false);
    //     navigation.navigate('profile');
    //   } else {
    //     setIsLoading(false);
    //     alert('Something went wrong. Please, Try again');
    //   }
    // });
  };

  const deleteHanlder = async () => {
    const confirmed = await new Promise(resolve => {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this skill?',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => resolve(true),
          },
        ],
        {cancelable: false},
      );
    });
    if (confirmed) {
      console.log('skill deleted');
    } else {
      console.log('skill not deleted');
    }
    // setIsLoading(true);
    // getToken().then(async ({userid, token}) => {
    //   const skillArr = skills.filter(el => el !== skill);
    //   const response = await axios.put(
    //     `${backend_url}/profiles/${userid}`,
    //     {Skills: skillArr.join(',')},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-type': 'application/json; charset=UTF-8',
    //       },
    //     },
    //   );
    //   if (response.data.statuscode === 1) {
    //     setIsLoading(false);
    //     navigation.navigate('profile');
    //   } else {
    //     setIsLoading(false);
    //     alert('Something went wrong. Please, Try again');
    //   }
    // });
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
          {skill ? 'Edit Skill' : 'Add Skill'}
          {/* Edit Skill */}
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(skillHandler)}
          activeOpacity={0.5}>
          <Ionicons
            name="save-outline"
            size={normalize(theme.iconSizes.mediumLarge)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Controller
          control={control}
          name="skill"
          defaultValue={skill}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Skill*"
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 30,
          }}
        />
        {errors.skill && errors.skill.type === 'required' && (
          <Text style={styles.alertText}>Skill Field is required.</Text>
        )}
        {errors.skill && errors.skill.type === 'maxLength' && (
          <Text style={styles.alertText}>
            Skill should consists maximum of 30 characters.
          </Text>
        )}
        {skill ? (
          <TouchableOpacity
            style={styles.deleteButtonContainer}
            onPress={deleteHanlder}>
            <Text style={styles.deleteButton}>Delete this skill</Text>
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
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  profileHeader: {
    height: normalize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(theme.spacing.large),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
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
  deleteButton: {
    color: theme.colors.white,
    alignSelf: 'center',
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.small),
  },
  alertText: {color: theme.colors.red},
});

export default EditSkill;
