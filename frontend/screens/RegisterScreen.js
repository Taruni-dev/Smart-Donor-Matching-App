
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [date, setDate] = useState('');

  const handleRegister = async () => {
    // Basic validation example
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
    const response = await axios.post('http://192.168.248.61:3000/api/auth/register', {
      name,
      email,
      password,
      phone,
      location,
      bloodGroup,
      date,
    });
      Alert.alert('Success', response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Registration Failed', error.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Donation Date"
        value={date}
        onChangeText={setDate}
        keyboardType="default"
      />

      <RNPickerSelect
        onValueChange={(value) => setBloodGroup(value)}
        placeholder={{ label: 'Select Blood Group', value: null }}
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
        <Button title="REGISTER" color="red" onPress={handleRegister} />
      </View>

      <View style={styles.bottomText}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginNow}>Log in.</Text>
        </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: '#ffb3b3', 
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginNow: {
    color: 'red',
    fontWeight: 'bold',
  },
});

const pickerStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 15,
    borderColor: '#ffb3b3', 
    backgroundColor: '#f9f9f9',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#e63946',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
};
