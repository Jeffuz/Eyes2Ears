import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import OpenAI from "openai";
import { OPENAPI_KEY } from "@env";

const home = () => {
  const [currentDescription, setCurrentDescription] = useState(null);

  const openai = new OpenAI({
    apiKey: OPENAPI_KEY,
  });

  const description = async () => {
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
    // setCurrentDescription(response.choices[0]);
  };

  return (
    <View>
      <Pressable onPress={() => router.push("scan")}>
        <Text>You are on home page going to scan page</Text>
      </Pressable>
      <Text>.</Text>
      <Text>.</Text>
      <Text>.</Text>
      <Text>.</Text>
      <Text>.</Text>
      <Pressable
        onPress={() => {
          description();
        }}
      >
        <Text>Set Description</Text>
      </Pressable>
      <Text></Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
