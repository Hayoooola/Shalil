import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment-jalaali";

import { ITotalReducer } from "../../interfaces/store";
import ITransaction from "../../interfaces/transactions";
import TRANSACTION_TYPE from "../../enums/transaction_type";


// ---------------------! Actions !--------------------- //
// Calculate total Month
export const fetchTotalMonth = createAsyncThunk(
    "totalMonth/fetchTotalMonth",
    async (params, { rejectWithValue }) => {
        try {
            const storedTransactions = await AsyncStorage.getItem("transactions");
            const allTransactions: ITransaction[] = storedTransactions ? JSON.parse(storedTransactions) : [];

            const oneMonthAgo = moment().subtract(1, 'jMonth');
            const transactionsInMonth = allTransactions.filter(item => moment(item.last_update, "jYYYY/jMM/jDD_HH:mm").isAfter(oneMonthAgo));

            // Calculate total pay
            const payedTransactions = transactionsInMonth.filter(item => item.type === TRANSACTION_TYPE.PAY);
            const totalPay = payedTransactions
                .map(item => Number(item.value))
                .reduce((a, b) => a + b, 0) || 0;

            // Calculate total recept
            const receivedTransactions = transactionsInMonth.filter(item => item.type === TRANSACTION_TYPE.RECEIPT);
            const totalReceipt = receivedTransactions
                .map(item => Number(item.value))
                .reduce((a, b) => a + b, 0) || 0;

            return {
                pay: totalPay,
                receipt: totalReceipt,
                total: totalReceipt - totalPay
            };

        } catch (err) {
            return {
                pay: 0,
                receipt: 0,
                total: 0
            };
        }
    }
);



// ---------------------! Reducers !--------------------- //
export const totalInitialValue = {
    pay: 0,
    receipt: 0,
    total: 0
};


const initialState: ITotalReducer = {
    loading: false,
    error: null,
    data: totalInitialValue
};

const TotalSlice = createSlice({
    name: "totalMonth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTotalMonth.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = totalInitialValue;
            })
            .addCase(fetchTotalMonth.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchTotalMonth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.data = totalInitialValue;
            });
    }
});

export default TotalSlice.reducer;