import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QrIcon from '../../assets/ic_qr_code.svg';
import NotificationIcon from '../../assets/ic_notificaion.svg';
import MenuIcon from '../../assets/ic_menu.svg';
import LocationIcon from '../../assets/ic_location.svg';

const FoodHeader = () => {
    const navigation = useNavigation<any>();

    const handleQRScan = React.useCallback(() => {
        navigation.navigate('CameraScreen');
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton}>
                <MenuIcon width={24} height={24} fill="#000" />
            </TouchableOpacity>

            <View style={styles.locationContainer}>
                <LocationIcon width={24} height={24} fill="#000" />
                <View>
                    <View style={styles.locationRow}>
                        <Text style={styles.locationTitle}>Select Location</Text>
                        <View style={styles.changeBadge}>
                            <Text style={styles.changeText}>CHANGE</Text>
                            <Ionicons name="chevron-down" size={12} color="#fff" />
                        </View>
                    </View>
                    <Text style={styles.locationSubtitle} numberOfLines={1}>
                        Get accurate pricing and men...
                    </Text>
                </View>
            </View>

            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.qrButton} onPress={handleQRScan}>
                    <QrIcon width={24} height={24} fill="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <NotificationIcon width={24} height={24} fill="#000" />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    iconButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: '#F8F9FB',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 6,
    },
    changeBadge: {
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    changeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
        marginRight: 2,
    },
    locationSubtitle: {
        fontSize: 12,
        color: '#999',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    qrButton: {
        padding: 8,
        marginRight: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    notificationDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
        borderWidth: 1.5,
        borderColor: '#fff',
    },
});

export default React.memo(FoodHeader);
