import { createSlice } from '@reduxjs/toolkit';

export const referenceAndEmergencyContactsSlice = createSlice({
    name: 'referenceAndEmergencyContacts',
    initialState: {
        reference: {
            firstName: '',
            lastName: '',
            middleName: '',
            phone: '',
            email: '',
            relationship: ''
        },
        emergencyContacts: []
    },
    reducers: {
        updateReference: (state, action) => {
            state.reference = { ...state.reference, ...action.payload };
        },
        updateEmergencyContact: (state, action) => {
            const { index, contact } = action.payload;
            state.emergencyContacts[index] = { ...state.emergencyContacts[index], ...contact };
        },
        addEmergencyContact: (state) => {
            state.emergencyContacts.push({
                firstName: '',
                lastName: '',
                middleName: '',
                phone: '',
                email: '',
                relationship: ''
            });
        }
    },
});

export const { updateReference, updateEmergencyContact, addEmergencyContact } = referenceAndEmergencyContactsSlice.actions;
export default referenceAndEmergencyContactsSlice.reducer;
