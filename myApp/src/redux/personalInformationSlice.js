import { createSlice } from '@reduxjs/toolkit';

export const personalInformationSlice = createSlice({
    name: 'personalInformation',
    initialState: {
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        streetAddress: '',
        streetAddress2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        gender: '',
        email: '',
        homePhone: '',
        cellPhone: '',
    },
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
    },
});

export const { updateField } = personalInformationSlice.actions;

export default personalInformationSlice.reducer;