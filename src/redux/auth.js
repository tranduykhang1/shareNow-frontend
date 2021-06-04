import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/authApi";

export const loginAction = createAsyncThunk(
    "auth/login",
    async(data, thunkAPI) => {
        const response = await authApi.login(data);
        return {
            data: response.data,
            status: response.status,
        };
    }
);
export const googleLogin = createAsyncThunk(
    "auth/google-login",
    async(data, thunkAPI) => {
        const response = await authApi.googleLogin(data);
        return {
            data: response.data,
            status: response.status,
        };
    }
);

export const registerAction = createAsyncThunk(
    "auth/register",
    async(data, thunkAPI) => {
        const response = await authApi.register(data);
        return {
            data: response.data,
            status: response.status,
        };
    }
);
export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async(data, thunAPI) => {
        const response = await authApi.forgotPassword(data);
        console.log(response)
        return {
            data: response.data,
            status: response.status
        }


    }
);
export const updatePassword = createAsyncThunk(
    "auth/updatePassword",
    async(data, thunAPI) => {
        let response = await authApi.updatePassword(data)
        return {
            data: response.data,
            status: response.status
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        response: {},
    },
    reducers: {},
    extraReducers: {
        [loginAction.fulfilled]: (state, action) => {
            state.response = action.payload;
        },
        [googleLogin.fulfilled]: (state, action) => {
            state.response = action.payload;
        },
        [registerAction.fulfilled]: (state, action) => {
            state.response = action.payload;
        },
        [forgotPassword.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [updatePassword.fulfilled]: (state, action) => {
            state.response = action.payload
        },
    },
});

const { reducer: authReducer } = authSlice;
export default authReducer;