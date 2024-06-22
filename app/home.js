import React, {useEffect} from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { PermissionsAndroid } from 'react-native';
//import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';


const home = () => {

     useEffect(() => {
    //     request(PERMISSIONS.ANDROID.CAMERA)
    //         .then(result => {
    //             switch (result) { 
    //                 case RESULTS.UNAVAILABLE:
    //                     console.log('This feature is not available (on this device / in this context)');
    //                     break;
    //                   case RESULTS.DENIED:
    //                     console.log('The permission has not been requested / is denied but requestable');
    //                     break;
    //                   case RESULTS.LIMITED:
    //                     console.log('The permission is limited: some actions are possible');
    //                     break;
    //                   case RESULTS.GRANTED:
    //                     console.log('The permission is granted');
    //                     break;
    //                   case RESULTS.BLOCKED:
    //                     console.log('The permission is denied and not requestable anymore');
    //                     break;
    //             }
    //         })
    //         .catch((error) => console.error("ERROR", error))
        const requestCameraPermission = async () => {
            try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                title: 'Cool Photo App Camera Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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