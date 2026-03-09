import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';

const { width } = Dimensions.get('window');

const OFFERS = [
    {
        id: '1',
        title: 'RIZO is OUR THING',
        items: 'HARISSA\nLEMON CURRY',
        price: '99',
        currency: 'EGP',
        image: 'https://images.unsplash.com/photo-1626082927389-92c208479532?w=600&q=80',
        bgColor: '#dc0000',
        textColor: '#fff',
    },
    {
        id: '2',
        title: 'DOUBLE CRUNCH',
        items: 'SPICY\nORIGINAL',
        price: '29',
        currency: 'EGP',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
        bgColor: '#fff',
        textColor: '#dc0000',
    },
];

type Offer = (typeof OFFERS)[number];

// Separator defined outside the component — stable function reference, no re-creation
const OfferSeparator = () => <View style={styles.offerSeparator} />;

const ExclusiveOffers = () => {
    const renderItem = useCallback(({ item }: { item: Offer }) => (
        <View style={[styles.card, { backgroundColor: item.bgColor || '#fff' }]}>
            <View style={styles.cardInternal}>
                <Image source={{ uri: item.image }} style={styles.offerImage} resizeMode="cover" />
                <View style={styles.overlay} />
                <View style={styles.cardContent}>
                    <View style={styles.leftCol}>
                        <Text style={[styles.offerTitle, { color: item.textColor }]}>{item.title}</Text>
                        <Text style={[styles.offerPriceLabel, { color: item.textColor }]}>ONLY</Text>
                        <View style={styles.priceRow}>
                            <Text style={[styles.currency, { color: item.textColor }]}>{item.currency}</Text>
                            <Text style={[styles.price, { color: item.textColor }]}>{item.price}</Text>
                        </View>
                    </View>
                    <View style={styles.rightCol}>
                        <Text style={styles.itemDescription}>{item.items}</Text>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>ORDER NOW</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.stripeBorder} />
        </View>
    ), []);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>EXCLUSIVE OFFERS</Text>
            <FlatList
                data={OFFERS}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={OfferSeparator}
                renderItem={renderItem}
                // RecyclerView-equivalent performance tuning
                windowSize={3}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 20 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 20, marginBottom: 15, textTransform: 'uppercase', letterSpacing: 0.5, borderBottomWidth: 2, alignSelf: 'flex-start', borderBottomColor: '#dc0000', paddingBottom: 4 },
    listContent: { paddingHorizontal: 20 },
    card: { width: width * 0.8, height: 180, borderRadius: 12, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, position: 'relative', backgroundColor: '#f9f9f9' },
    cardInternal: { flex: 1, flexDirection: 'row' },
    offerImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.85)' },
    cardContent: { flex: 1, flexDirection: 'row', padding: 15, justifyContent: 'space-between', alignItems: 'center' },
    leftCol: { flex: 1, justifyContent: 'center', alignItems: 'flex-start' },
    offerTitle: { fontSize: 22, fontWeight: '900', width: 120, lineHeight: 22, marginBottom: 10 },
    offerPriceLabel: { fontSize: 10, fontWeight: '600' },
    priceRow: { flexDirection: 'row', alignItems: 'flex-start' },
    currency: { fontSize: 10, marginTop: 4, marginRight: 2, fontWeight: '700' },
    price: { fontSize: 40, fontWeight: 'bold', marginTop: -8 },
    rightCol: { flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', height: '80%' },
    itemDescription: { textAlign: 'right', fontSize: 12, fontWeight: '700', color: '#333' },
    orderButton: { backgroundColor: '#dc0000', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
    orderButtonText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    stripeBorder: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, backgroundColor: '#dc0000', borderStyle: 'dashed', borderWidth: 1, borderColor: '#fff' },
    offerSeparator: { width: 15 },
});

export default React.memo(ExclusiveOffers);
