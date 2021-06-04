import { createSlice } from "@reduxjs/toolkit";


const toggleSlice = createSlice({
    name: "curriculum",
    initialState: {
        uploadForm: false,
        commentForm: false,
        post_id: ""
    },
    reducers: {
        toggleUploadForm: (state, action) => {
            state.uploadForm = !state.uploadForm
        },
        toggleCommentForm: (state, action) => {
            state.commentForm = !state.commentForm
            state.post_id = action.payload
        }
    },
});

const { actions, reducer } = toggleSlice
export const { toggleUploadForm, toggleCommentForm } = actions
export default reducer