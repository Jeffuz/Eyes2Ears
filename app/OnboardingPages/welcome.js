import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

const welcome = () => {
    const NEXT_SLIDE = './OnboardingPages/slide_1';
    return (
        <Pressable onPress={() => router.push(NEXT_SLIDE)}>
            <View>
                <Text>You are on welcome page going to slide_1</Text>
            </View>
        </Pressable>
    )
}

export default welcome

const styles = StyleSheet.create({})