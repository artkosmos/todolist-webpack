import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { mainSlice } from '@/api';

const rootReducer = combineReducers({
  main: mainSlice,
});

export const setupStore = (
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
