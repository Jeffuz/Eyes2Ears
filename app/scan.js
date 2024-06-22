import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { router } from 'expo-router';

const scan = () => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();


    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const onSwipe = (gestureName) => {
        const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_DOWN } = swipeDirections;
        if (gestureName === SWIPE_LEFT || gestureName === SWIPE_RIGHT) {
            toggleCameraFacing();
        }
        if (gestureName === SWIPE_DOWN) {
            router.push('home');
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
                <CameraView style={styles.camera} facing={facing}>
                    <View>
                        <TouchableOpacity onPress={toggleCameraFacing} />
                    </View>
                </CameraView>
            </GestureRecognizer>
        </View >
    )
}

export default scan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    }
});