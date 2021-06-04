import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import groupApi from "api/groupApi"


export const createGroup = createAsyncThunk("group/create", async(data, thunAPI) => {
    const response = await groupApi.createGroup(data);
    return {
        data: response.data,
        status: response.status,
    };
})
export const updateGroup = createAsyncThunk("group/update", async(data, thunAPI) => {
    const response = await groupApi.updateGroup(data);
    return {
        data: response.data,
        status: response.status,
    };
})
export const removeGroupAction = createAsyncThunk("group/remove", async(params, thunAPI) => {
    const response = await groupApi.removeGroup(params);
    return {
        data: response.data,
        status: response.status,
    };
})

export const getGroupDetail = createAsyncThunk("group/groupDetail", async(params, thunAPI) => {
    const response = await groupApi.getGroupDetail(params);
    return response.data
})
export const getMembers = createAsyncThunk("group/members", async(params, thunAPI) => {
    const response = await groupApi.getMembers(params);
    return response.data
})
export const checkUserIn = createAsyncThunk("group/isJoin", async(params, thunAPI) => {
    const response = await groupApi.checkUserIn(params);
    return response.data
})
export const addMember = createAsyncThunk("group/addMember", async(params, thunAPI) => {
    const response = await groupApi.addMember(params);
    return response.data
})
export const removeMember = createAsyncThunk("group/removeMember", async(data, thunAPI) => {
    const response = await groupApi.removeMember(data);
    return response.data
})

export const groupByUser = createAsyncThunk("group/userGroups", async(data, thunAPI) => {
    const response = await groupApi.groupByUser(data);
    return response.data
})
export const createGroupPost = createAsyncThunk("group/createGroupPost", async(data, thunAPI) => {
    const response = await groupApi.createGroupPost(data);
    return response.data
})
export const newsInGroup = createAsyncThunk("group/newsInGroup", async(params, thunAPI) => {
    const response = await groupApi.newsInGroup(params);
    return response.data
})

export const newsInAllGroup = createAsyncThunk("group/news", async(params, thunAPI) => {
    const response = await groupApi.newsInAllGroup();
    return response.data
})


const groupSlice = createSlice({
    name: "group",
    initialState: {
        groupNewly: "",
        uploadForm: 0,
        groupDetail: "",
        members: [],
        isJoin: false,
        isAdd: false,
        isRemove: false,
        isRemove: false,
        isCreatePost: 0,
        userGroups: [],
        posts: []
    },
    reducers: {},
    extraReducers: {
        [createGroup.fulfilled]: (state, action) => {
            state.uploadForm += 1
        },
        [getGroupDetail.fulfilled]: (state, action) => {
            state.groupDetail = action.payload
        },
        [getMembers.fulfilled]: (state, action) => {
            state.members.push(action.payload)
        },
        [updateGroup.fulfilled]: (state, action) => {
            state.uploadForm += 1
        },
        [removeGroupAction.fulfilled]: (state, action) => {
            state.isRemove = true
        },
        [checkUserIn.fulfilled]: (state, action) => {
            state.isJoin = action.payload
        },
        [addMember.fulfilled]: (state, action) => {
            state.isAdd = true
        },
        [removeMember.fulfilled]: (state, action) => {
            state.isRemove = true
        },
        [groupByUser.fulfilled]: (state, action) => {
            state.userGroups = action.payload
        },
        [createGroupPost.fulfilled]: (state, action) => {
            state.isCreatePost += 1
        },
        [newsInGroup.fulfilled]: (state, action) => {
            state.posts = action.payload
        },
        [newsInAllGroup.fulfilled]: (state, action) => {
            state.posts = action.payload
        },
    }
});

const { actions, reducer } = groupSlice
export default reducer