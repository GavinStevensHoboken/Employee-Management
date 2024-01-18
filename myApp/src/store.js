import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/authReducer.js';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

