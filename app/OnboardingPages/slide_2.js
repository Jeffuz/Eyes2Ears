import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const slide_2 = () => {
  const NEXT_SLIDE = './OnboardingPages/slide_3';
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