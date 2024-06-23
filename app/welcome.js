import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { router } from 'expo-router';
import * as Font from 'expo-font';

const welcome = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
      async function loadFonts() {
        await Font.loadAsync({
          'PlaywritePL-Regular': require('../assets/fonts/PlaywritePL-Regular.ttf'),
          'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
          'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
        });
        setFontsLoaded(true);
      }
      
      loadFonts();
    }, []);
  
    return (
        <Pressable onPress={() => router.push('slide_1')}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome!</Text>
                <Image
                    source={require('./images/Eyes2Ears.png')}
                    style={styles.logo}
                />
                <Text style={styles.logotitle}>Ears2Eyes</Text>
                <Text style={styles.tagline}>We’re here to help you see the world{'\n'}through sound...</Text>
            </View>
        </Pressable>
    )
}

export default welcome

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: "center",
        //padding: 24,
      },
    title: {
        fontFamily: 'Nunito-Bold',
        fontSize: 48,
        fontWeight: 'normal',
        marginTop: 150,
    },
    logo: {
        width: 240,
        height: 125,
        marginTop: 50, 
    },
    logotitle: {
        fontFamily: 'PlaywritePL-Regular',
        fontSize: 28,
        fontWeight: 'bold',
        shadowColor: 'rgba(65, 87, 255, 0.8)', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 1, // Shadow opacity
        shadowRadius: 4, // Shadow radius
    },
    tagline: {
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        fontWeight: 'normal',
        marginTop: 80,
    },
})