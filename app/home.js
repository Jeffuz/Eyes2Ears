import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

const home = () => {
    return (
        <View>
            <Pressable onPress={() => router.push('scan')}>
                <Text>You are on home page going to scan page</Text>
            </Pressable>
        </View>
    )
}

export default home

const styles = StyleSheet.create({})