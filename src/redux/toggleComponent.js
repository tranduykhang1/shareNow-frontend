import { createSlice } from "@reduxjs/toolkit";


const toggleSlice = createSlice({
    name: "curriculum",
    initialState: {
        uploadForm: false,
        commentForm: false,
        post_id: "",
        reply: "",
        editPost: false
    },
    reducers: {
        toggleUploadForm: (state, action) => {
            state.uploadForm = !state.uploadForm
        },
        toggleCommentForm: (state, action) => {
            state.commentForm = !state.commentForm
            state.post_id = action.payload
        },
        replyTo: (state, action) => {
            state.reply = action.payload
        },
        editPost: (state, action) => {
            state.editPost = !state.editPost
        }
    },
});

const { actions, reducer } = toggleSlice
export const { toggleUploadForm, toggleCommentForm, replyTo, editPost } = actions
export default reducer