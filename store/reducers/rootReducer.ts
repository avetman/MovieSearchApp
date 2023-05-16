import { combineReducers } from '@reduxjs/toolkit';
import themeSlice from "./themeSlice";


export const rootReducer = combineReducers({
    theme: themeSlice,
})
export type RootState = ReturnType<typeof rootReducer>