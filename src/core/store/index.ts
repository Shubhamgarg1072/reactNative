import { configureStore } from '@reduxjs/toolkit';
import placesReducer from './slices/placesSlice';
import categoryReducer from './slices/categorySlice';
import searchReducer from './slices/searchSlice';
import mealsReducer from './slices/mealsSlice';

// --- Store (Single Source of Truth — equivalent to SharedViewModel/Repository layer) ---
export const store = configureStore({
    reducer: {
        places: placesReducer,
        category: categoryReducer,
        search: searchReducer,
        meals: mealsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// --- Re-export Selectors (public API of the store module) ---
// Consumers import selectors from here, not from individual slice files.
export { selectFilteredPlaces } from './slices/placesSlice';
export { selectVisibleCategories, selectMealsStatus, selectMealsError, fetchMealCategories } from './slices/mealsSlice';
export { setSelectedCategory } from './slices/categorySlice';
export { setSearchQuery, clearSearchQuery } from './slices/searchSlice';
