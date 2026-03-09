// Public API barrel for core hooks.
// Only export what feature modules are allowed to use — everything here is "public".
// Any hook NOT exported from this file is effectively "internal" to core.
export { default as useAppDispatch } from './useAppDispatch';
export { default as useAppSelector } from './useAppSelector';
