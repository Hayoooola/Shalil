import { configureStore } from '@reduxjs/toolkit';

import accountsReducer from "./reducers/accounts";
import IStore from '../interfaces/store';


const store = configureStore<IStore>({
    reducer: {
        accounts: accountsReducer,
    },
});

export default store;