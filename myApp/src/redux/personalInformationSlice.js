import { createSlice } from '@reduxjs/toolkit';

export const personalInformationSlice = createSlice({
    name: 'personalInformation',
    initialState: {
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        avatar: '',
        preferName: '',
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
        updateAvatar: (state, action) => {
            state.avatar = action.payload;
        },
    },
});

export const { updateField, updateAvatar  } = personalInformationSlice.actions;

export default personalInformationSlice.reducer;