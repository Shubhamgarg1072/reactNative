import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CameraScreen = () => {
    const navigation = useNavigation();
    const [scanned, setScanned] = useState(false);
    const fadeAnim = new Animated.Value(0);
    const lineAnim = new Animated.Value(0);

    useEffect(() => {
        // Fade in text
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        // Animate scanning line
        Animated.loop(
            Animated.sequence([
                Animated.timing(lineAnim, {
                    toValue: 200, // Move down
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(lineAnim, {
                    toValue: 0, // Move up
                    duration: 1500,
                    useNativeDriver: true,
                })
            ])
        ).start();

        // Simulate successful scan after 3 seconds
        const timer = setTimeout(() => {
            setScanned(true);
            Alert.alert(
                "QR Code Scanned!",
                "Redirecting to menu details...",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>

            <View style={styles.cameraFrame}>
                <View style={styles.cornerTL} />
                <View style={styles.cornerTR} />
                <View style={styles.cornerBL} />
                <View style={styles.cornerBR} />

                <Animated.View style={[styles.scanLine, { transform: [{ translateY: lineAnim }] }]} />
            </View>

            <Animated.Text style={[styles.infoText, { opacity: fadeAnim }]}>
                {scanned ? "Success!" : "Scanning QR Code..."}
            </Animated.Text>
            <Text style={styles.subText}>Align the QR code within the frame</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
    },
    cameraFrame: {
        width: 250,
        height: 250,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        position: 'relative',
        justifyContent: 'flex-start',
        overflow: 'hidden',
    },
    cornerTL: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#dc0000',
    },
    cornerTR: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 20,
        height: 20,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: '#dc0000',
    },
    cornerBL: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 20,
        height: 20,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#dc0000',
    },
    cornerBR: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: '#dc0000',
    },
    scanLine: {
        width: '100%',
        height: 2,
        backgroundColor: '#dc0000',
        shadowColor: '#dc0000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    infoText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 40,
    },
    subText: {
        color: '#ccc',
        fontSize: 14,
        marginTop: 10,
    }
});

export default CameraScreen;
