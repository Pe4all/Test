import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createdFormReducer from './slices/createdForm.slice';
import inputNameReducer from './slices/inputName.slice';
import authorsSelectReducer from './slices/authorsSelect.slice';
import locationsSelectReducer from './slices/locationsSelcet.slice';
import paginationSliceReducer from './slices/paginationCount.slice';

import api from '../api/ApiService';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  inputName: inputNameReducer,
  authorsSelect: authorsSelectReducer,
  locationsSelect: locationsSelectReducer,
  createdForm: createdFormReducer,
  pagination: paginationSliceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
