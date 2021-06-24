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
export const editComment = createAsyncThunk("interactive/editComment", async(data, thunAPI) => {
    const response = await interactiveApi.editComment(data);
    return response.data[0]
})
export const removeComment = createAsyncThunk("interactive/removeComment", async(data, thunAPI) => {
    const response = await interactiveApi.removeComment(data);
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

//
export const postCommentGroup = createAsyncThunk("interactive/postCommentGroup", async(data, thunAPI) => {
    const response = await interactiveApi.postCommentGroup(data);
    return response.data
})
export const getCommentGroup = createAsyncThunk("interactive/getCommentGroup", async(params, thunAPI) => {
    const response = await interactiveApi.getCommentGroup(params);
    return response.data
})
export const likePostGroup = createAsyncThunk("interactive/likePostGroup", async(params, thunAPI) => {
    const response = await interactiveApi.likePostGroup(params);
    return response.data
})



const interactiveSlice = createSlice({
    name: "interactive",
    initialState: {
        commentList: [],
        isComment: false,
        isEditComment: false,
        isLike: false,
        currentComment: false
    },
    reducers: {
        setCurrentComment: (state, action) => {
            state.currentComment = action.payload
        }
    },
    extraReducers: {
        [getCommentList.fulfilled]: (state, action) => {
            state.commentList = action.payload
        },
        [postComment.fulfilled]: (state, action) => {
            state.isComment = !state.isComment
        },
        [editComment.fulfilled]: (state, action) => {
            state.isEditComment = !state.isEditComment
        },
        [removeComment.fulfilled]: (state, action) => {
            state.isEditComment = !state.isEditComment
        },

        [likePost.fulfilled]: (state, action) => {
            state.isComment = !state.isComment
        },
        [unLikePost.fulfilled]: (state, action) => {
            state.isComment = !state.isComment
        },
        //
        [postCommentGroup.fulfilled]: (state, action) => {
            state.isComment = !state.isComment
        },
        [getCommentGroup.fulfilled]: (state, action) => {
            state.commentList = action.payload
        },
        [likePostGroup.fulfilled]: (state, action) => {
            state.isComment = !state.isComment
        },
    },
});

const { actions, reducer: interactiveReducer } = interactiveSlice;
export const { setCurrentComment } = actions
export default interactiveReducer;