import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace with actual user ID
  const userId = '683894d41a561910435808dc';  // 👈 Your MongoDB ObjectId

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://192.168.43.114:3000/api/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="red" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!user) {
    return <Text style={styles.error}>User not found.</Text>;
  }

  return (
  <View style={styles.container}>
    <Text style={styles.title}>User Information</Text>
    <Text>Name: {user.name}</Text>
    <Text>Email: {user.email}</Text>
    <Text>Phone Number: {user.phone || 'N/A'}</Text>
    <Text>Location: {user.location || 'N/A'}</Text>
    <Text>Blood Group: {user.bloodGroup || 'N/A'}</Text>
    <Text>Last Donation Date: {user.lastDonationDate ? user.lastDonationDate : 'N/A'}</Text>
  </View>
);

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20, gap: 20 },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20,
    color: 'red',
  },
  error: {
    textAlign: 'center',
    marginTop: 50,
    color: 'red',
    fontSize: 18
  }
});
