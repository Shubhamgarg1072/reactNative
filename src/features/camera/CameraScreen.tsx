import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ─── Permission helpers ────────────────────────────────────────────────────────

type PermissionStatus = 'checking' | 'granted' | 'denied' | 'blocked';

/**
 * Requests the CAMERA permission at runtime on Android (API 23+).
 * iOS and web always resolve to 'granted' — add platform-specific logic there
 * if a real camera library is introduced.
 *
 * Returns:
 *  'granted'  — user allowed the permission
 *  'denied'   — user denied (can ask again)
 *  'blocked'  — user chose "Never ask again" (must go to Settings)
 *  'checking' — never returned; only used as initial state
 */
const requestCameraPermission = async (): Promise<PermissionStatus> => {
    if (Platform.OS !== 'android') return 'granted';

    try {
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission Required',
                message: 'This screen needs camera access to scan QR codes.',
                buttonPositive: 'Allow',
                buttonNegative: 'Deny',
                buttonNeutral: 'Ask Me Later',
            },
        );

        switch (result) {
            case PermissionsAndroid.RESULTS.GRANTED:
                return 'granted';
            case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
                return 'blocked';
            default:
                return 'denied';
        }
    } catch {
        return 'denied';
    }
};

// ─── Sub-screens ──────────────────────────────────────────────────────────────

const CheckingView = React.memo(() => (
    <View style={styles.container}>
        <Text style={styles.infoText}>Requesting camera permission…</Text>
    </View>
));

interface DeniedViewProps {
    status: 'denied' | 'blocked';
    onRetry: () => void;
    onClose: () => void;
}

const DeniedView = React.memo(({ status, onRetry, onClose }: DeniedViewProps) => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>

        <Ionicons name="camera-off-outline" size={64} color="#aaa" />
        <Text style={styles.infoText}>Camera access required</Text>
        <Text style={styles.subText}>
            {status === 'blocked'
                ? 'Camera permission was permanently denied.\nPlease enable it in App Settings.'
                : 'Camera permission is needed to scan QR codes.'}
        </Text>

        {status === 'denied' && (
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                <Text style={styles.retryText}>Grant Permission</Text>
            </TouchableOpacity>
        )}
    </View>
));

// ─── Main screen ──────────────────────────────────────────────────────────────

export const CameraScreen = () => {
    const navigation = useNavigation();
    const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('checking');
    const [scanned, setScanned] = useState(false);

    // Animated.Value MUST live in a ref — creating it inline recreates the object
    // on every render, breaking animation continuity (same issue as keeping
    // Animator in an Android ViewModel vs. re-creating in onDraw).
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const lineAnim = useRef(new Animated.Value(0)).current;

    // ── Permission request ────────────────────────────────────────────────────

    const handlePermissionRequest = useCallback(async () => {
        setPermissionStatus('checking');
        const status = await requestCameraPermission();
        setPermissionStatus(status);
    }, []);

    useEffect(() => {
        handlePermissionRequest();
    }, [handlePermissionRequest]);

    // ── Scanner animations — only run when permission is granted ──────────────

    useEffect(() => {
        if (permissionStatus !== 'granted') return;

        // Fade-in instruction text.
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        // Repeating red scan-line moving top → bottom → top.
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(lineAnim, { toValue: 200, duration: 1500, useNativeDriver: true }),
                Animated.timing(lineAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
            ]),
        );
        loop.start();

        // Simulated successful QR scan after 3 seconds.
        const scanTimer = setTimeout(() => {
            setScanned(true);
            Alert.alert('QR Code Scanned!', 'Redirecting to menu details…', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        }, 3000);

        return () => {
            loop.stop();
            clearTimeout(scanTimer);
        };
    }, [permissionStatus, fadeAnim, lineAnim, navigation]);

    // ── Render ────────────────────────────────────────────────────────────────

    if (permissionStatus === 'checking') {
        return <CheckingView />;
    }

    if (permissionStatus === 'denied' || permissionStatus === 'blocked') {
        return (
            <DeniedView
                status={permissionStatus}
                onRetry={handlePermissionRequest}
                onClose={() => navigation.goBack()}
            />
        );
    }

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
                <Animated.View
                    style={[styles.scanLine, { transform: [{ translateY: lineAnim }] }]}
                />
            </View>

            <Animated.Text style={[styles.infoText, { opacity: fadeAnim }]}>
                {scanned ? 'Success!' : 'Scanning QR Code…'}
            </Animated.Text>
            <Text style={styles.subText}>Align the QR code within the frame</Text>
        </View>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const ACCENT = '#dc0000';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
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
        position: 'absolute', top: 0, left: 0, width: 20, height: 20,
        borderTopWidth: 4, borderLeftWidth: 4, borderColor: ACCENT,
    },
    cornerTR: {
        position: 'absolute', top: 0, right: 0, width: 20, height: 20,
        borderTopWidth: 4, borderRightWidth: 4, borderColor: ACCENT,
    },
    cornerBL: {
        position: 'absolute', bottom: 0, left: 0, width: 20, height: 20,
        borderBottomWidth: 4, borderLeftWidth: 4, borderColor: ACCENT,
    },
    cornerBR: {
        position: 'absolute', bottom: 0, right: 0, width: 20, height: 20,
        borderBottomWidth: 4, borderRightWidth: 4, borderColor: ACCENT,
    },
    scanLine: {
        width: '100%',
        height: 2,
        backgroundColor: ACCENT,
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    infoText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 40,
        textAlign: 'center',
    },
    subText: {
        color: '#ccc',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 20,
    },
    retryButton: {
        marginTop: 24,
        paddingHorizontal: 28,
        paddingVertical: 12,
        backgroundColor: ACCENT,
        borderRadius: 8,
    },
    retryText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
});
