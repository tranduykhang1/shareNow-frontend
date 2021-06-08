import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import interactiveApi from "api/interactiveApi";


export const getCommentList = createAsyncThunk("interactive/getComments", async(params, thunAPI) => {
    const response = await interactiveApi.getCommentList(params);
    return response.data[0]
})
export const postComment = createAsyncThunk("interactive/postComment", async(data, thunAPI) => {
    const response = await interactiveApi.postComment(data);
    return response.data[0]
})



export const likePost = createAsyncThunk("interactive/likePost", async(params, thunAPI) => {
    const response = await interactiveApi.likePost(params);
    return response.data
})
export const unLikePost = createAsyncThunk("interactive/unLikePost", async(data, thunAPI) => {
    const response = await interactiveApi.unLikePost(data);
    return response.data
})

const interactiveSlice = createSlice({
    name: "interactive",
    initialState: {
        commentList: [],
        isComment: 0,
        isLike: false,
    },
    reducers: {

    },
    extraReducers: {
        [getCommentList.fulfilled]: (state, action) => {
            state.commentList = action.payload
        },
        [postComment.fulfilled]: (state, action) => {
            state.isComment = !state.isComment
        },
        [likePost.fulfilled]: (state, action) => {
            state.isComment = !state.isComment
        },
        [unLikePost.fulfilled]: (state, action) => {
            state.isComment = !state.isComment
        }
    },
});

const { actions, reducer: interactiveReducer } = interactiveSlice;
export default interactiveReducer;