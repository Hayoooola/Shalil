import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import IProfile from "../../interfaces/profile";
import LANGUAGES from "../../enums/language";
import { IProfileReducer } from "../../interfaces/store";

export const defaultProfile: IProfile = {
    name: "",
    email: "",
    language: LANGUAGES.PERSIAN,
    phone: "",
    imageUri: null
};


// ---------------------! Actions !--------------------- //
// Fetch all Profiles
export const fetchProfile = createAsyncThunk(
    "Profiles/fetchProfile",
    async (params, { rejectWithValue }) => {

        try {
            const storedProfile = await AsyncStorage.getItem("profile");
            const profile = storedProfile ? JSON.parse(storedProfile) : initialState;

            return profile;

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);

// Edit Profile
export const editProfile = createAsyncThunk(
    "Profiles/editProfile",
    async (params: IProfile, { rejectWithValue }) => {
        try {
            await AsyncStorage.setItem("profile", JSON.stringify(params));

            return params;

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);



// ---------------------! Reducers !--------------------- //
const initialState: IProfileReducer = {
    loading: false,
    error: null,
    data: defaultProfile
};

const ProfilesSlice = createSlice({
    name: "Profiles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = defaultProfile;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.data = defaultProfile;
            })
            // Edit
            .addCase(editProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = defaultProfile;
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.data = defaultProfile;
            });
    }
});

export default ProfilesSlice.reducer;