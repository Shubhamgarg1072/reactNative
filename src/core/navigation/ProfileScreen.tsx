import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Placeholder screens — live in navigation core since they have no feature domain
function ProfileScreen() {
    return (
        <View style={styles.center}>
            <Text>Profile Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProfileScreen;
