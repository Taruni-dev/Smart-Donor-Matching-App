import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export default function CustomDrawerContent({ navigation }) {
  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        {/* Drawer Items */}
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.item}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Text style={styles.item}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.item}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.item}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
  },
});
