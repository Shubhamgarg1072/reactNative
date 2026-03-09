import React, { useCallback } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../core/hooks';
import { setSearchQuery } from '../../../core/store';

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const query = useAppSelector(state => state.search.query);

    // useCallback keeps the reference stable — prevents re-renders of controlled TextInput parent
    const handleChange = useCallback(
        (text: string) => {
            dispatch(setSearchQuery(text));
        },
        [dispatch],
    );

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>🔍</Text>
            <TextInput
                placeholder="Search places"
                style={styles.input}
                placeholderTextColor="#999"
                value={query}
                onChangeText={handleChange}
            />
            <View style={styles.filterBtn}>
                <Text style={styles.filterIcon}>⚙️</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50,
    },
    icon: {
        marginRight: 10,
        fontSize: 18,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    filterBtn: {
        backgroundColor: '#D3D3D3',
        padding: 8,
        borderRadius: 10,
    },
    filterIcon: {
        fontSize: 14,
    },
});

export default React.memo(SearchBar);
