import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';
import PlaceCard from './components/PlaceCard';
import { useHomeScreen } from './hooks/useHomeScreen';
import type { Place } from '../../core/store/slices/placesSlice';

// ListSeparator defined outside the component — stable reference, never re-created.
// Equivalent to keeping a ViewHolder layout separate from adapter logic.
const ListSeparator = () => <View style={styles.separator} />;

export function HomeScreen() {
    // All business logic lives in the hook — this component is pure presentation.
    // Mirrors the pattern: @Composable fun HomeScreen(vm: HomeViewModel = viewModel())
    const { filteredPlaces, keyExtractor } = useHomeScreen();

    const renderItem = React.useCallback(
        ({ item }: { item: Place }) => <PlaceCard item={item} />,
        [],
    );

    return (
        <View style={styles.container}>
            <Header />
            <SearchBar />
            <CategoryTabs />
            <FlatList
                data={filteredPlaces}
                keyExtractor={keyExtractor}   // DiffUtil.getItemId() equivalent
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ListSeparator}
                contentContainerStyle={styles.listContent}
                // --- RecyclerView Performance Props ---
                // windowSize=5: keeps 11 viewports of content rendered (2*5+1)
                // initialNumToRender: pre-renders 5 items before first scroll (setInitialPrefetchItemCount)
                // maxToRenderPerBatch: renders 3 items per JS frame tick (reduces jank)
                windowSize={5}
                initialNumToRender={5}
                maxToRenderPerBatch={3}
                removeClippedSubviews={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        paddingBottom: 80,
    },
    separator: {
        width: 16,
    },
    listContent: {
        paddingHorizontal: 20,
    },
});
