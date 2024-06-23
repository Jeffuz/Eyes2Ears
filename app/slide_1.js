import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import * as Font from 'expo-font';

const slide_1 = () => {
  const router = useRouter();

  const onSwipeLeft = () => {
    router.push('slide_2');
  };
  
  const onSwipeRight = () => {
    router.push('welcome'); 
  };
  
  const onGestureEvent = (event) => {
    if (event.nativeEvent.translationX < -50) {
      onSwipeLeft();
    } else if (event.nativeEvent.translationX > 50) {
      onSwipeRight();
    }
  };

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

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={styles.container}>
          <Image
            source={require('./images/welcome.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.tagline}>Welcome to Eyes2Ears! This app helps you see the world through sound with real-time audio and text descriptions using advanced AI. 
          </Text>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default slide_1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 24,
  },
  logo: {
    width: 285,
    height: 285,
    marginTop: 50, 
},
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 30,
    fontWeight: 'normal',
    marginTop: 80,
  },
  tagline: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 40,
    textAlign: 'center',
  },
});
