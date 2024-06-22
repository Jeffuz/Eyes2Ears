import React, {useState, useEffect} from 'react'
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import OpenAI from "openai";
import { OPENAPI_KEY } from "@env";
import { PermissionsAndroid } from 'react-native';

const home = () => {
  const [currentDescription, setCurrentDescription] = useState(null);

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
    
    const openai = new OpenAI({
        apiKey: OPENAPI_KEY,
      });
    
    const description = async () => {

        console.log("PRESSED ", OPENAPI_KEY)
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                {
                    role: "user",
                    content: [
                    { type: "text", text: "Describe whats in the image" },
                    {
                        type: "image_url",
                        image_url: {
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                        },
                    },
                    ],
                    },
                ],
            });
            console.log(response.choices[0].message.content)
        } catch (e) { console.log(e) }
        
    // setCurrentDescription(response.choices[0]);
    };
    
    const NEXT_SLIDE = 'scan';
    return (
        // <Pressable onPress={() => router.push(NEXT_SLIDE)}>
        //     <View>
        //         <Text>You are on home page going to scan page</Text>
        //     </View>

        // </Pressable>
        <Pressable onPress={() => description()}>
          <Text>Set Description</Text>
          <Text>Set Description</Text>
          <Text>Set Description</Text>
          <Text>Set Description</Text>
          <Text>Set Description</Text>
          <Text>Set Description</Text>
        </Pressable>
        
    )

    
}; 

export default home;

const styles = StyleSheet.create({});
