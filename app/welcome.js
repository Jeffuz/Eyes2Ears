import React from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { router } from 'expo-router';

const welcome = () => {
    return (
        <View>
            <Pressable onPress={() => router.push('slide_1')}>
                <Text style={styles.title}>Welcome</Text>
                <Image
                    source={require('./images/Eyes2Ears.png')}
                    style={styles.logo}
                />
                <Text style={styles.logotitle}>Ears2Eyes</Text>
                <Text style={styles.tagline}>We’re here to help you see the world{'\n'}through sound...</Text>
            </Pressable>
        </View>
    )
}

export default welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
      },
    title: {
        fontSize: 64,
        fontWeight: "normal",
        marginTop: 120,
        textAlign: 'center',
    },
    logo: {
        width: 240,
        height: 125,
        marginTop: 50, 
        alignSelf: 'center',
    },
    logotitle: {
        fontSize: 36,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: 'center',
        shadowColor: 'rgba(65, 87, 255, 0.8)', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 1, // Shadow opacity
        shadowRadius: 4, // Shadow radius
    },
    tagline: {
        fontSize: 16,
        fontWeight: "normal",
        marginTop: 80,
    },
})





