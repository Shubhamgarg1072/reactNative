import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../core/hooks';
import { setSelectedCategory } from '../../../core/store';

const CATEGORIES = ['Most Viewed', 'Nearby', 'Latest'];

const CategoryTabs = () => {
    const dispatch = useAppDispatch();
    const selectedIndex = useAppSelector(state => state.category.selectedIndex);

    // useCallback prevents a new function reference on every render
    const handlePress = useCallback(
        (index: number) => {
            dispatch(setSelectedCategory(index));
        },
        [dispatch],
    );

    return (
        <View style={styles.container}>
            {CATEGORIES.map((cat, index) => (
                <TouchableOpacity
                    key={cat}
                    onPress={() => handlePress(index)}
                    style={[styles.chip, selectedIndex === index ? styles.chipActive : styles.chipInactive]}
                >
                    <Text style={selectedIndex === index ? styles.textActive : styles.textInactive}>
                        {cat}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 30,
        gap: 15,
    },
    chip: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    chipActive: {
        backgroundColor: '#2F2F2F',
    },
    chipInactive: {
        backgroundColor: '#F3F3F3',
    },
    textActive: {
        color: 'white',
        fontWeight: '600',
    },
    textInactive: {
        color: 'gray',
    },
});

export default React.memo(CategoryTabs);
