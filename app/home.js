import React, {useEffect} from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { PermissionsAndroid } from 'react-native';


const home = () => {

     useEffect(() => {
        const requestCameraPermission = async () => {
            try {
            const permissionResult = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
            );

            console.log(permissionResult)
            if (permissionResult === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
            } catch (err) {
            console.warn(err);
            }
        };
        requestCameraPermission();
    }, [])
    
    const NEXT_SLIDE = 'scan';
    return (
        <Pressable onPress={() => router.push(NEXT_SLIDE)}>
            <View>
                <Text>You are on home page going to scan page</Text>
            </View>
        </Pressable>
    )
}

export default home

const styles = StyleSheet.create({})