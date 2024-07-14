import { configureStore } from '@reduxjs/toolkit';

import accountsReducer from "./reducers/accounts";
import transactionsReducer from "./reducers/transactions";
import ProfileReducer from "./reducers/profile";
import TotalReducer from "./reducers/total";
import IStore from '../interfaces/store';


const store = configureStore<IStore>({
    reducer: {
        accounts: accountsReducer,
        transactions: transactionsReducer,
        profile: ProfileReducer,
        totalMonth: TotalReducer
    },
});

export default store;