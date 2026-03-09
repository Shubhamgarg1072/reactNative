import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

// Greet card — only re-renders if its props change (none — static content)
const Header = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Hi, Shubham</Text>
                <Text style={styles.subtitle}>Lets try again</Text>
            </View>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80' }}
                style={styles.avatar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default React.memo(Header);
