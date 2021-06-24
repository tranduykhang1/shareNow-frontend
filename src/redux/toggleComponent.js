import { createSlice } from "@reduxjs/toolkit";


const toggleSlice = createSlice({
    name: "curriculum",
    initialState: {
        uploadForm: false,
        commentForm: false,
        post_id: "",
        reply: "",
        editPost: false,
        isGroup: false
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
        },
        setIsPost: (state, action) => {
            state.isGroup = false
        },
        setIsGroup: (state, action) => {
            state.isGroup = true
        }
    },
});

const { actions, reducer } = toggleSlice
export const { toggleUploadForm, toggleCommentForm, replyTo, editPost, setIsPost, setIsGroup } = actions
export default reducer