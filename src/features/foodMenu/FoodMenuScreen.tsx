import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import FoodHeader from './components/FoodHeader';
import FoodBanner from './components/FoodBanner';
import ExclusiveOffers from './components/ExclusiveOffers';
import MenuExplore from './components/MenuExplore';
import { useFoodMenu } from './hooks/useFoodMenu';

export const FoodMenuScreen = () => {
    // Pure presentation: all data-fetching logic lives in the hook
    useFoodMenu();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <FoodHeader />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
        marginTop: 20,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 20,
    },
});
