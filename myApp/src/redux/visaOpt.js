import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
    data:[],
    status: 'loading',
}

export const fetchDocument = createAsyncThunk("opt/fetchDocument", async (token) => {
    try{
        const res = await fetch("http://localhost:3001/api/doc",{
            method: "GET",
            headers:{
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await res.json();
        return data;
    }catch(e){}
});

const optSlice = createSlice({
    name: "opt",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDocument.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchDocument.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload;
        });
        builder.addCase(fetchDocument.rejected, (state) => {
            state.status = 'failed';
        })
    }
});

export default optSlice.reducer;
