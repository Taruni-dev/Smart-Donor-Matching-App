import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/BloodDrop.png')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.quote}>Connecting donors, saving lives.</Text>
      <View style={styles.buttonContainer}>
        <Button title="LOG IN"  color="red" onPress={() => navigation.navigate('Login')} />
        <View style={{ height: 10 }} />
        <Button title="REGISTER"  color="red" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 30,
    marginTop: 50,
  },
  quote: {
    fontSize: 26,
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '70%',
    gap: 8,
    height: '5%',
  },
  button: {
    backgroundColor: '#e63946',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  
});
