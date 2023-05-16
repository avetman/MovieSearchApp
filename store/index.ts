import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from './reducers/rootReducer';
import { api } from './api/rtkQueryApi';

const store = configureStore({
    reducer: {
        root:  rootReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;