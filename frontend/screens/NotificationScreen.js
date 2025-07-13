import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://192.168.248.61:3000/api/notifications/get-notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert('Error', 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handlePress = (donor) => {
    if (!donor) {
      Alert.alert('No donor details available');
      return;
    }
    Alert.alert(
      'Donor Details',
      `Name: ${donor.name || 'N/A'}\nPhone: ${donor.phone || 'N/A'}\nLast Donation Date: ${donor.lastDonation || 'N/A'}`
    );
  };

  // The return MUST be inside the function
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item.donor)}
            disabled={!item.donor}
          >
            <Ionicons name="notifications" size={20} color="red" />
            <Text style={styles.text}> {item.message || 'No message'}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No notifications found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fcecec',
    marginBottom: 10,
  },
  text: { marginLeft: 10 },
});
