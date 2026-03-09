import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// TheMealDB — free, no API key required
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface MealCategory {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

interface MealsState {
    categories: MealCategory[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MealsState = {
    categories: [],
    status: 'idle',
    error: null,
};

// Async thunk — equivalent to viewModelScope.launch { repo.fetchCategories() }
export const fetchMealCategories = createAsyncThunk<MealCategory[]>(
    'meals/fetchCategories',
    async () => {
        const response = await fetch(`${BASE_URL}/categories.php`);
        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        }
        const data = await response.json();
        return data.categories as MealCategory[];
    },
);

const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMealCategories.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMealCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchMealCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch categories';
            });
    },
});

// --- Memoized Selectors (Flow.map {} / derivedStateOf equivalent) ---
const selectAllCategories = (state: RootState) => state.meals.categories;

// selectVisibleCategories: derives first-6 slice — replaces inline .slice(0, 6) in MenuExplore.
// Only recomputes when the categories array reference changes.
export const selectVisibleCategories = createSelector(
    [selectAllCategories],
    categories => categories.slice(0, 6),
);

export const selectMealsStatus = (state: RootState) => state.meals.status;
export const selectMealsError = (state: RootState) => state.meals.error;

export default mealsSlice.reducer;
