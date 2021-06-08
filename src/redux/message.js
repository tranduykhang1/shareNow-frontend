import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageApi from "api/messageApi";


export const getConversations = createAsyncThunk("message/getConversations", async(params, thunAPI) => {
    const response = await messageApi.getConversations();
    return response.data
})
export const getUserMessageAction = createAsyncThunk("message/getUserMessageAction", async(params, thunAPI) => {
    const response = await messageApi.getUserMessage(params);
    return response.data
})
export const sendMessageAction = createAsyncThunk("message/sendMessageAction", async(data, thunAPI) => {
    const response = await messageApi.sendMessage(data);
    return response.data
})


export const getRoomMembers = createAsyncThunk("message/getRoomMembers", async(params, thunAPI) => {
    const response = await messageApi.getRoomMembers(params);
    return response.data
})
export const getMessageRoomAction = createAsyncThunk("message/getMessageRoomAction", async(params, thunAPI) => {
    const response = await messageApi.getMessageRoom(params);
    return response.data
})
export const sendMessageRoomAction = createAsyncThunk("message/sendMessageRoomAction", async(data, thunAPI) => {
    const response = await messageApi.sendMessageRoomAction(data);
    return response.data
})
export const joinRoom = createAsyncThunk("message/joinRoom", async(data, thunAPI) => {
    const response = await messageApi.joinRoom(data);
    return response.data
})
export const leaveRoom = createAsyncThunk("message/leaveRoom", async(data, thunAPI) => {
    const response = await messageApi.leaveRoom(data);
    return response.data
})
export const createRoom = createAsyncThunk("message/createRoom", async(data, thunAPI) => {
    const response = await messageApi.createRoom(data);
    return response.data
})



const messageSlice = createSlice({
    name: "message",
    initialState: {
        listConversation: [],
        listMessageRoom: [],
        userMessage: "",
        isSent: 0,
        isSentRoom: 0,
        roomMembers: [],
        isJoin: 0,
        isLeave: 0,
        isCreateRoom: 0
    },
    reducers: {

    },
    extraReducers: {
        [getConversations.fulfilled]: (state, action) => {
            state.listConversation = action.payload
        },
        [getUserMessageAction.fulfilled]: (state, action) => {
            state.userMessage = action.payload
        },
        [sendMessageAction.fulfilled]: (state, action) => {
            state.isSent += 1
        },
        [getMessageRoomAction.fulfilled]: (state, action) => {
            state.userMessage = action.payload
        },
        [sendMessageRoomAction.fulfilled]: (state, action) => {
            state.isSentRoom += 1
        },
        [getRoomMembers.fulfilled]: (state, action) => {
            state.roomMembers = action.payload
        },
        [joinRoom.fulfilled]: (state, action) => {
            state.isJoin += 1
        },
        [leaveRoom.fulfilled]: (state, action) => {
            state.isLeave += 1
        },
        [createRoom.fulfilled]: (state, action) => {
            state.isCreateRoom += 1
        },
    },
});

const { reducer: messageReducer } = messageSlice;
export default messageReducer