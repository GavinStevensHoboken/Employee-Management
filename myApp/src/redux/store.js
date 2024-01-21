import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import personalInformationReducer from './personalInformationSlice';
import workInformationReducer from "./workInformationSlice.js";
import referenceAndEmergencyContactsSlice from './referenceAndEmergencyContactsSlice.js'
const store = configureStore({
    reducer: {
        auth: authReducer,
        personalInformation: personalInformationReducer,
        workInformation: workInformationReducer,
        referenceAndEmergencyContacts: referenceAndEmergencyContactsSlice
    },
});

export default store;