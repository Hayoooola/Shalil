import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ITransactionReducer } from "../../interfaces/store";


// ---------------------! Actions !--------------------- //
// Fetch all Transactions
export const fetchTransactions = createAsyncThunk(
    "Accounts/fetchTransactions",
    async (params, { rejectWithValue }) => {
        try {
            const storedTransactions = await AsyncStorage.getItem("transactions");
            const allTransactions = storedTransactions ? JSON.parse(storedTransactions) : [];

            return allTransactions;

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);



// ---------------------! Reducers !--------------------- //
const initialState: ITransactionReducer = {
    loading: false,
    error: null,
    data: []
};

const TransactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = [];
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.data = [];
            });
    }
});

export default TransactionsSlice.reducer;