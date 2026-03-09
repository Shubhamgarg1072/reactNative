import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

// Typed dispatch hook — avoids casting in every component
const useAppDispatch = () => useDispatch<AppDispatch>();
export default useAppDispatch;
