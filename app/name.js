import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const NameComponent = () => {
  const [userInputName, setUserInputName] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const handleClick = async () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out
      duration: 800, // Duration of the fade
      useNativeDriver: true,
    }).start(async () => {
      // After animation completes, perform the async storage operation
      console.log(userInputName);
      const couldStoreUsername = await storeUsername(userInputName);

      if (couldStoreUsername) {
        console.log("Success");
        navigation.navigate('home');
      } else {
        console.log("Fail");
        setIsButtonDisabled(true);
      }

      // Fade back in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    });
  };

  async function storeUsername(userName) { 
    try {
      await AsyncStorage.setItem('userName', userName);
      return true;
    } catch (e) {
      console.log("Error", e.message);
    }
    return false;
  }

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'PlaywritePL-Regular': require('../assets/fonts/PlaywritePL-Regular.ttf'),
        'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
        'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>What is your name?</Text>
      <TextInput 
        placeholder='Enter name here' 
        onChangeText={setUserInputName}
        value={userInputName}
        style={styles.textInput}
        placeholderTextColor="#fff"
      />
      <TouchableOpacity 
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]} 
        disabled={isButtonDisabled}
        onPress={handleClick}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default NameComponent;


const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 30,
    fontWeight: 'normal',
    marginTop: 90,
    paddingHorizontal: 10,
  },
  textInput: {
    fontFamily: 'Nunito-Bold',
    marginTop: 70,
    height: 450,
    backgroundColor: '#FFC000', // yellow background color
    paddingHorizontal: 10,
    fontSize: 40,
    color: '#000', // text color inside the text input
  },
  button: {
    height: 150,
    backgroundColor: '#3D50E7', // blue background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});