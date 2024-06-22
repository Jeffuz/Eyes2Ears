import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const slide_2 = () => {
  const NEXT_SLIDE = './slide_3';
  return (
    <Pressable onPress={() => router.push(NEXT_SLIDE)}>
    <View>
        <Text>On Slide 2</Text>
        <Text>Press to Go Slide 3</Text>
    </View>
</Pressable>
  )
}

export default slide_2

const styles = StyleSheet.create({})