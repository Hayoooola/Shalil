import { configureStore } from '@reduxjs/toolkit';

import projectsReducer from "./reducers/projects";
import IStore from '../interfaces/store';


const store = configureStore<IStore>({
    reducer: {
        projects: projectsReducer,
    },
});

export default store;