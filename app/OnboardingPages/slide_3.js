import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const slide_3 = () => {
  const NEXT_SLIDE = './name';
  return (
    <Pressable onPress={() => router.navigate(NEXT_SLIDE)}>
      <View>
          <Text>On Slide 3</Text>
          <Text>Press to Go user</Text>
      </View>
    </Pressable>
  )
}

export default slide_3

const styles = StyleSheet.create({})