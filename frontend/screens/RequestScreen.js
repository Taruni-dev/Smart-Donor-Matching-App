import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

export default function RequestScreen({ navigation }) {
  const [city, setCity] = useState('');
  const [bloodType, setBloodType] = useState('');

  const handleRequest = async () => {
    if (!city.trim() || !bloodType) {
      alert('Please enter city and select a blood type');
      return;
    }

    try {
      const response = await axios.post('http://192.168.43.114:3000/api/request', {
        city: city.trim(),
        bloodType,
      });

      const matchedDonors = response.data;

      if (matchedDonors.length === 0) {
        alert('No matching donors found');
        return; // Prevent navigation if no donors
      }

      navigation.navigate('MatchedDonorsScreen', { matchedDonors });

    } catch (error) {
      console.error('Request error:', error);
      alert('Something went wrong while fetching donors');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Blood</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={city}
        onChangeText={setCity}
      />

      <RNPickerSelect
        onValueChange={(value) => setBloodType(value)}
        placeholder={{ label: 'Select Blood Type', value: null }}
        items={[
          { label: 'O+', value: 'O+' },
          { label: 'A+', value: 'A+' },
          { label: 'O-', value: 'O-' },
          { label: 'A-', value: 'A-' },
          { label: 'B+', value: 'B+' },
          { label: 'B-', value: 'B-' },
          { label: 'AB+', value: 'AB+' },
          { label: 'AB-', value: 'AB-' },
        ]}
        style={pickerStyles}
      />

      <View style={styles.buttonContainer}>
        <Button title="Request" color="red" onPress={handleRequest} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffb3b3',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#e63946',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
});

const pickerStyles = {
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
};
