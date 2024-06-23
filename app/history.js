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
  },
  list: {
    flexGrow: 1,
    padding: 10,
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },

  backButton: {
    height: 150,
    backgroundColor: '#3D50E7', // blue background color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -40,
  },
  backButtonText: {
    fontFamily: 'Nunito-Bold',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
