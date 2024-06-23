import React, {useState, useEffect} from 'react'
import { Button, Pressable, StyleSheet, Text, View} from "react-native";
import { router } from "expo-router";
import OpenAI from "openai";
import { OPENAPI_KEY } from "@env";
import * as Speech from 'expo-speech';

export default function Home() {
    const [currentDescription, setCurrentDescription] = useState(null);

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
    useEffect(() => {
        const thingToSay = 'Swipe up to take a picture';
        Speech.speak(thingToSay);
    }, [])

    const NEXT_SLIDE = 'scan';
    return (
        <View>
            <Pressable onPress={() => router.push(NEXT_SLIDE)}>
                <View>
                    <Text>You are on home page going to scan page</Text>
                </View>

            </Pressable>
        </View>


    )
}; 

const styles = StyleSheet.create({});
