import { configureStore } from '@reduxjs/toolkit';

import accountsReducer from "./reducers/accounts";
import transactionsReducer from "./reducers/transactions";
import ProfileReducer from "./reducers/profile";
import IStore from '../interfaces/store';


const store = configureStore<IStore>({
    reducer: {
        accounts: accountsReducer,
        transactions: transactionsReducer,
        profile: ProfileReducer
    },
});

export default store;