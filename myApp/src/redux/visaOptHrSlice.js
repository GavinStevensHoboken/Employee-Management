import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
    data:[],
    status: '',
}

export const fetchProfiles = createAsyncThunk("opt/fetchProfiles", async (token) => {
    try{
        const res = await fetch("http://localhost:3001/api/allvisastatus",{
            method: "GET",
            headers:{
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await res.json();
        return data;
    }catch(e){}
});

const optHrSlice = createSlice({
    name: "optHr",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfiles.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchProfiles.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload;
        });
        builder.addCase(fetchProfiles.rejected, (state) => {
            state.status = 'failed';
        })
    }
});

export default optHrSlice.reducer;
