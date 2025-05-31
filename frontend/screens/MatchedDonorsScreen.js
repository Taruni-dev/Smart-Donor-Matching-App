import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function MatchedDonorsScreen({ route }) {
  const { matchedDonors } = route.params; // <-- Get the matchedDonors passed from RequestScreen

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matched Donors</Text>

      {matchedDonors.length === 0 ? (
        <Text style={styles.noMatch}>No matches found.</Text>
      ) : (
        <>
          <Text style={styles.subtitle}>List of Donors:</Text>
          <FlatList
            data={matchedDonors}
            keyExtractor={(item) => item._id || item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text>Name: {item.name}</Text>
                <Text>Blood Type: {item.bloodType}</Text>
                <Text>City: {item.city}</Text>
                <Text>Last Donation Date: {item.lastDonationDate || 'N/A'}</Text>
                <Text>Contact: {item.phone || item.contact || 'N/A'}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20,  },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: {
    borderWidth: 1,
    backgroundColor: '#ffe6e6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderColor: '#ffb3b3',
     
  },
  noMatch: {
    fontSize: 20,
    textAlign: 'center',
    color: 'gray',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20,
    color: 'red', // <-- Add this line
  },
});
