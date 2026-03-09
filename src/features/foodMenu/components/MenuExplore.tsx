import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NextIcon from '../../assets/ic_next.svg';
import { useAppSelector } from '../../../core/hooks';
import { selectVisibleCategories, selectMealsStatus, selectMealsError } from '../../../core/store';
import type { MealCategory } from '../../../core/store/slices/mealsSlice';

// React.memo = @Stable in Compose: skips re-render if the item prop hasn't changed
const CategoryCard = React.memo(({ item }: { item: MealCategory }) => (
    <TouchableOpacity style={styles.card}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
        </View>
        <Text style={styles.itemName} numberOfLines={1}>
            {item.strCategory}
        </Text>
        <View style={styles.arrowContainer}>
            <NextIcon width={24} height={24} fill="#000" />
        </View>
    </TouchableOpacity>
));

const MenuExplore = () => {
    // selectVisibleCategories: memoized selector replaces inline .slice(0, 6).
    // Equivalent to: val visible by vm.visibleCategories.collectAsState()
    const visible = useAppSelector(selectVisibleCategories);
    const status = useAppSelector(selectMealsStatus);
    const error = useAppSelector(selectMealsError);

    if (status === 'loading') {
        return <ActivityIndicator size="large" color="#dc0000" style={styles.loader} />;
    }
    if (status === 'failed') {
        return <Text style={styles.errorText}>{error}</Text>;
    }

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
                {visible.map(item => (
                    <View key={item.idCategory} style={styles.gridItemWrapper}>
                        <CategoryCard item={item} />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { paddingHorizontal: 20, marginBottom: 40 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, borderBottomWidth: 2, borderBottomColor: '#dc0000', paddingBottom: 4, alignSelf: 'stretch' },
    title: { fontSize: 16, fontWeight: 'bold', color: '#333', textTransform: 'uppercase' },
    viewAllBtn: { flexDirection: 'row', alignItems: 'center' },
    viewAllText: { fontSize: 12, fontWeight: '600', color: '#555', marginRight: 4 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    gridItemWrapper: { width: '31%', marginBottom: 15 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 8, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, height: 110, justifyContent: 'space-between' },
    imageContainer: { width: 50, height: 50, borderRadius: 25, overflow: 'hidden', marginBottom: 8, backgroundColor: '#f0f0f0' },
    image: { width: '100%', height: '100%' },
    itemName: { fontSize: 12, fontWeight: '600', color: '#333', textAlign: 'center', marginBottom: 4 },
    arrowContainer: { marginTop: -5 },
    loader: { marginVertical: 30 },
    errorText: { color: '#dc0000', textAlign: 'center', marginVertical: 20, fontSize: 13 },
});

export default React.memo(MenuExplore);
