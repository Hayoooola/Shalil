import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IProjectReducer } from "../../interfaces/store";


// ---------------------! Actions !--------------------- //
// Fetch all Accounts
export const fetchAccounts = createAsyncThunk(
    "Projects/fetchAccounts",
    async (params, { rejectWithValue }) => {
        try {
            const storedProjects = await AsyncStorage.getItem("accounts");
            const allProjects = storedProjects ? JSON.parse(storedProjects) : [];

            return allProjects;

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);



// ---------------------! Reducers !--------------------- //
const initialState: IProjectReducer = {
    loading: false,
    error: null,
    data: []
};

const projectsSlice = createSlice({
    name: "Accounts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = [];
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.data = [];
            });
    }
});

export default projectsSlice.reducer;