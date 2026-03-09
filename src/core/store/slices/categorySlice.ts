import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
    selectedIndex: number;
}

const initialState: CategoryState = {
    selectedIndex: 0,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // Action = sealed class intent variant: setSelectedCategory(index: Int)
        setSelectedCategory(state, action: PayloadAction<number>) {
            state.selectedIndex = action.payload;
        },
    },
});

export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
