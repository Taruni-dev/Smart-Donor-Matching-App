import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function CampListScreen() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        // IMPORTANT: Replace with your actual IP address
        const response = await axios.get('http://192.168.248.61:3000/api/camps');
        console.log('Fetched Camps:', response.data); // Optional for debug
        setCamps(response.data);
      } catch (error) {
        console.error('Error fetching camps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="red" style={{ marginTop: 50 }} />;

  if (camps.length === 0) return <Text style={styles.noCamps}>No camps found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Donation Camps</Text>
      <FlatList
        data={camps}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.address}, {item.location}</Text>
            <Text>{item.date} | {item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: 'red', marginBottom: 10, textAlign: 'center' },
  card: { backgroundColor: '#ffe6e6', padding: 15, borderRadius: 10, marginBottom: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  noCamps: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
});
