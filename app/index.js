import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from './OnboardingPages/welcome';
import Home from './home';
import Name from './OnboardingPages/name';
export default function Page() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getCurrentUser = async ()  => {
      const currentUser = await AsyncStorage.getItem("userName");

      console.log(currentUser)
      if (currentUser === null) {
        console.log("Fail", "No User LOgged In")
        setIsLoggedIn(false);
        return null;
      }
      
      setIsLoggedIn(true);
      console.log("Success", "User logged in");
      return currentUser;
    }

    getCurrentUser();

  }, [])

  // if(isLoggedIn) {
  //   return (
  //     <View style={styles.container}>
  //       <Home/>
  //     </View>
  //   );
  // } else {
  //   return (
  //     <View style={styles.container}>
  //       <Welcome/>
  //       {/* <Name/> */}
  //       <Text style={styles.red}>zlihgeolhgoe</Text>
  //     </View>
  //   );
  // }
  return (
    <Welcome/>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,

  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  red: {
    backgroundColor: "red",
  }
});
