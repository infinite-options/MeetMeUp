import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import axios from 'axios';

const PreferenceSlider = ({ preference, measurement, start, min, max }) => {
    const [value, setValue] = useState(start);
    const [debouncedValue, setDebouncedValue] = useState(value);

    // Function to load saved preferences from AsyncStorage
    const loadStoredValue = async () => {
        try {
            const savedValue = await AsyncStorage.getItem(`preference_${preference}`);
            if (savedValue) {
                setValue(JSON.parse(savedValue));
            }
        } catch (error) {
            console.error('Error loading stored value:', error);
        }
    };

    // Save the new value to AsyncStorage
    const saveValue = async (newValue) => {
        try {
            await AsyncStorage.setItem(`preference_${preference}`, JSON.stringify(newValue));
        } catch (error) {
            console.error('Error saving value:', error);
        }
    };

    useEffect(() => {
        // Load stored value on component mount
        loadStoredValue();
    }, []);

    const handleChange = (newValue) => {
        const roundedValue = Math.round(newValue); // Round to nearest integer
        setValue(roundedValue);
        saveValue(roundedValue); // Save the rounded value to AsyncStorage
    };

    const displayValue = (value) => {
        if (Array.isArray(value)) {
            return `${value[0]}-${value[1]}`;
        }
        return value;
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    useEffect(() => {
        if (debouncedValue !== value) return; // Prevent unnecessary API calls
        const formData = new FormData();
        formData.append('user_uid', '100-000172');
        formData.append('user_email_id', 'dd43@gmail.com');

        if (preference === 'Height in centimetres') {
            formData.append('user_prefer_height_min', debouncedValue);
        } else if (preference === 'Maximum distance') {
            formData.append('user_prefer_distance', debouncedValue);
        } else if (preference === 'Age range') {
            formData.append('user_prefer_age_min', debouncedValue[0]);
            formData.append('user_prefer_age_max', debouncedValue[1]);
        }

        axios.put('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo', formData)
            .then(response => console.log('Slider value updated:', response))
            .catch(error => console.error('Error updating slider value:', error));
    }, [debouncedValue]);

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{preference}</Text>
                <Text>{displayValue(value)} {measurement}</Text>
            </View>
            <Slider
                style={styles.slider}
                value={Array.isArray(value) ? value[0] : value}
                minimumValue={min}
                maximumValue={max}
                onValueChange={handleChange}
                step={1}
                minimumTrackTintColor="#E4423F"
                maximumTrackTintColor="#CECECE"
                thumbTintColor="#ffffff"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontFamily: 'Lexend',
    },
    slider: {
        width: '100%',
        height: 40,
    },
});

export default PreferenceSlider;
