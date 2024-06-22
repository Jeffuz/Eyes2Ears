import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const name = () => {

  const [userInputName, setUserInputName] = useState("");

  const handleClick = async () => {
    console.log(userInputName);
    const couldStoreUsername = await storeUsername(userInputName);

    if (couldStoreUsername) {
      console.log("Success");
      return;
    }

    console.log("Fail");
  }

  async function storeUsername(userName) { 
    try {
      await AsyncStorage.setItem('userName', userName)
      return true;
    } catch (e) {
      console.log("Error", e.message);
    }
    return false;
  }

  return (
    <View>
      <Text>What is your name?</Text>
      <TextInput placeholder='Enter name here' 
        onChangeText={setUserInputName}
        value={userInputName}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        />

      <Button title="Submit" onPress={handleClick}/>
    </View>
  )
}

export default name

const styles = StyleSheet.create({})