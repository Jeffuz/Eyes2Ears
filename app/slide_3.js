import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const slide_3 = () => {
  const router = useRouter();

  // const onSwipeLeft = () => {
  //   router.push('slide_3');
  // };
  
  const onSwipeRight = () => {
    router.push('slide_2'); 
  };
  
  const onGestureEvent = (event) => {
    if (event.nativeEvent.translationX > 50) {
      onSwipeRight();
    }
  };
  

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={styles.container}>
          <Image
            source={require('./images/getstarted.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Get Started</Text>
          <Text style={styles.tagline}>Point your camera at an object and double tap to take a photo. Swipe to switch cameras. Eyes2Ears will describe what it sees. Use voice commands or touch to interact. </Text>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default slide_3;

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
    fontSize: 30,
    fontWeight: 'normal',
    marginTop: 80,
  },
  tagline: {
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 40,
    textAlign: 'center',
  },
});
