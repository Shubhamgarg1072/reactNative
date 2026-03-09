import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export interface Place {
    id: string;
    title: string;
    location: string;
    rating: number;
    price: string;
    image: string;
    description: string;
}

interface PlacesState {
    items: Place[];
}

const initialState: PlacesState = {
    items: [
        {
            id: '1',
            title: 'Mount Fuji',
            location: 'Tokyo, Japan',
            rating: 4.8,
            price: '$230',
            image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&q=80',
            description:
                "Japan's tallest peak, Mount Fuji is an active volcano about 100 kilometers southwest of Tokyo.",
        },
        {
            id: '2',
            title: 'Andes Mtn',
            location: 'South America',
            rating: 4.5,
            price: '$230',
            image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
            description:
                'The Andes are the longest continental mountain range in the world, forming a continuous highland along the western edge of South America.',
        },
        {
            id: '3',
            title: 'Altay Mtn',
            location: 'Mongolia',
            rating: 4.7,
            price: '$180',
            image: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=600&q=80',
            description:
                'The Altai Mountains are a mountain range in Central and East Asia, where Russia, China, Mongolia, and Kazakhstan come together.',
        },
    ],
};

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {},
});

// --- Memoized Selectors (Flow.map {} equivalent) ---
// Base selectors — raw state slices
const selectPlacesItems = (state: RootState) => state.places.items;
const selectSearchQuery = (state: RootState) => state.search.query;

// Derived selector: only recomputes when items or query changes.
// Equivalent to: val filtered = items.combine(query) { i, q -> i.filter { ... } }
export const selectFilteredPlaces = createSelector(
    [selectPlacesItems, selectSearchQuery],
    (items, query) => {
        if (!query.trim()) return items;
        const q = query.toLowerCase();
        return items.filter(
            p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q),
        );
    },
);

export default placesSlice.reducer;
