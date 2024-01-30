import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import personalInformationReducer from './personalInformationSlice'
import workInformationSlice from "./workInformationSlice.js";
import optReducer from "./visaOpt";
import optHrReducer from "./visaOptHrSlice.js";

import referenceAndEmergencyContactsSlice from './referenceAndEmergencyContactsSlice.js'
import stepNumReducer from "./stepNumReducer.js";
const store = configureStore({
    reducer: {
        auth: authReducer,
        personalInformation: personalInformationReducer,
        workInformation: workInformationSlice,
        optDocument: optReducer,
        employeeProfiles: optHrReducer,
        referenceAndEmergencyContacts: referenceAndEmergencyContactsSlice,
        stepNum: stepNumReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
    
});

export default store;