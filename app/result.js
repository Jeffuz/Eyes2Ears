import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { app, storage, db } from '../firebaseConfig';

const result = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { description, photo } = route.params;
  // console.log(photo);

  const handleSaveScan = async () => {
    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${Date.now()}.jpg`);
      const response = await fetch(photo);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      // Save description and image URL to Firestore
      const docRef = doc(db, "scans", `${Date.now()}`);
      await setDoc(docRef, {
        description: description,
        imageUrl: downloadURL,
        timestamp: Date.now()
      });

      // alert('Scan saved successfully!');
    } catch (error) {
      console.error("Error saving scan: ", error);
      // alert('Failed to save scan.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSaveScan}>
        <Text>Save Scan</Text>
      </TouchableOpacity>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('scan')}>
        <Text style={styles.buttonText}>Go Back to Scan</Text>
      </TouchableOpacity>
    </View>
  );
};


export default result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    height: 50,
    width: '80%',
    backgroundColor: '#3D50E7', // blue background color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
