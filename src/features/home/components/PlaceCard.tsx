import React, { useCallback } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Place } from '../../../core/store/slices/placesSlice';

interface PlaceProps {
    item: Place;
}

// imageStyle is constant — defined outside the component to avoid a new object reference on every render
const imageStyle = { borderRadius: 20 };

const PlaceCard = ({ item }: PlaceProps) => {
    const navigation = useNavigation<any>();

    // useCallback keeps the handler reference stable so React.memo works correctly.
    // If this were unstable, memo would be bypassed on every parent re-render.
    const handlePress = useCallback(() => {
        navigation.navigate('DetailScreen', { place: item });
    }, [navigation, item]);

    return (
        <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8} onPress={handlePress}>
            <ImageBackground source={{ uri: item.image }} style={styles.image} imageStyle={imageStyle}>
                <View style={styles.heartContainer}>
                    <Text>🤍</Text>
                </View>

                <View style={styles.overlay}>
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.location}>📍 {item.location}</Text>
                    </View>
                    <View style={styles.rating}>
                        <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 280,
        height: 380,
        marginRight: 20,
        marginLeft: 20,
    },
    image: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 15,
    },
    heartContainer: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    location: {
        color: '#ddd',
        fontSize: 12,
    },
    rating: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 5,
        borderRadius: 8,
    },
    ratingText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

// React.memo = @Stable in Compose: skips re-render if item prop reference is unchanged
export default React.memo(PlaceCard);
