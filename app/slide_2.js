import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const Slide2 = () => {
  const router = useRouter();

  const onSwipeLeft = () => {
    router.push('slide_3');
  };
  
  const onSwipeRight = () => {
    router.push('slide_1'); // or router.push('slide_1') if you want to explicitly navigate to slide_1
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
          <Text style={styles.title}>Welcome22222</Text>
          <Text style={styles.tagline}>We’re here to help you see the world{'\n'}through sound...</Text>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Slide2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'normal',
    marginTop: 120,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 80,
    textAlign: 'center',
  },
});
