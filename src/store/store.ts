import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from './count';
import loadPageReducer from './loadPage';
import projectsReducer from './projects';

// LOCAL STORAGE
const saveToLocalStorage = (state: any) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loadPage: loadPageReducer,
    projects: projectsReducer,
  },
  preloadedState: loadFromLocalStorage()
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;