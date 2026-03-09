import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../core/hooks';
import { fetchMealCategories, selectMealsStatus } from '../../../core/store';

// useFoodMenu — ViewModel equivalent for FoodMenuScreen.
// Owns the side-effect of fetching meal categories on mount (once, if idle).
// Equivalent to: init { if (_status.value == Idle) viewModelScope.launch { repo.fetch() } }
export function useFoodMenu() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectMealsStatus);

    useEffect(() => {
        // Guard: only fetch when idle — prevents duplicate network calls on re-navigation.
        // Android equivalent: if (_state.value is UiState.Idle) fetchCategories()
        if (status === 'idle') {
            dispatch(fetchMealCategories());
        }
    }, [dispatch, status]);

    return { status };
}
