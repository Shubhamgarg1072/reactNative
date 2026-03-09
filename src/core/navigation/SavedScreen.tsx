import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SavedScreen() {
    return (
        <View style={styles.center}>
            <Text>Saved Places</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SavedScreen;
