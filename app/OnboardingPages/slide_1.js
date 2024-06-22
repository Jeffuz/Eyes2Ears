import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const slide_1 = () => {
  const NEXT_SLIDE = './slide_2';
  return (
    <Pressable onPress={() => router.push(NEXT_SLIDE)}>
      <View>
          <Text>On Slide 1</Text>
          <Text>Press to Go Slide 2</Text>
      </View>
    </Pressable>
  )
}

export default slide_1

const styles = StyleSheet.create({})