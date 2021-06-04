import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postApi from "api/postApi";

export const getNews = createAsyncThunk('post/getNews', async(params, thunAPI) => {
    let response = await postApi.getNews(params);
    return response.data
})

export const createPost = createAsyncThunk('post/createPost', async(data, thunAPI) => {
    let response = await postApi.createPost(data);
    return response.data
})

export const filterPost = createAsyncThunk("post/filterPost", async(data, thunAPI) => {
    const response = await postApi.filterPost(data);
    return response.data
})



const postSlice = createSlice({
    name: "post",
    initialState: {
        postList: [],
        isCreate: 0

    },
    reducers: {},
    extraReducers: {
        [getNews.fulfilled]: (state, action) => {
            state.postList = action.payload
        },
        [createPost.fulfilled]: (state, action) => {
            state.isCreate += 1
        },

        [filterPost.fulfilled]: (state, action) => {
            state.postList = action.payload
        }
    },
});

const { reducer: postReducer } = postSlice;
export default postReducer;