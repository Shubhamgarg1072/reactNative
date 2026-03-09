import { useCallback } from 'react';
import { useAppSelector } from '../../../core/hooks';
import { selectFilteredPlaces } from '../../../core/store';
import type { Place } from '../../../core/store/slices/placesSlice';

// useHomeScreen — ViewModel equivalent for HomeScreen.
// Returns only data + stable callback references; JSX stays in the screen (.tsx) file.
// Equivalent to: class HomeViewModel : ViewModel() { val filteredPlaces: StateFlow<List<Place>> }
export function useHomeScreen() {
    // selectFilteredPlaces is a memoized Reselect selector.
    // Recomputes only when places or the search query changes — equivalent to Flow.map {}.
    const filteredPlaces = useAppSelector(selectFilteredPlaces);

    // keyExtractor — the DiffUtil.getItemId() equivalent.
    // Stable string ID lets FlatList's reconciler identify which rows changed.
    const keyExtractor = useCallback((item: Place) => item.id, []);

    return { filteredPlaces, keyExtractor };
}
