import { configureStore } from "@reduxjs/toolkit";
import { newsReducer } from "./reducers/newsReducer";

export const store = configureStore({
    reducer: {
        newsReducer
    }
})