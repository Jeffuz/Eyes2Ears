import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { router } from "expo-router";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { useNavigation } from '@react-navigation/native';
// import OpenAI from "openai";
import { OPENAPI_KEY } from "@env";
import * as Speech from 'expo-speech';

const scan = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [imagePreview, setImagePreview] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    Speech.stop();
    const stuffToSay = "Swipe Up to take a picture, Swipe Down to go back, and left or right to change direction of the camera."
    Speech.speak(stuffToSay, {pitch: 0.5})
  }, [])
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
      console.log("Taking picture")
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
        <View style={styles.previewContainer}>
          <CameraPreview photo={imageResult} retakePicture={retakePicture} />
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <GestureRecognizer
            onSwipe={(direction) => onSwipe(direction)}
            style={{
              flex: 1,
            }}
          >
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
              <TouchableOpacity
                onPress={() => {
                  toggleCameraFacing();
                }}
              />
            </CameraView>
          </GestureRecognizer>
        </View>
      )}
    </>
  );
};

const CameraPreview = ({ photo, retakePicture }) => {
  return (
    <View style={styles.previewContainer}>
      <ImageBackground source={{ uri: photo && photo.uri }} style={styles.imageBackground}>
        {/* <TouchableOpacity onPress={retakePicture} style={styles.retakeButton}>
          <Text style={styles.retakeButtonText}>Re-take</Text>
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
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
  previewContainer: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retakeButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  retakeButtonText: {
    color: "#000",
    fontSize: 20,
  },
});
