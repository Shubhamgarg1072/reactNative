import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../store';

// Typed selector hook — avoids manually typing state: RootState everywhere
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector;
