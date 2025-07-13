import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function BloodRequestForm() {
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');

  const submitBloodRequest = async () => {
    if (!bloodType || !location) {
      Alert.alert('Error', 'Please enter both blood type and location');
      return;
    }

    try {
      const response = await fetch('192.168.18.61:3000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blood_type: bloodType, location }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Blood request submitted!');
        setBloodType('');
        setLocation('');
      } else {
        Alert.alert('Error', data.message || 'Failed to submit request');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Submit request error:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Blood Type (e.g. B-)"
        value={bloodType}
        onChangeText={setBloodType}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Location (e.g. Vijayawada)"
        value={location}
        onChangeText={setLocation}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Submit Request" onPress={submitBloodRequest} />
    </View>
  );
}
