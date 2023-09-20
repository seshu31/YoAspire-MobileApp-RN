import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Menu} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../theme';
import normalize from 'react-native-normalize';

const GroupMemberCard = ({
  item,
  navigation,
  owner,
  admin,
  creator,
  // id,
  // fetchHandler,
}) => {
  const [connected, setConnected] = useState(() => false);
  const [visible, setVisible] = useState(() => false);
  const [connectionLevel, setConnectionLevel] = useState(() => 1);

  const profileHandler = UserId => {
    navigation.navigate('profile', {
      userID: UserId,
      user: item,
    });
  };

  const connectionHandler = () => {
    console.log('method: POST, {backend_url}/follow/${item.UserId}');
  };

  const adminHandler = () => {
    console.log(
      'adminHandler, method: DELETE:POST, ${backend_url}/group/${item.admin_flag ? deladmin : addadmin}/${item.UserId}/${id}',
    );
  };

  const removeHandler = () => {
    console.log(
      'removeHandler, method: DELETE, ${backend_url}/group/delmember/${item.UserId}/${id}',
    );
  };

  return (
    <TouchableOpacity
      style={styles.connectionCard}
      onPress={() => profileHandler(item.UserId)}
      activeOpacity={0.5}>
      <View style={styles.detailsSection}>
        <Image
          style={styles.connectionImage}
          source={
            item.img_file_name
              ? {uri: item.img_file_name}
              : require('../../assets/male.png')
          }
        />
        <View style={styles.connectionDetails}>
          <View style={styles.userNameDetails}>
            <Text style={styles.connectionName}>
              {item.First_Name} {item.Last_Name}
            </Text>
            {connectionLevel ? (
              <>
                <Text style={styles.connectionLevel}>
                  {'   '}
                  {'\u2B24'}
                </Text>
                <Text> {connectionLevel}</Text>
              </>
            ) : null}
          </View>
          {creator ? (
            <Text style={styles.connectionTitle}>Creator</Text>
          ) : item.admin_flag ? (
            <Text style={styles.connectionTitle}>Admin</Text>
          ) : null}
          {item.heading ? (
            <Text style={styles.connectionTitle}>{item.heading}</Text>
          ) : null}
        </View>
      </View>
      {owner ? null : (
        <View style={styles.connectSection}>
          {item.flag || connected ? null : (
            <TouchableOpacity
              style={styles.connectIcons}
              onPress={connectionHandler}>
              <Ionicons name="person-add-outline" size={24} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.connectIcons}
            onPress={() =>
              navigation.navigate('chat-section', {
                name: `${item.First_Name} ${item.Last_Name}`,
                id: item.UserId,
              })
            }>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={26}
              color="black"
            />
          </TouchableOpacity>
          {admin && !creator ? (
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <TouchableOpacity
                  style={[styles.connectIcons2]}
                  onPress={() => setVisible(true)}>
                  <MaterialIcons name="more-vert" size={26} color="black" />
                </TouchableOpacity>
              }>
              <Menu.Item
                onPress={adminHandler}
                title={item.admin_flag ? 'Remove Admin' : 'Make Admin'}
              />
              <Menu.Item onPress={removeHandler} title="Kick Out" />
            </Menu>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  connectionCard: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: normalize(11),
  },
  detailsSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '60%',
  },
  connectionImage: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(100),
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.primary,
    borderWidth: normalize(3),
  },
  connectionDetails: {
    paddingLeft: normalize(15),
  },
  userNameDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionName: {
    fontSize: normalize(16),
    color: theme.colors.black,
  },
  connectionTitle: {
    paddingTop: normalize(5),
    fontSize: normalize(15),
    color: theme.colors.darkgrey,
  },
  connectSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: normalize(-10),
  },
  connectIcons: {
    justifyContent: 'space-evenly',
    paddingLeft: normalize(15),
  },
  connectIcons2: {
    justifyContent: 'space-evenly',
    paddingLeft: normalize(15),
    marginLeft: normalize(-8),
  },
  connectionLevel: {
    fontSize: normalize(7),
  },
});

export default GroupMemberCard;
