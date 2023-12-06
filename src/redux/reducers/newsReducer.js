import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const InitialState = {
    // user: {},
    news: []
}

export const getInitialStateAsync = createAsyncThunk('/news/setInitialState',
    async () => {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=5af17781b6ec455e9b2305eaafe48862')
        return response.data
    })
const newsSlice = createSlice({
    name: 'news',
    initialState: InitialState,
    reducers: {
        // setUserDetails: (state, action) => {
        //     console.log(action.payload);
        //     state.user = { ...action.payload };
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getInitialStateAsync.fulfilled, (state, action) => {
            state.news = [...action.payload.articles.map((article, index) => ({ ...article, id: index }))];
        })
    }
})
export const newsReducer = newsSlice.reducer;
export const actions = newsSlice.actions;

export const newsSelector = (state) => state.newsReducer.news;
// export const userSelector = (state) => state.newsReducer.user;
