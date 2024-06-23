import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const result = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { description } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>Save Scan</Text>
      </TouchableOpacity>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('scan')}>
        <Text style={styles.buttonText}>Continue Scan</Text>
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
    marginTop: 40,
    marginBottom: 20,
    padding: 10,
    // textAlign: 'center',
  },
  // button: {
  //   height: 50,
  //   width: '80%',
  //   backgroundColor: '#3D50E7', // blue background color
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10,
  // },
  button: {
    height: 150,
    backgroundColor: '#3D50E7', // blue background color
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -40,
    left: 0,
    right: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
