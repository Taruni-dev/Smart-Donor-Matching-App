import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // <-- New loading state

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true); // Show spinner

    try {
      const response = await axios.post('http://192.168.43.114:3000/api/auth/login', {
  email,
  password,
});


      Alert.alert('Success', response.data.message);
      navigation.navigate('Request');
    } catch (error) {
  console.error('Login error:', error);

  if (error.response && error.response.data && error.response.data.message) {
    Alert.alert('Login Failed', error.response.data.message);
  } else {
    Alert.alert('Login Failed', 'An unexpected error occurred. Please try again.');
  }
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/BloodDrop.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.quote}>Smart AI matches blood donors to save lives.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <Button
            title="LOGIN"
            color="red"
            onPress={handleLogin}
          />
        )}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

      <View style={styles.bottomText}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerNow}>Register Now.</Text>
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
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    gap: 10,
    marginTop: 50,
  },
  quote: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffb3b3',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginBottom: 15,
    
    alignItems: 'center',
  },
  forgot: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerNow: {
    color: 'red',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
