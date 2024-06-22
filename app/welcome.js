import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

const welcome = () => {
    return (
        <View>
            <Pressable onPress={() => router.push('slide_1')}>
                <Text>You are on welcome page going to slide_1</Text>
            </Pressable>
        </View>
    )
}

export default welcome

const styles = StyleSheet.create({})