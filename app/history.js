import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const History = () => {
  const [scans, setScans] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const scansCollection = collection(db, 'scans');
      const scanSnapshot = await getDocs(scansCollection);
      const scanList = scanSnapshot.docs.map(doc => doc.data());
      setScans(scanList);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={scans}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    flexGrow: 1,
    paddingBottom: 80, // Add some padding to avoid overlap with the button
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 10,
  },
  backButton: {
    backgroundColor: '#3D50E7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
