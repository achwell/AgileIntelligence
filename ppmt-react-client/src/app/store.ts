import {configureStore} from "@reduxjs/toolkit"
import {projectApiSlice} from "../features/project/projectapi-slice"
import {backlogApiSlice} from "../features/backlog/backlog-slice"
export const store = configureStore({
    reducer: {
        [projectApiSlice.reducerPath]: projectApiSlice.reducer,
        [backlogApiSlice.reducerPath]: backlogApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(projectApiSlice.middleware)
            .concat(backlogApiSlice.middleware)
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
