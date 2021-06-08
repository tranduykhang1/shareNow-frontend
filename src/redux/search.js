import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import searchApi from "api/searchApi";


export const searchUser = createAsyncThunk("search/searchUser", async(data, thunAPI) => {
    const response = await searchApi.searchUser(data);
    return response.data
})
export const searchGroup = createAsyncThunk("search/searchGroup", async(data, thunAPI) => {
    const response = await searchApi.searchGroup(data);
    return response.data
})


const searchSlice = createSlice({
    name: "search",
    initialState: {
        groupList: [],
        userList: [],
    },
    reducers: {},
    extraReducers: {
        [searchUser.fulfilled]: (state, action) => {
            state.userList = action.payload
        },
        [searchGroup.fulfilled]: (state, action) => {
            state.groupList = action.payload
        },
    },
});

const { actions, reducer: searchReducer } = searchSlice;
export default searchReducer;