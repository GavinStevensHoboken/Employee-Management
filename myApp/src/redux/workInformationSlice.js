import { createSlice } from '@reduxjs/toolkit';

export const workInformationSlice = createSlice({
    name: 'workInformation',
    initialState: {
        residencyType: '',
        ssn: '',
        startDate: '',
        endDate: '',
        residencyStatus: '',
        workAuthorization: '',
        visaTitle: '',
        optReceipt: null
    },
    reducers: {
        updateWorkInformationField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
    },
});

export const { updateWorkInformationField } = workInformationSlice.actions;
export default workInformationSlice.reducer;