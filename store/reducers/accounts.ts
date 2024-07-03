import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IAccountReducer } from "../../interfaces/store";
import ITransaction from "../../interfaces/transactions";
import IAccount from "../../interfaces/accounts";
import TRANSACTION_TYPE from "../../enums/transaction_type";


// ---------------------! Actions !--------------------- //
// Fetch all Accounts
export const fetchAccounts = createAsyncThunk(
    "Accounts/fetchAccounts",
    async (params, { rejectWithValue }) => {
        try {
            const storedAccounts = await AsyncStorage.getItem("accounts");
            const allAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];

            return allAccounts;

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);

// Create new Accounts
export const createAccount = createAsyncThunk(
    "Accounts/fetchAccounts",
    async (params: IAccount, { rejectWithValue }) => {
        try {
            const storedAccounts = await AsyncStorage.getItem("accounts");
            const allAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];

            const newAccounts = allAccounts.concat(params);

            await AsyncStorage.setItem("accounts", JSON.stringify(newAccounts));

            return allAccounts;

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);

// Edit Accounts
export const editAccount = createAsyncThunk(
    "Accounts/fetchAccounts",
    async (params: IAccount, { rejectWithValue }) => {
        try {
            const storedAccounts = await AsyncStorage.getItem("accounts");
            const allAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];

            const filteredAccount = allAccounts.filter(item => item.id !== params.id);

            const newAccounts = filteredAccount.concat(params);

            console.log(allAccounts.length, filteredAccount.length, newAccounts.length, allAccounts.map(item => item.id), params.id);

            await AsyncStorage.setItem("accounts", JSON.stringify(newAccounts));

            return allAccounts;

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);

// Delete account
export const deleteAccount = createAsyncThunk(
    "Accounts/fetchAccounts",
    async (params: IAccount, { rejectWithValue }) => {
        try {
            const storedAccounts = await AsyncStorage.getItem("accounts");
            const allAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];

            const filteredAccount = allAccounts.filter(item => item.id !== params.id);

            await AsyncStorage.setItem("accounts", JSON.stringify(filteredAccount));

        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);

// Update Accounts by deleting a transaction
export const updateAccountsByDeleteTransaction = createAsyncThunk(
    "Accounts/UpdateAccountsByDeleteTransaction",
    async (params: ITransaction, { rejectWithValue }) => {
        try {
            const storedAccounts = await AsyncStorage.getItem("accounts");
            const allAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];

            const selectedAccount = allAccounts.find(item => item.id === params.account.id);

            const prevAccountTotal = selectedAccount.total || 0;

            // Update total value to be calculated in account_total)
            const UpdateAccountTotal: number = params.type === TRANSACTION_TYPE.PAY ?
                (Number(prevAccountTotal) + Number(params.value)) :
                (Number(prevAccountTotal) - Number(params.value));


            const updatedAccount: IAccount = {
                ...selectedAccount,
                last_update: Date.now(),
                total: UpdateAccountTotal,
            };

            const newAccounts = allAccounts.filter(item => item.id !== params.account.id).concat(updatedAccount);

            await AsyncStorage.setItem("accounts", JSON.stringify(newAccounts));
        } catch (err) {
            return rejectWithValue("failed_to_load_data");
        }
    }
);



// ---------------------! Reducers !--------------------- //
const initialState: IAccountReducer = {
    loading: false,
    error: null,
    data: []
};

const accountsSlice = createSlice({
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

export default accountsSlice.reducer;