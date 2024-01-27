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
        },
        updateReferenceInfo: (state, action) => {
            const { _id, userId, createdAt, updatedAt, __v, ...rest } = action.payload;
            state.reference = rest;
        },
        updateEmergencyContacts: (state, action) => {
            const cleanedContacts = action.payload.map(contact => {
                const { _id, userId, createdAt, updatedAt, __v, ...rest } = contact;
                return rest;
            });
            state.emergencyContacts = cleanedContacts;
        },
    },
});

export const { updateReference, updateEmergencyContact, addEmergencyContact, updateReferenceInfo, updateEmergencyContacts  } = referenceAndEmergencyContactsSlice.actions;
export default referenceAndEmergencyContactsSlice.reducer;
