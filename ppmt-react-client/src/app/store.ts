import {configureStore} from "@reduxjs/toolkit"
import {backlogApiSlice} from "../features/backlog/backlog-slice"
import {projectApiSlice} from "../features/project/projectapi-slice"
import authReducer from "../features/auth/auth-slice"
import {userApiSlice} from "../features/user/user-slice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [projectApiSlice.reducerPath]: projectApiSlice.reducer,
        [backlogApiSlice.reducerPath]: backlogApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([projectApiSlice.middleware, backlogApiSlice.middleware, userApiSlice.middleware])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
