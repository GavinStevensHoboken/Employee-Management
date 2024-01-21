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
        fileName: '',
        optReceipt: null
    },
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        }
    },
});

export const { updateField } = workInformationSlice.actions;
export default workInformationSlice.reducer;