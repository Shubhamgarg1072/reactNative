import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const FoodBanner = () => {
    // Using a high-quality food image close to the design
    const BANNER_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80';

    return (
        <View style={styles.container}>
            <Image source={{ uri: BANNER_IMAGE }} style={styles.image} resizeMode="cover" />

            {/* Dark Overlay/Gradient could be added here if needed, but the image might be enough */}
            <View style={styles.overlay} />

            <View style={styles.content}>
                <Text style={styles.logoText}>LOGO HERE</Text>

                <View style={styles.mainTextContainer}>
                    <Text style={styles.scriptText}>Delicious</Text>
                    <Text style={styles.blockText}>FOOD</Text>
                    <Text style={styles.blockText}>MENU</Text>
                </View>

                <View style={styles.discountBadge}>
                    <Text style={styles.tinyText}>SPECIAL DISCOUNT</Text>
                    <View style={styles.percentRow}>
                        <Text style={styles.upToText}>UP{"\n"}TO</Text>
                        <Text style={styles.fiftyText}>50</Text>
                        <Text style={styles.percentSymbol}>%{"\n"}OFF</Text>
                    </View>
                </View>

                <View style={styles.bottomRow}>
                    <Text style={styles.bottomText}>For delivery{"\n"}012-345-6789</Text>
                    <Text style={styles.bottomText}>www.website.com</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: width * 0.65, // Aspect ratio roughly 1.5:1
        width: '100%',
        backgroundColor: '#f2f2f2',
        marginBottom: 0,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)', // Slight dark tint for text readability
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        padding: 20,
        justifyContent: 'space-between',
    },
    logoText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    mainTextContainer: {
        alignItems: 'flex-start',
        marginLeft: 10,
        marginTop: 10,
    },
    scriptText: {
        fontStyle: 'italic', // Fallback for script font
        fontSize: 28,
        color: '#fff',
        fontWeight: '300',
        marginBottom: -10, // Pull closer to the block text
        marginLeft: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    blockText: {
        fontSize: 42,
        fontWeight: '900',
        color: '#6e4c3e', // Brownish color from design
        lineHeight: 46,
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    discountBadge: {
        position: 'absolute',
        left: 20,
        bottom: 50,
        backgroundColor: 'transparent',
    },
    tinyText: {
        color: '#fff',
        fontSize: 8,
        fontWeight: '700',
        opacity: 0.8,
    },
    percentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upToText: {
        color: '#fff',
        fontSize: 8,
        lineHeight: 8,
        textAlign: 'right',
        marginRight: 2,
    },
    fiftyText: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: -5,
    },
    percentSymbol: {
        color: '#fff',
        fontSize: 10,
        lineHeight: 10,
        marginLeft: 2,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
    },
    bottomText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    }
});

export default FoodBanner;
