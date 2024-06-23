import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { router } from "expo-router";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { useNavigation } from '@react-navigation/native';
// import OpenAI from "openai";
import { OPENAPI_KEY } from "@env";

const scan = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [imagePreview, setImagePreview] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  // camera
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setImageResult(photo);
      const base64Image = `data:image/jpeg;base64,${photo.base64}`;
      descriptionGen(base64Image, photo);
    } else {
      console.log("Unable to take photo.");
    }
  };

  const retakePicture = () => {
    setImageResult(null);
    setImagePreview(false);
    router.push("scan");
  };

  const onSwipe = (gestureName) => {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_DOWN, SWIPE_UP } = swipeDirections;
    if (gestureName === SWIPE_LEFT || SWIPE_RIGHT) {
      toggleCameraFacing();
    }
    if (gestureName === SWIPE_DOWN) {
      router.push("home");
      setImagePreview(false);
    }
    if (gestureName === SWIPE_UP) {
      takePicture();
      setImagePreview(true);
    }
  };

  const descriptionGen = async (base64Image, photo) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAPI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "Describe this image in under 100 words as if we're having a conversation. Don't include my question, don't respond to me, just give the description." },
                {
                  type: "image_url",
                  image_url: {
                    url: base64Image,
                  },
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      // console.log(data.choices[0].message.content);
      navigation.navigate('result', { description: data.choices[0].message.content, photo: photo.uri });
    } catch (e) {
      console.log('Error:', e);
    }
  };

  return (
    <>
      {imagePreview && imageResult ? (
        <CameraPreview photo={imageResult} retakePicture={retakePicture} />
      ) : (
        <View style={styles.container}>
          <GestureRecognizer
            onSwipe={(direction) => onSwipe(direction)}
            style={{
              flex: 1,
            }}
          >
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
              {/* <Pressable
          onPress={() => {
            takePicture();
          }}
        > */}
              <TouchableOpacity
                onPress={() => {
                  toggleCameraFacing();
                }}
              />
              {/* </Pressable> */}
            </CameraView>
          </GestureRecognizer>
        </View>
      )}
    </>
  );
};

export default scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});

const CameraPreview = ({ photo, retakePicture }) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <View>
          <TouchableOpacity onPress={() => retakePicture()}>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
              }}
            >
              Re-take
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
