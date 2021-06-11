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

export const getUserPost = createAsyncThunk("post/getUserPost", async(params, thunAPI) => {
    const response = await postApi.getUserPost(params);
    return response.data
})

export const removePost = createAsyncThunk("post/removePost", async(params, thunAPI) => {
    const response = await postApi.removePost(params);
    return response.data
})



const postSlice = createSlice({
    name: "post",
    initialState: {
        postList: [],
        isCreate: 0,
        isRemove: 0,
        isPending: false,
        userPostList: [],
        currentPost: {}
    },
    reducers: {
        setCurrentPost: (state, action) => {
            state.currentPost = action.payload
        }
    },
    extraReducers: {
        [getNews.fulfilled]: (state, action) => {
            state.postList = action.payload
        },
        [createPost.pending]: (state, action) => {
            state.isPending = true
        },
        [createPost.fulfilled]: (state, action) => {
            state.isCreate += 1
            state.isPending = false
        },

        [filterPost.fulfilled]: (state, action) => {
            state.postList = action.payload
        },
        [getUserPost.fulfilled]: (state, action) => {
            state.userPostList = action.payload
        },
        [removePost.fulfilled]: (state, action) => {
            state.isRemove += 1
        }
    },
});

const { actions, reducer: postReducer } = postSlice;
export const { setCurrentPost } = actions
export default postReducer;