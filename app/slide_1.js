import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const Slide1 = () => {
  const router = useRouter();

  const onSwipeLeft = () => {
    router.push('slide_2');
  };
  
  const onSwipeRight = () => {
    router.push('welcome'); // or router.push('slide_1') if you want to explicitly navigate to slide_1
  };
  
  const onGestureEvent = (event) => {
    if (event.nativeEvent.translationX < -50) {
      onSwipeLeft();
    } else if (event.nativeEvent.translationX > 50) {
      onSwipeRight();
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.tagline}>Welcome to Eyes2Ears! This app helps you see the world through sound with real-time audio and text descriptions using advanced AI. 
          </Text>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Slide1;

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
