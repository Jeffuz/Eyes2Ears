import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

const Home = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const permissionResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );

        console.log(permissionResult);
        if (permissionResult === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const getUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        if (name !== null) {
          setUserName(name);
        }
      } catch (error) {
        console.log("Error retrieving data", error);
      }
    };

    const sayInstructions = () => { 
        if (userName === '')
            return;
        
        const stuffToSay = `Hello ${userName}, please swipe up to use the camera, or swipe down to view past images.`;
        Speech.stop();
        Speech.speak(stuffToSay, {pitch: 0.7});
    }
    requestCameraPermission();
    getUserName();
    sayInstructions();

  }, [userName]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.historyButton}>
        <Text style={styles.buttonText}>History</Text>
      </Pressable>
      <View style={styles.msgcontainer}>
        <Text style={styles.hello}>Hi, {userName}</Text>
        <Text style={styles.welcome}>Welcome to EyestoEars</Text>
      </View>
      <Pressable style={styles.scanButton} onPress={() => router.push("scan")}>
        <Text style={styles.buttonText}>Scan</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  msgcontainer: {
    //backgroundColor: '#000000', // yellow background color
    height: 450,
    justifyContent: 'center',
    paddingHorizontal: 50,

  },
  historyButton: {
    height: 150,
    backgroundColor: '#FFC000', // yellow background color
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  hello: {
    fontFamily: 'Nunito-Bold',
    fontSize: 35,
    fontWeight: 'bold',
    //marginTop: 220,
    //marginHorizontal: 100,
    //textAlign: 'center',
  },
  welcome: {
    fontFamily: 'Nunito-Bold',
    fontSize: 26,
    fontWeight: 'normal',
    //marginVertical: 220,
    //marginHorizontal: 100,
    //textAlign: 'center',
  },
  scanButton: {
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
    fontFamily: 'Nunito-Bold',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
