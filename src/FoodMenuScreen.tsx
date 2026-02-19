import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import FoodHeader from './FoodHeader';
import FoodBanner from './FoodBanner';
import ExclusiveOffers from './ExclusiveOffers';
import MenuExplore from './MenuExplore';

const FoodMenuScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <FoodHeader />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <FoodBanner />
                <ExclusiveOffers />
                <MenuExplore />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:20,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 20,
    },
});

export default FoodMenuScreen;
