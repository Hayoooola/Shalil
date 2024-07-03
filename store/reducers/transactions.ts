import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ITransactionReducer } from "../../interfaces/store";
import ITransaction from "../../interfaces/transactions";


// ---------------------! Actions !--------------------- //
// Fetch all Transactions
export const fetchTransactions = createAsyncThunk(
    "Accounts/fetchTransactions",
    async (params: string | number[] | undefined, { rejectWithValue }) => {
        try {
            const storedTransactions = await AsyncStorage.getItem("transactions");
            const allTransactions = storedTransactions ? JSON.parse(storedTransactions) : [];

            if (params) {
                return allTransactions.filter(item => item.account.id === params);

            } else {
                return allTransactions;
            }

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);

// Create new transaction
export const createNewTransaction = createAsyncThunk(
    "Accounts/createNewTransaction",
    async (params: ITransaction, { rejectWithValue }) => {
        try {
            // Get prev transactions data
            const prevTransactions = await AsyncStorage.getItem("transactions");
            const transactions: ITransaction[] = prevTransactions ? JSON.parse(prevTransactions) : [];

            const newTransactions = transactions.concat(params);

            // Store transactions to the store
            await AsyncStorage.setItem("transactions", JSON.stringify(newTransactions));

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);

// Edit a transaction
export const editTransaction = createAsyncThunk(
    "Accounts/editTransaction",
    async (params: ITransaction, { rejectWithValue }) => {
        try {
            // Get prev transactions data
            const prevTransactions = await AsyncStorage.getItem("transactions");
            const transactions: ITransaction[] = prevTransactions ? JSON.parse(prevTransactions) : [];

            const filteredTransactions = transactions.filter(item => item.id !== params.id);
            const newTransactions = filteredTransactions.concat(params);

            // Store transactions to the store
            await AsyncStorage.setItem("transactions", JSON.stringify(newTransactions));

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);

// Delete transaction
export const deleteTransaction = createAsyncThunk(
    "Accounts/deleteTransaction",
    async (params: string | number[], { rejectWithValue }) => {
        try {
            // Get prev transactions data
            const prevTransactions = await AsyncStorage.getItem("transactions");
            const transactions: ITransaction[] = prevTransactions ? JSON.parse(prevTransactions) : [];

            // Prepare transactions to store
            const filteredTransactions = transactions.filter(item => item.id !== params);

            // Store transactions to the store
            await AsyncStorage.setItem("transactions", JSON.stringify(filteredTransactions));

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);
// Delete transaction
export const deleteAccountsTransaction = createAsyncThunk(
    "Accounts/deleteTransaction",
    async (params: string | number[], { rejectWithValue }) => {
        try {
            // Get prev transactions data
            const prevTransactions = await AsyncStorage.getItem("transactions");
            const transactions: ITransaction[] = prevTransactions ? JSON.parse(prevTransactions) : [];

            const filteredTransactions = transactions.filter(item => item.account.id !== params);

            // Store transactions to the store
            await AsyncStorage.setItem("transactions", JSON.stringify(filteredTransactions));

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