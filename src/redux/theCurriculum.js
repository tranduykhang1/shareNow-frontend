import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import theCurriculumApi from "api/theCurriculumApi";


export const getDepartments = createAsyncThunk("curriculum/getDepartment", async(params, thunAPI) => {
    const response = await theCurriculumApi.getDepartments();
    return response.data
})
export const getIndustries = createAsyncThunk("curriculum/getIndustries", async(params, thunAPI) => {
    const response = await theCurriculumApi.getIndustries();
    return response.data
})
export const getTagList = createAsyncThunk("curriculum/getTagList", async(params, thunAPI) => {
    const response = await theCurriculumApi.getTagList();
    return response.data
})



const theCurriculumSlice = createSlice({
    name: "curriculum",
    initialState: {
        departments: [],
        industries: [],
        tagList: [],
        currentTag: "",
        currentTopic: "",
        postList: []
    },
    reducers: {
        currentTag: (state, action) => {
            state.currentTag = action.payload
        },
        currentTopic: (state, action) => {
            state.currentTopic = action.payload
        },
    },
    extraReducers: {
        [getDepartments.fulfilled]: (state, action) => {
            state.departments = action.payload
        },
        [getIndustries.fulfilled]: (state, action) => {
            state.industries = action.payload
        },
        [getTagList.fulfilled]: (state, action) => {
            state.tagList = action.payload
        },
    },
});

const { actions, reducer: theCurriculumReducer } = theCurriculumSlice;
export const { currentTag, currentTopic } = actions
export default theCurriculumReducer;