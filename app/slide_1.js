import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react'
import { router } from 'expo-router';

const slide_1 = () => {
  return (
    //<Pressable onPress={() => router.push('slide_2')}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.tagline}>We’re here to help you see the world{'\n'}through sound...</Text>
      </View>
    //</Pressable> 
  )
}

export default slide_1

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
      fontSize: 36,
      fontWeight: "normal",
      marginTop: 120,
      textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    fontWeight: "normal",
    marginTop: 80,
  },
})