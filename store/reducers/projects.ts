import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IProjectReducer } from "../../interfaces/store";


// ---------------------! Actions !--------------------- //
// Fetch all projects
export const fetchProjects = createAsyncThunk(
    "Projects/fetchProjects",
    async (params, { rejectWithValue }) => {
        try {
            const storedProjects = await AsyncStorage.getItem("projects");
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
    name: "Projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = [];
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.data = [];
            });
    }
});

export default projectsSlice.reducer;