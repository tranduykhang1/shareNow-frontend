import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./auth"
import theCurriculumReducer from "./theCurriculum"
import userReducer from "./user"
import toggleReducer from "./toggleComponent"
import groupReducer from "./group"
import postReducer from "./post"
import notificationReducer from "./notification"


const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        theCurriculum: theCurriculumReducer,
        toggle: toggleReducer,
        group: groupReducer,
        post: postReducer,
        notification: notificationReducer
    }
})

export default store