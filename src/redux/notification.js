import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notificationAPI from "api/notificationApi";

export const getNotification = createAsyncThunk(
    "notification/get",
    async(data, thunkAPI) => {
        const response = await notificationAPI.getNotification(data);
        return response.data
    }
);

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notificationList: [],
    },
    reducers: {},
    extraReducers: {
        [getNotification.fulfilled]: (state, action) => {
            state.notificationList = action.payload;
        },

    },
});

const { reducer: notificationReducer } = notificationSlice;
export default notificationReducer;