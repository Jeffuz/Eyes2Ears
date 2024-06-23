import { StyleSheet, Text, View, Platform } from "react-native";
import { useState, useEffect } from "react";
import { PermissionsAndroid } from 'react-native';

export default async function RequestMicPermissions() {  
    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
  
    async function startRecording() {
      try {
         console.log(permissionResponse)
        if (permissionResponse.status !== 'granted') {
          console.log('Requesting permission..');
          await requestPermission().then((e) => {
              console.log(e);
          })
          .catch(error => {
            console.log(error);
          });
        }
  
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
  
        console.log('Starting recording..');
        const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        console.log('Recording started');
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
  
    async function stopRecording() {
      console.log('Stopping recording..');
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false,
        }
      );
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
    }
    
    return(
        <View style={styles.container}>
        <Button
            title={recording ? 'Stop Recording' : 'Start Recording'}
            onPress={recording ? stopRecording : startRecording}
        />
        </View>
    )
}