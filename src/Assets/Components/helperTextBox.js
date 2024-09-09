import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import questionMark from '../Images/questionMarkBox.png';// Make sure the image path is correct

export default function HelperTextBox({ text }) {
    return (
        <View style={styles.container}>
            <Image source={questionMark} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0', // Example background color
        borderRadius: 8,
        marginBottom: 10,

    },
    image: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: '#333', // Example text color
    },
});
