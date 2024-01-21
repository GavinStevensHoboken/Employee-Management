import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import personalInformationReducer from './personalInformationSlice'
import {workInformationSlice} from "./workInformationSlice.js";
import optReducer from "./visaOpt";


const store = configureStore({
    reducer: {
        auth: authReducer,
        personalInformation: personalInformationReducer,
        workInformation: workInformationSlice,
        optDocument: optReducer
    },
});

export default store;