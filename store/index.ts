import { configureStore } from '@reduxjs/toolkit';

import accountsReducer from "./reducers/accounts";
import transactionsReducer from "./reducers/transactions";
import IStore from '../interfaces/store';


const store = configureStore<IStore>({
    reducer: {
        accounts: accountsReducer,
        transactions: transactionsReducer
    },
});

export default store;