import { CameraView, useCameraPermissions} from "expo-camera";
import { useState, useRef } from "react";
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
import { router } from "expo-router";

const scan = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [imagePreview, setImagePreview] = useState(false);
  const [imageResult, setImageResult] = useState(null);
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
      //   console.log(photo);
      setImageResult(photo);
    } else {
      console.log("Unable to take photo.");
    }
  };

  const retakePicture = () => {
    setImageResult(null);
    setImagePreview(false);
    router.push('scan');
  }

  const onSwipe = (gestureName) => {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_DOWN, SWIPE_UP } = swipeDirections;
    if (gestureName === SWIPE_LEFT || gestureName === SWIPE_RIGHT) {
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

  return (
    <>
      {imagePreview && imageResult ? (
        <CameraPreview photo={imageResult} retakePicture={retakePicture}/>
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

const CameraPreview = ({photo, retakePicture}) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        >
            <View>
              <TouchableOpacity
                onPress={()=>retakePicture()}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
            </View>
        </ImageBackground>
      </View>
    )
  }