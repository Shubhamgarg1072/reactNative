import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type DetailScreenRouteProp = RouteProp<{ DetailScreen: { place: any } }, 'DetailScreen'>;

export const DetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<DetailScreenRouteProp>();
    const { place: item } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.mainImage} />
                    <View style={styles.headerButtons}>
                        <TouchableOpacity style={styles.circleButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.circleButton}>
                            <Ionicons name="bookmark-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.floatingCard}>
                        <View style={styles.cardContent}>
                            <View>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <View style={styles.locationRow}>
                                    <Ionicons name="location-sharp" size={16} color="#A0A0A0" />
                                    <Text style={styles.locationText}>{item.location}</Text>
                                </View>
                            </View>
                            <View style={styles.priceSection}>
                                <Text style={styles.priceLabel}>Price</Text>
                                <Text style={styles.priceValue}>{item.price}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.tabRow}>
                        <Text style={styles.activeTab}>Overview</Text>
                        <Text style={styles.inactiveTab}>Details</Text>
                    </View>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Ionicons name="time" size={20} color="#2D2D2D" />
                            <Text style={styles.statText}>8 hours</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Ionicons name="cloud" size={20} color="#2D2D2D" />
                            <Text style={styles.statText}>16 °C</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Ionicons name="star" size={20} color="#2D2D2D" />
                            <Text style={styles.statText}>{item.rating}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                    <Ionicons name="paper-plane-outline" size={20} color="#fff" style={styles.planeIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { paddingBottom: 100 },
    imageContainer: { height: 450, width: '100%', position: 'relative', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, overflow: 'hidden', backgroundColor: '#f0f0f0' },
    mainImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    headerButtons: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
    circleButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
    floatingCard: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: 'rgba(20, 25, 30, 0.85)', borderRadius: 20, padding: 20 },
    cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
    locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    locationText: { color: '#ccc', fontSize: 14 },
    priceSection: { alignItems: 'flex-end' },
    priceLabel: { color: '#aaa', fontSize: 12 },
    priceValue: { color: '#fff', fontSize: 20, fontWeight: '600' },
    detailsContainer: { padding: 24 },
    tabRow: { flexDirection: 'row', marginBottom: 24, gap: 20 },
    activeTab: { fontSize: 18, fontWeight: 'bold', color: '#000', borderBottomWidth: 2, borderBottomColor: '#F4a261' },
    inactiveTab: { fontSize: 18, fontWeight: '500', color: '#A0A0A0' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    statBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F6F8', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, gap: 8 },
    statText: { color: '#555', fontWeight: '600', fontSize: 14 },
    description: { color: '#A0A0A0', fontSize: 15, lineHeight: 24 },
    footer: { position: 'absolute', bottom: 30, left: 20, right: 20 },
    bookButton: { backgroundColor: '#1C1C1E', height: 60, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
    bookButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    planeIcon: { marginLeft: 10, transform: [{ rotate: '45deg' }] },
});
