import { CameraView, useCameraPermissions, camera } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { router } from "expo-router";

const scan = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

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
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
    } else {
      console.log("L");
    }
  };

  const onSwipe = (gestureName) => {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_DOWN, SWIPE_UP } = swipeDirections;
    if (gestureName === SWIPE_LEFT || gestureName === SWIPE_RIGHT) {
      toggleCameraFacing();
    }
    if (gestureName === SWIPE_DOWN) {
      router.push("home");
    }
    if (gestureName === SWIPE_UP) {
      takePicture();
    }
  };

  return (
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
