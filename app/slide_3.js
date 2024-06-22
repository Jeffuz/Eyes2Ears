import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const Slide2 = () => {
  const router = useRouter();

  // const onSwipeLeft = () => {
  //   router.push('slide_3');
  // };
  
  const onSwipeRight = () => {
    router.push('slide_2'); 
  };
  
  const onGestureEvent = (event) => {
    // if (event.nativeEvent.translationX < -50) {
    //   onSwipeLeft();
    if (event.nativeEvent.translationX > 50) {
      onSwipeRight();
    }
  };
  

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={styles.container}>
          <Text style={styles.title}>Getting Started</Text>
          <Text style={styles.tagline}>Point your camera at an object and double tap to take a photo. Swipe to filp the camera. 
          Eyes2Ears will describe what it sees. Use voice commands or touch to interact. </Text>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Slide2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'normal',
    marginTop: 120,
  },
  tagline: {
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 80,
    textAlign: 'center',
  },
});
