import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";

export const getUser = createAsyncThunk('user/getUser', async(params, thunAPI) => {
    let response = await userApi.getUser();
    return response.data
})
export const getUserProfile = createAsyncThunk('user/getUserProfile', async(params, thunAPI) => {
    let response = await userApi.getUserProfile(params);
    return response.data
})

export const updateProfile = createAsyncThunk('user/updateProfile', async(data, thunAPI) => {
    console.log(data)
    let response = await userApi.updateProfile(data);
    return response.data
})
export const updateAvatar = createAsyncThunk('user/updateAvatar', async(photo, thunAPI) => {
    let response = await userApi.updateAvatar(photo);
    return response.data
})
export const updateBackground = createAsyncThunk('user/updateBackground', async(photo, thunAPI) => {
    let response = await userApi.updateBackground(photo);
    return response.data
})
export const activeUser = createAsyncThunk('user/activeUser', async(data, thunAPI) => {
    let response = await userApi.activeUser(data)
    return response.data
})
export const toggleFollowUser = createAsyncThunk('user/toggleFollowUser', async(params, thunAPI) => {
    let response = await userApi.toggleFollowUser(params)
    return response.data
})



const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: "",
        userProfile: "",
        isUpdateProfile: false,
        isUpdateAvatar: false,
        isUpdateBackground: false,
        isActive: false,
        isFollow: false,
        isFollowing: 0
    },
    reducers: {},
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.isUpdateProfile = true
        },
        [updateAvatar.fulfilled]: (state, action) => {
            state.isUpdateAvatar = true
        },
        [updateBackground.fulfilled]: (state, action) => {
            state.isUpdateBackground = true
        },
        [activeUser.fulfilled]: (state, action) => {
            state.isActive = true
        },
        [toggleFollowUser.fulfilled]: (state, action) => {
            if (action.payload === "Following this user!") {
                state.isFollowing += 1
            }
            state.isFollow = !state.isFollow
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.userProfile = action.payload
        },
    },
});

const { reducer: userReducer } = userSlice;
export default userReducer;