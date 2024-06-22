import { StyleSheet, Text, View } from "react-native";
import Welcome from './welcome';
import Home from './home';

export default function Page() {
  return (
    <View style={styles.container}>
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  }
});
