import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NextIcon from './assets/ic_next.svg'


const { width } = Dimensions.get('window');

const CATEGORIES = [
    { id: '1', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80' },
    { id: '2', name: 'Chicken', image: 'https://images.unsplash.com/photo-1626082927389-92c208479532?w=200&q=80' },
    { id: '3', name: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80' },
    { id: '4', name: 'Fries', image: 'https://images.unsplash.com/photo-1573080496987-a199f8cd75ec?w=200&q=80' },
    { id: '5', name: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&q=80' },
    { id: '6', name: 'Dessert', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&q=80' },
];

const MenuExplore = () => {

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.arrowContainer}>
                <NextIcon width={24} height={24} fill="#000" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>EXPLORE MENU</Text>
                <TouchableOpacity style={styles.viewAllBtn}>
                    <Text style={styles.viewAllText}>VIEW ALL</Text>
                    <Ionicons name="arrow-forward" size={14} color="#555" />
                </TouchableOpacity>
            </View>

            <View style={styles.grid}>
                {CATEGORIES.map((item) => (
                    <View key={item.id} style={styles.gridItemWrapper}>
                        {renderItem({ item })}
                    </View>
                ))}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#dc0000',
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
    },
    viewAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#555',
        marginRight: 4,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItemWrapper: {
        width: '31%', // roughly 3 items per row
        marginBottom: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        height: 110,
        justifyContent: 'space-between'
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 8,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    itemName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 4,
    },
    arrowContainer: {
        marginTop: -5,
    }

});

export default MenuExplore;
