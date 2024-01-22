import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import personalInformationReducer from './personalInformationSlice'
import workInformationSlice from "./workInformationSlice.js";
import optReducer from "./visaOpt";

import referenceAndEmergencyContactsSlice from './referenceAndEmergencyContactsSlice.js'
const store = configureStore({
    reducer: {
        auth: authReducer,
        personalInformation: personalInformationReducer,
        workInformation: workInformationSlice,
        optDocument: optReducer,
        referenceAndEmergencyContacts: referenceAndEmergencyContactsSlice
    },
});

export default store;